import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, role = 'MEMBER' } = body

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    // Use Docker service name for internal communication
    const backendUrl = process.env.BACKEND_URL || 'http://ankur-backend:3001'
    
    const response = await fetch(`${backendUrl}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'Failed to register user' },
        { status: response.status }
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error: any) {
    console.error('Registration error:', error.message)
    return NextResponse.json(
      { error: error.message || 'Failed to register user' },
      { status: 500 }
    )
  }
}
