'use client'
import { useState } from 'react'

export default function Image() {
  const [input, setInput] = useState('')
  const [taskId, setTaskId] = useState('')
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(false)
  const [imageSrc, setImageSrc] = useState(null)
  const [imageStatus, setImageStatus] = useState('')
  const [images, setImages] = useState([])
  const [querying, setQuerying] = useState(false)

  const onSubmit = async () => {
    try {
      setLoading(true)
      if (!input) return
      const res = await fetch('http://localhost:4000/image/text-to-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: input
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error.message)
      const { task_id } = data.data.output
      setTaskId(task_id)
    } finally {
      setLoading(false)
    }
  }

  const onCheckTask = async taskId => {
    try {
      setChecking(true)
      const res = await fetch(`http://localhost:4000/image/detail?id=${taskId}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error.message)
      const { task_status } = data.data.detail.output
      setImageStatus(task_status)
      if (task_status === 'SUCCEEDED') {
        setImageSrc(data.data.url)
      }
    } finally {
      setChecking(false)
    }
  }

  const onQuery = async () => {
    try {
      setQuerying(true)
      const res = await fetch(`http://localhost:4000/image/query`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error.message)
      setImages(data.data)
    } finally {
      setQuerying(false)
    }
  }

  return (
    <div className="p-4">
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button disabled={loading} onClick={() => onSubmit()}>
        {loading ? 'Loading' : 'Submit'}
      </button>

      <h4 className="mt-8">Task</h4>
      <input value={taskId} onChange={e => setTaskId(e.target.value)} />
      <button disabled={checking} onClick={() => onCheckTask(taskId)}>
        {checking ? 'Loading' : 'Check'}
      </button>

      <h2 className="mt-8">Result</h2>
      {imageSrc && (
        <>
          <h4>{imageStatus}</h4>
          <img src={imageSrc} />
        </>
      )}

      <h2 className="mt-8">History</h2>
      <button disabled={querying} onClick={() => onQuery()}>
        {querying ? 'Loading' : 'Refresh'}
      </button>
      {images.map(item => (
        <div key={item.taskId} className="p-4">
          <h4>{item.prompt}</h4>
          <h4>{item.taskId}</h4>
          <img src={item.url} />
        </div>
      ))}
    </div>
  )
}
