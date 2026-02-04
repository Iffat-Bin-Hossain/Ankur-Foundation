import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Create audit log entry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, action, entity, entityId, changes } = body

    if (!userId || !action || !entity) {
      return NextResponse.json(
        { error: 'userId, action, and entity are required' },
        { status: 400 }
      )
    }

    const auditLog = await prisma.auditLog.create({
      data: {
        userId,
        action,
        entity,
        entityId: entityId || '',
        changes: typeof changes === 'string' ? changes : JSON.stringify(changes || {}),
      },
    })

    return NextResponse.json(auditLog, { status: 201 })
  } catch (error) {
    console.error('Error creating audit log:', error)
    return NextResponse.json(
      { error: 'Failed to create audit log' },
      { status: 500 }
    )
  }
}

// Get audit logs (President + Auditor only)
export async function GET(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role')
    
    if (!userRole || (userRole !== 'PRESIDENT' && userRole !== 'AUDITOR')) {
      return NextResponse.json(
        { error: 'Forbidden: Only President and Auditor can view audit logs' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(request.url)
    const entity = searchParams.get('entity')
    const limit = parseInt(searchParams.get('limit') || '100')

    const where = entity ? { entity } : {}

    const logs = await prisma.auditLog.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    })

    return NextResponse.json({ logs })
  } catch (error) {
    console.error('Error fetching audit logs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch audit logs' },
      { status: 500 }
    )
  }
}
