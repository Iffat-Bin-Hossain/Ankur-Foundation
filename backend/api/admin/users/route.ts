import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Get all users (President + Auditor only)
export async function GET(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role')
    
    if (!userRole || (userRole !== 'PRESIDENT' && userRole !== 'AUDITOR')) {
      return NextResponse.json(
        { error: 'Forbidden: Only President and Auditor can view all users' },
        { status: 403 }
      )
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ users })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

// Deactivate user (President only)
export async function PATCH(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role')
    
    if (userRole !== 'PRESIDENT') {
      return NextResponse.json(
        { error: 'Forbidden: Only President can deactivate users' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { userId, isActive } = body

    if (!userId || isActive === undefined) {
      return NextResponse.json(
        { error: 'userId and isActive are required' },
        { status: 400 }
      )
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { isActive },
    })

    return NextResponse.json({ user })
  } catch (error: any) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}
