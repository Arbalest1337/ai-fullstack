const JWT_KEY = 'access-token'

export const getJwt = () => localStorage.getItem(JWT_KEY) ?? ''
export const setJwt = token => localStorage.setItem(JWT_KEY, `Bearer ${token}`)
export const clearJwt = () => localStorage.removeItem(JWT_KEY)
