import { NextRequest, NextResponse } from 'next/server'

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

export function getTokenFromRequest(request: NextRequest): string | null {
  const cookieHeader = request.headers.get('cookie') || ''
  const cookies = cookieHeader.split(';')
  
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=')
    if (name === 'auth-token' && value) {
      return decodeURIComponent(value)
    }
  }
  
  // Fallback to Authorization header
  const authHeader = request.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7)
  }
  
  return null
}

export async function getAuthenticatedUser(request: NextRequest) {
  const token = getTokenFromRequest(request)
  
  if (!token) {
    return null
  }

  try {
    // Verify token with backend API
    const backendUrl = process.env.BACKEND_URL || 'http://ankur-backend:3001'
    const response = await fetch(`${backendUrl}/api/auth/profile`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return {
      id: data.user.id,
      email: data.user.email,
      role: data.user.role as UserRole,
    }
  } catch (error) {
    console.error('Error verifying token:', error)
    return null
  }
}

export async function requireAuth(request: NextRequest) {
  const user = await getAuthenticatedUser(request)
  
  if (!user) {
    return {
      error: 'Unauthorized',
      status: 401,
      user: null,
    }
  }

  return {
    error: null,
    status: 200,
    user,
  }
}

export function requireRole(role: UserRole) {
  return (handler: Function) => async (request: NextRequest) => {
    const user = await getAuthenticatedUser(request)

    if (!user || user.role !== role) {
      return NextResponse.json(
        { error: `Forbidden: Only ${role} can access this resource` },
        { status: 403 }
      )
    }

    // Add user to request context for handler to use
    ;(request as any).user = user

    return handler(request)
  }
}

export function requirePermission(permission: string) {
  return (handler: Function) => async (request: NextRequest) => {
    const user = await getAuthenticatedUser(request)

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (!hasPermission(user.role, permission)) {
      return NextResponse.json(
        { error: 'Forbidden: Insufficient permissions' },
        { status: 403 }
      )
    }

    ;(request as any).user = user

    return handler(request)
  }
}
