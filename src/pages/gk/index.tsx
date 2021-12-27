import React, { useState } from 'react'

export default function () {
  const [u1, s1] = useState('')
  const [u2, s2] = useState('')
  return (
    <div>
      <input
        type="text"
        value={u1}
        onChange={(e) => s1(e.currentTarget.value)}
      />
      <input
        type="text"
        value={u2}
        onChange={(e) => s1(e.currentTarget.value)}
      />
    </div>
  )
}
