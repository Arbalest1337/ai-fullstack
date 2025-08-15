'use client'
import { useState } from 'react'
import useRequest from '@/hooks/useRequest'

export default function Video() {
  const request = useRequest()
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
      const { taskId } = await request({
        url: '/video/text-to-video',
        method: 'POST',
        data: {
          prompt: input
        }
      })
      setTaskId(taskId)
    } finally {
      setLoading(false)
    }
  }

  const onCheckTask = async taskId => {
    try {
      setChecking(true)
      const res = await request({ url: `/video/detail?id=${taskId}` })
      const { detail, url } = await res
      const { task_status } = detail.output
      setVideoStatus(task_status)
      if (task_status === 'SUCCEEDED') {
        setVideoSrc(url)
      }
    } finally {
      setChecking(false)
    }
  }

  const onQuery = async () => {
    try {
      setQuerying(true)
      const res = await request({ url: `/video/query` })
      setVideos(res)
    } finally {
      setQuerying(false)
    }
  }

  return (
    <div className="p-4">
      <h4>Prompt</h4>
      <input className="border mr-2" value={input} onChange={e => setInput(e.target.value)} />
      <button disabled={loading} onClick={() => onSubmit()}>
        {loading ? 'Loading' : 'Submit'}
      </button>

      <h4 className="mt-8">Task</h4>
      <input className="border mr-2" value={taskId} onChange={e => setTaskId(e.target.value)} />
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
          <h4>{item.taskId}</h4>
          <video src={item.url} controls />
        </div>
      ))}
    </div>
  )
}
