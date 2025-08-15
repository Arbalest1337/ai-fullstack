'use client'
import { useState } from 'react'
import useRequest from '@/hooks/useRequest'
import { useRouter } from 'next/navigation'

export default function Home() {
  const request = useRequest()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [userInfo, setUserInfo] = useState(null)

  const onGetUserInfo = async () => {
    setUserInfo(null)
    try {
      setLoading(true)
      const res = await request({ url: '/user/info' })
      setUserInfo(res)
    } finally {
      setLoading(false)
    }
  }

  const menu = [
    {
      name: 'Image',
      path: '/image'
    },
    {
      name: 'Video',
      path: '/video'
    },
    {
      name: 'Post',
      path: '/post'
    },
    {
      name: 'Post Schedule',
      path: '/post-schedule'
    }
  ]

  return (
    <>
      <div>
        {menu.map(({ name, path }) => (
          <div
            key={path}
            onClick={() => router.push(path)}
            className="m-8 font-[20px] cursor-pointer bold"
          >
            {name}
          </div>
        ))}
      </div>

      <button className="block my-4" disabled={loading} onClick={() => onGetUserInfo()}>
        {loading ? 'Loading...' : 'Get UserInfo'}
      </button>

      {!loading && userInfo?.id && (
        <>
          <h4>UserId: {userInfo.id}</h4>
          <h4>Nickname: {userInfo.nickname}</h4>
          <h4>CreateTime: {userInfo.createTime}</h4>
        </>
      )}
    </>
  )
}
