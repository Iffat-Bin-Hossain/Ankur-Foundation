import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role')

    // Only PRESIDENT and AUDITOR can view all users
    if (userRole !== 'PRESIDENT' && userRole !== 'AUDITOR') {
      return NextResponse.json(
        { error: 'Forbidden: Only President and Auditor can view users' },
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
  } catch (error: any) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role')

    // Only PRESIDENT can deactivate users
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

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
    })
  } catch (error: any) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    )
  }
}
