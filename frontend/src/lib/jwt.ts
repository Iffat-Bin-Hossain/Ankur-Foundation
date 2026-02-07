// JWT utilities - simplified for frontend use
// All JWT verification is done on the backend

export interface JWTPayload {
  id: string
  email: string
  role: string
  iat?: number
  exp?: number
}

export function getTokenFromCookie(cookieString: string): string | null {
  if (!cookieString) return null
  const cookies = cookieString.split(';')
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=')
    if (name === 'auth-token') {
      return decodeURIComponent(value)
    }
  }
  return null
}

export function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const exp = payload.exp * 1000 // Convert to milliseconds
    return Date.now() >= exp
  } catch {
    return true
  }
}

export function getTokenPayload(token: string): JWTPayload | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload
  } catch {
    return null
  }
}
