import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Create account (Treasurer)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, accountType, committeeId, treasurerId } = body

    if (!name || !accountType || !committeeId || !treasurerId) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const account = await prisma.account.create({
      data: {
        name,
        accountType,
        committeeId,
        treasurerId,
      },
      include: {
        committee: {
          select: {
            id: true,
            name: true,
          },
        },
        treasurer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(account, { status: 201 })
  } catch (error: any) {
    console.error('Error creating account:', error)
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    )
  }
}

// Get all accounts
export async function GET(request: NextRequest) {
  try {
    const accounts = await prisma.account.findMany({
      include: {
        committee: {
          select: {
            id: true,
            name: true,
          },
        },
        treasurer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        transactions: {
          select: {
            id: true,
            type: true,
            amount: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 5,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ accounts })
  } catch (error) {
    console.error('Error fetching accounts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch accounts' },
      { status: 500 }
    )
  }
}
