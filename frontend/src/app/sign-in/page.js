'use client'
import { useEffect, useState } from 'react'
import { setJwt } from '@/utils/jwt'
import { useRouter } from 'next/navigation'
import useRequest from '@/hooks/useRequest'
export default function SignIn() {
  const request = useRequest()
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)

  const onSignIn = async () => {
    try {
      setLoading(true)
      const { accessToken } = await request({
        url: '/auth/sign-in',
        method: 'POST',
        data: {
          username,
          password
        }
      })
      setJwt(accessToken)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setConfirmPassword('')
    setNickname('')
  }, [isSignUp])

  const onSignUp = async () => {
    if (password !== confirmPassword) {
      alert(`Passwords don't match`)
      return
    }
    try {
      setLoading(true)
      const res = await request({
        url: '/auth/sign-up',
        method: 'POST',
        data: {
          username,
          password,
          nickname
        }
      })
      alert('Sign Up successfully')
      setIsSignUp(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="p-8">
        <button disabled={loading} onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Go Sign Up' : 'Sign In Now'}
        </button>

        <label className="block mt-4">Username</label>
        <input className="border" value={username} onChange={e => setUsername(e.target.value)} />

        <label className="block mt-4">Password</label>
        <input
          className="border"
          value={password}
          type="password"
          onChange={e => setPassword(e.target.value)}
        />

        {!isSignUp && (
          <>
            <button
              className="block mt-4"
              disabled={loading}
              onClick={async () => {
                await onSignIn()
                router.push('/home')
              }}
            >
              {loading ? 'Loading...' : 'Sign In'}
            </button>
          </>
        )}

        {isSignUp && (
          <>
            <label className="block mt-4">Confirm Password</label>
            <input
              className="border"
              value={confirmPassword}
              type="password"
              onChange={e => setConfirmPassword(e.target.value)}
            />

            <label className="block mt-4">Nickname</label>
            <input
              className="border"
              value={nickname}
              onChange={e => setNickname(e.target.value)}
            />

            <button className="block mt-4" disabled={loading} onClick={() => onSignUp()}>
              {loading ? 'Loading...' : 'Sign Up'}
            </button>
          </>
        )}
      </div>
    </>
  )
}
