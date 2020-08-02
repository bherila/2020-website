import Layout from '../components/layout'
import { useState } from 'react'
import * as RS from 'reactstrap'
import TextBox from 'devextreme-react/text-box'
import Button from 'devextreme-react/button'
import FileUploader from 'devextreme-react/file-uploader'

async function submitForm(to: string, pw: string, selectedFiles: File[]) {
  const fileAsDataUrl = new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (typeof e.target.result === 'string') {
        resolve(e.target.result)
      }
    }
    reader.readAsDataURL(selectedFiles[0])
  })

  const response = await fetch('/api/twilio', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to,
      pw,
      file: await fileAsDataUrl,
    }),
  })
}

export default function SendFaxPage(props: {}) {
  const [to, setTo] = useState('')
  const [sent, setSent] = useState(0)
  const [pw, setPw] = useState(
    (typeof localStorage !== 'undefined' ? localStorage.getItem('pw') : null) ||
      ''
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
          <RS.Col xs={12} sm={6}>
            <h2>Send a fax</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                submitForm(to, pw, selectedFiles).then(() => {
                  setSent(2)
                  localStorage.setItem('pw', pw)
                  setTimeout(() => setSent(0), 1000)
                })
              }}
            >
              <label>
                Password
                <TextBox
                  value={pw}
                  mode="password"
                  onValueChanged={(e) => setPw(e.value)}
                />
              </label>
              <label>
                To
                <TextBox
                  value={to}
                  mode="tel"
                  onValueChanged={(e) => setTo(e.value)}
                />
              </label>
              <FileUploader
                onValueChanged={(e) => setSelectedFiles(e.value)}
                multiple={false}
              />
              <Button useSubmitBehavior={true}>Send fax to {to}</Button>
            </form>
          </RS.Col>
        </RS.Row>
      </RS.Container>
    </Layout>
  )
}
