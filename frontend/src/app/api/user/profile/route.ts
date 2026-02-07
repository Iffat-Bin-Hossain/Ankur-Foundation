import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Get token from cookies
    const token = request.cookies.get('auth-token')?.value
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized: No token provided' },
        { status: 401 }
      )
    }

    // Call the backend to verify token and get user info
    const backendUrl = process.env.BACKEND_URL || 'http://ankur-backend:3001'
    
    const response = await fetch(`${backendUrl}/api/auth/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Backend profile error:', errorText)
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const data = await response.json()
    return NextResponse.json({ user: data.user })
  } catch (error: any) {
    console.error('Profile API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // Get token and call backend for user updates
    const token = request.headers.get('x-auth-token')
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name } = body

    // You can implement profile updates by calling backend
    // For now, return an error to indicate it's not implemented
    return NextResponse.json(
      { error: 'Profile updates not implemented yet' },
      { status: 501 }
    )
  } catch (error: any) {
    console.error('Profile update error:', error)
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    )
  }
}
