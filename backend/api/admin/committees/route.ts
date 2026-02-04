import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { UserRole } from '@prisma/client'

// Create committee (President only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, presidentId } = body

    if (!name || !presidentId) {
      return NextResponse.json(
        { error: 'Name and presidentId are required' },
        { status: 400 }
      )
    }

    const committee = await prisma.committee.create({
      data: {
        name,
        description,
        presidentId,
      },
      include: {
        president: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    })

    return NextResponse.json(committee, { status: 201 })
  } catch (error: any) {
    console.error('Error creating committee:', error)
    return NextResponse.json(
      { error: 'Failed to create committee' },
      { status: 500 }
    )
  }
}

// Get all committees
export async function GET(request: NextRequest) {
  try {
    const committees = await prisma.committee.findMany({
      where: { isActive: true },
      include: {
        president: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        accounts: {
          select: {
            id: true,
            name: true,
            accountType: true,
            balance: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ committees })
  } catch (error) {
    console.error('Error fetching committees:', error)
    return NextResponse.json(
      { error: 'Failed to fetch committees' },
      { status: 500 }
    )
  }
}
