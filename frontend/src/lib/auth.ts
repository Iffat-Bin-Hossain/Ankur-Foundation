import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export type UserRole = 'PRESIDENT' | 'SECRETARY' | 'TREASURER' | 'MEMBER' | 'AUDITOR'

export const rolePermissions: Record<UserRole, string[]> = {
  PRESIDENT: ['*'], // All permissions
  SECRETARY: ['create_committee', 'read_committee', 'update_committee', 'enter_data'],
  TREASURER: ['create_account', 'read_account', 'update_account', 'create_transaction', 'read_transaction'],
  MEMBER: ['read_committee', 'read_account', 'read_transaction'],
  AUDITOR: ['read_user', 'read_committee', 'read_account', 'read_transaction', 'read_audit_log'],
}

export function hasPermission(role: UserRole, permission: string): boolean {
  const permissions = rolePermissions[role] || []
  return permissions.includes('*') || permissions.includes(permission)
}

export function requireRole(role: UserRole) {
  return (handler: Function) => async (request: NextRequest) => {
    const userRole = request.headers.get('x-user-role') as UserRole

    if (!userRole || userRole !== role) {
      return NextResponse.json(
        { error: `Forbidden: Only ${role} can access this resource` },
        { status: 403 }
      )
    }

    return handler(request)
  }
}

export function requirePermission(permission: string) {
  return (handler: Function) => async (request: NextRequest) => {
    const userRole = request.headers.get('x-user-role') as UserRole
    const userId = request.headers.get('x-user-id')

    if (!userRole || !userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (!hasPermission(userRole, permission)) {
      return NextResponse.json(
        { error: 'Forbidden: Insufficient permissions' },
        { status: 403 }
      )
    }

    return handler(request)
  }
}

export async function getAuthenticatedUser(request: NextRequest) {
  const userId = request.headers.get('x-user-id')
  const userRole = request.headers.get('x-user-role')

  if (!userId || !userRole) {
    return null
  }

  return {
    id: userId,
    role: userRole as UserRole,
  }
}
