'use client'
import { useEffect, useState } from 'react'
import useRequest from '@/hooks/useRequest'
import PostItem from '@/components/Post/Post'

export default function Post() {
  const request = useRequest()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [querying, setQuerying] = useState(false)

  const [postAndRepost, setPostAndRepost] = useState([])

  const onSubmit = async () => {
    if (!input) return
    try {
      setLoading(true)
      const res = await request({
        url: '/post/create',
        method: 'POST',
        data: {
          content: input
        }
      })
      onQueryPostAndRepost()
    } finally {
      setLoading(false)
    }
  }

  const onQuery = async () => {
    try {
      setQuerying(true)
      const res = await request({ url: `/post/query` })
      setPosts(res)
    } finally {
      setQuerying(false)
    }
  }

  const onQueryPostAndRepost = async () => {
    try {
      setQuerying(true)
      const res = await request({ url: `/post/query-post-and-repost` })
      setPostAndRepost(res)
    } finally {
      setQuerying(false)
    }
  }

  useEffect(() => {
    onQueryPostAndRepost()
  }, [])

  return (
    <>
      <div className="p-4">
        <h4>Post</h4>
        <input className="border mr-2" value={input} onChange={e => setInput(e.target.value)} />
        <button disabled={loading} onClick={() => onSubmit()}>
          {loading ? 'Loading' : 'Submit'}
        </button>

        <button className="block mt-8" disabled={querying} onClick={() => onQueryPostAndRepost()}>
          {querying ? 'Loading' : 'Refresh'}
        </button>
        {postAndRepost.map((item, index) => (
          <PostItem post={item} key={item.id + item.repostId} />
        ))}
      </div>
    </>
  )
}
