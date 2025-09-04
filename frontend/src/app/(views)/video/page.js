'use client'
import { useEffect, useState } from 'react'
import useRequest from '@/hooks/useRequest'

export default function Video() {
  const request = useRequest()
  const [input, setInput] = useState('')
  const [i2vPrompt, setI2vPrompt] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [taskId, setTaskId] = useState('')
  const [loading, setLoading] = useState(false)
  const [checking, setChecking] = useState(false)
  const [videoSrc, setVideoSrc] = useState(null)
  const [videoStatus, setVideoStatus] = useState('')
  const [videos, setVideos] = useState([])
  const [querying, setQuerying] = useState(false)

  const onTextToVideo = async () => {
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

  const onImageToVideo = async () => {
    try {
      setLoading(true)
      if (!imgUrl) return
      const { taskId } = await request({
        url: '/video/image-to-video',
        method: 'POST',
        data: {
          prompt: i2vPrompt,
          imgUrl
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
      const res = await request({ url: `/video/${taskId}` })
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

  useEffect(() => {
    onQuery()
  }, [])

  return (
    <div className="p-4 flex gap-5">
      <div className="shrink-0 grow-0 w-[360px] flex flex-col gap-4">
        <h4>Text To Video</h4>
        <input className="border mr-2" value={input} onChange={e => setInput(e.target.value)} />
        <button disabled={loading} onClick={() => onTextToVideo()}>
          {loading ? 'Loading' : 'Submit'}
        </button>

        <h4>Image To Video</h4>
        <input
          placeholder="img url"
          className="border"
          value={imgUrl}
          onChange={e => setImgUrl(e.target.value)}
        />
        <input
          placeholder="img prompt"
          className="border"
          value={i2vPrompt}
          onChange={e => setI2vPrompt(e.target.value)}
        />
        <button disabled={loading} onClick={() => onImageToVideo()}>
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
      </div>

      <div className="grow shrink">
        <button disabled={querying} onClick={() => onQuery()}>
          {querying ? 'Loading' : 'Refresh'}
        </button>
        {videos.map(item => (
          <div key={item.taskId} className="p-4">
            <h4>{item.prompt}</h4>
            <h4>{item.taskId}</h4>
            <video src={process.env.NEXT_PUBLIC_CLOUDFLARE_R2_PUBLIC_URL + item.key} controls />
          </div>
        ))}
      </div>
    </div>
  )
}
