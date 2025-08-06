'use client'
import { useState } from 'react'

export default function Video() {
  const [input, setInput] = useState('')
  const [taskId, setTaskId] = useState('')
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(false)
  const [videoSrc, setVideoSrc] = useState(null)
  const [videoStatus, setVideoStatus] = useState('')
  const [videos, setVideos] = useState([])
  const [querying, setQuerying] = useState(false)

  const onSubmit = async () => {
    try {
      setLoading(true)
      if (!input) return
      const res = await fetch('http://localhost:4000/video/generate', {
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
      console.log({ data })
    } finally {
      setLoading(false)
    }
  }

  const onCheckTask = async taskId => {
    try {
      setChecking(true)
      const res = await fetch(`http://localhost:4000/video/task?id=${taskId}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error.message)
      const { task_status, video_url } = data.data.detail.output
      setVideoStatus(task_status)
      if (task_status === 'SUCCEEDED') {
        setVideoSrc(video_url)
      }
    } finally {
      setChecking(false)
    }
  }

  const onQuery = async () => {
    try {
      setQuerying(true)
      const res = await fetch(`http://localhost:4000/video/query`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error.message)
      console.log(data)
      setVideos(data.data)
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
      {videoSrc && (
        <>
          <h4>{videoStatus}</h4>
          <video src={videoSrc} controls />
        </>
      )}

      <h2 className="mt-8">History</h2>
      <button disabled={querying} onClick={() => onQuery()}>
        {querying ? 'Loading' : 'Refresh'}
      </button>
      {videos.map(item => (
        <div key={item.taskId} className="p-4">
          <h4>{item.prompt}</h4>
          <video src={item.detail.output.video_url} controls />
        </div>
      ))}
    </div>
  )
}
