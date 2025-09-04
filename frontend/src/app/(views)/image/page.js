'use client'
import { useEffect, useState } from 'react'
import useRequest from '@/hooks/useRequest'

export default function Image() {
  const request = useRequest()
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
      const { taskId } = await request({
        url: '/image/text-to-image',
        method: 'POST',
        data: { prompt: input }
      })
      setTaskId(taskId)
    } finally {
      setLoading(false)
    }
  }

  const onCheckTask = async taskId => {
    try {
      setChecking(true)
      const { detail, url } = await request({ url: `/image/${taskId}` })
      const { task_status } = detail.output
      setImageStatus(task_status)
      if (task_status === 'SUCCEEDED') {
        setImageSrc(url)
      }
    } finally {
      setChecking(false)
    }
  }

  const onQuery = async () => {
    try {
      setQuerying(true)
      const res = await request({ url: `/image/query` })
      setImages(res)
    } finally {
      setQuerying(false)
    }
  }

  useEffect(() => {
    onQuery()
  }, [])

  return (
    <div className="p-4 flex gap-5">
      <div className="shrink-0 grow-0 w-[360px]">
        <h2>Prompt</h2>
        <input className="border mr-2" value={input} onChange={e => setInput(e.target.value)} />
        <button disabled={loading} onClick={() => onSubmit()}>
          {loading ? 'Loading' : 'Submit'}
        </button>

        <h4 className="mt-8">Task</h4>
        <input className="border mr-2" value={taskId} onChange={e => setTaskId(e.target.value)} />
        <button disabled={checking} onClick={() => onCheckTask(taskId)}>
          {checking ? 'Loading' : 'Check'}
        </button>

        <h2 className="mt-8">Status</h2>
        {imageSrc && (
          <>
            <h4>{imageStatus}</h4>
            <img src={imageSrc} />
          </>
        )}
      </div>

      <div className="grow shrink">
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
    </div>
  )
}
