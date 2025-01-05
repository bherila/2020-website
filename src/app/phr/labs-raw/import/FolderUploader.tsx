'use client'
import { useState } from 'react'

export default function FolderUploader() {
  const [dragging, setDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = () => {
    setDragging(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)

    // Get all files from the dropped items
    const items = Array.from(e.dataTransfer.items)
    const entries = items
      .filter((item) => item.kind === 'file')
      .map((item) => item.webkitGetAsEntry())
      .filter((entry): entry is FileSystemDirectoryEntry => entry !== null && entry.isDirectory)

    if (entries.length === 0) {
      alert('Please drop a folder')
      return
    }

    // We'll implement folder processing later
    console.log('Dropped folder:', entries[0].name)
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        border: '2px dashed #ccc',
        borderRadius: '4px',
        padding: '20px',
        textAlign: 'center',
        backgroundColor: dragging ? '#f8f9fa' : 'white',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p className="mb-2">Drag and drop a folder here</p>
      <p className="text-muted">or</p>
      <input
        type="file"
        style={{ display: 'none' }}
        id="folder-input"
        onChange={(e) => {
          const files = e.target.files
          if (files && files.length > 0) {
            console.log('Selected folder contains', files.length, 'files')
          }
        }}
      />
      <label htmlFor="folder-input" className="btn btn-primary">
        Select Folder
      </label>
    </div>
  )
}
