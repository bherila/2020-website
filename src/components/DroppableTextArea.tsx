'use client'
import { FC, ChangeEvent, DragEvent, ClipboardEvent, useEffect, useState } from 'react'
import { Textarea } from './ui/textarea'

interface DroppableTextAreaProps {
  data: string
  setData: (data: string) => void
}

const DroppableTextArea: FC<DroppableTextAreaProps> = ({ data, setData }) => {
  const [file, setFile] = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setData(e.target.value)
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      setFile(e.target.files[0])
    }
  }

  const handleDrop = (e: DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    setFile(file)
    setDragging(false)
  }

  const handleDragOver = (e: DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = () => {
    setDragging(false)
  }

  const handlePaste = (e: ClipboardEvent<HTMLTextAreaElement>) => {
    const text = e.clipboardData.getData('text')
    setData(text)
    setFile(null)
  }

  useEffect(() => {
    if (file != null) {
      readFileAsText(file).then((text) => {
        setData(text)
      })
    }
  }, [file, setData])

  return (
    <form>
      <Textarea
        value={data}
        onChange={handleTextChange}
        style={{
          width: '100%',
          height: '480px',
          maxHeight: '480px',
          minHeight: '480px',
          opacity: dragging ? 0.8 : 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onPaste={handlePaste}
        placeholder="Drop a file here..."
      />
      <input type="file" onChange={handleFileChange} accept=".txt" style={{ display: 'none' }} id="fileInput" />
      <label htmlFor="fileInput" className="btn btn-primary">
        {file == null ? 'Select a file' : file.name}
      </label>
    </form>
  )
}

const readFileAsText = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result as string)
    }
    reader.onerror = () => {
      reject(reader.error)
    }
    reader.readAsText(file)
  })
}

export default DroppableTextArea
