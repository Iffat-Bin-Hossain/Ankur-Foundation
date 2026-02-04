import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Create transaction (Data Entry)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, amount, description, accountId } = body

    if (!type || !amount || !accountId) {
      return NextResponse.json(
        { error: 'Type, amount, and accountId are required' },
        { status: 400 }
      )
    }

    // Update account balance
    const account = await prisma.account.findUnique({
      where: { id: accountId },
    })

    if (!account) {
      return NextResponse.json(
        { error: 'Account not found' },
        { status: 404 }
      )
    }

    const newBalance = type === 'INCOME' 
      ? account.balance + amount 
      : account.balance - amount

    // Create transaction and update balance
    const transaction = await prisma.transaction.create({
      data: {
        type,
        amount,
        description: description || '',
        accountId,
      },
    })

    await prisma.account.update({
      where: { id: accountId },
      data: { balance: newBalance },
    })

    return NextResponse.json(transaction, { status: 201 })
  } catch (error: any) {
    console.error('Error creating transaction:', error)
    return NextResponse.json(
      { error: 'Failed to create transaction' },
      { status: 500 }
    )
  }
}

// Get transactions (with optional filtering)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const accountId = searchParams.get('accountId')

    const where = accountId ? { accountId } : {}

    const transactions = await prisma.transaction.findMany({
      where,
      include: {
        account: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ transactions })
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    )
  }
}
