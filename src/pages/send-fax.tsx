import Button from 'devextreme-react/button'
import FileUploader from 'devextreme-react/file-uploader'
import TextBox from 'devextreme-react/text-box'
import { useState } from 'react'
import React from 'react'
import * as RS from 'reactstrap'

import Layout from '../components/layout'

async function submitForm(to: string, pw: string, selectedFiles: File[]) {
  const fileAsDataUrl = new Promise<string>((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (typeof e.target.result === 'string') {
        resolve(e.target.result)
      }
    }
    reader.readAsDataURL(selectedFiles[0])
  })

  return await fetch('/api/twilio', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to,
      pw,
      file: await fileAsDataUrl,
    }),
  })
}

export default function SendFaxPage() {
  const [to, setTo] = useState('')
  const [sent, setSent] = useState(0)
  const [pw, setPw] = useState(
    (typeof localStorage !== 'undefined' ? localStorage.getItem('pw') : null) ||
      '',
  )
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  if (sent > 0) {
    return (
      <Layout bootstrap={true}>
        <RS.Container>
          <RS.Row>
            <RS.Col xs={12}>{sent === 1 ? 'Sending...' : 'Sent!'}</RS.Col>
          </RS.Row>
        </RS.Container>
      </Layout>
    )
  }
  return (
    <Layout bootstrap={true}>
      <RS.Container>
        <RS.Row>
          <RS.Col
            xs={{ size: 10, offset: 1 }}
            sm={{ size: 9, offset: 3 }}
            style={{
              background: '#222',
              margin: '0 auto',
              padding: '1em',
              textAlign: 'center',
            }}
          >
            <h2>Send a fax</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                submitForm('+1' + to, pw, selectedFiles).then(() => {
                  setSent(2)
                  localStorage.setItem('pw', pw)
                  setTimeout(() => setSent(0), 1000)
                })
              }}
            >
              <RS.Container fluid>
                <RS.Row>
                  <RS.Col xs={4}>
                    <label>
                      Password
                      <TextBox
                        value={pw}
                        mode="password"
                        onValueChanged={(e) => setPw(e.value)}
                      />
                    </label>
                  </RS.Col>
                  <RS.Col xs={4}>
                    <label>
                      To
                      <TextBox
                        value={to}
                        mode="tel"
                        mask="+1X000000000"
                        maskRules={{ X: /[02-9]/ }}
                        onValueChanged={(e) => setTo(e.value)}
                      />
                    </label>
                  </RS.Col>
                  <RS.Col xs={4}>
                    <FileUploader
                      onValueChanged={(e) => setSelectedFiles(e.value)}
                      multiple={false}
                      value={selectedFiles}
                    />
                  </RS.Col>
                </RS.Row>
                <RS.Row>
                  <RS.Col xs={12} style={{ textAlign: 'center' }}>
                    {(() => {
                      if (pw === '') {
                        return 'Enter pw'
                      }
                      if (to.length < 10) {
                        return 'Enter target phone #'
                      }
                      if (selectedFiles.length !== 1) {
                        return 'File is required'
                      }
                      return (
                        <Button useSubmitBehavior={true}>
                          Send fax to +1{to}
                        </Button>
                      )
                    })()}
                  </RS.Col>
                </RS.Row>
              </RS.Container>
            </form>
          </RS.Col>
        </RS.Row>
      </RS.Container>
    </Layout>
  )
}
