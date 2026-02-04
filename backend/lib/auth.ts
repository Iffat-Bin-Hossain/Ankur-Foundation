// Authentication middleware and utilities
import { NextRequest, NextResponse } from 'next/server'
import { UserRole, Permission } from '@prisma/client'
import { hasPermission } from './roles'

export interface AuthUser {
  id: string
  email: string
  role: UserRole
  isActive: boolean
}

// Mock auth context (in production, use JWT or sessions)
export const getCurrentUser = async (request: NextRequest): Promise<AuthUser | null> => {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return null
    }

    const token = authHeader.substring(7)
    // In production, verify JWT token here
    // For now, returning mock data (implement proper JWT verification)
    
    return null
  } catch (error) {
    console.error('Auth error:', error)
    return null
  }
}

// Middleware to check if user has required permission
export const requirePermission = (requiredPermission: Permission) => {
  return async (request: NextRequest) => {
    const user = await getCurrentUser(request)

    if (!user || !user.isActive) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (!hasPermission(user.role, requiredPermission)) {
      return NextResponse.json(
        { error: 'Forbidden - Insufficient permissions' },
        { status: 403 }
      )
    }

    return null // Allow request to proceed
  }
}

// Middleware to check if user has any of the required roles
export const requireRole = (allowedRoles: UserRole[]) => {
  return async (request: NextRequest) => {
    const user = await getCurrentUser(request)

    if (!user || !user.isActive) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (!allowedRoles.includes(user.role)) {
      return NextResponse.json(
        { error: 'Forbidden - Required role not found' },
        { status: 403 }
      )
    }

    return null // Allow request to proceed
  }
}

// Helper to attach user to request context
export function setUserContext(request: NextRequest, user: AuthUser) {
  const headers = new Headers(request.headers)
  headers.set('x-user-id', user.id)
  headers.set('x-user-role', user.role)
  headers.set('x-user-email', user.email)

  return new NextRequest(request, { headers })
}
