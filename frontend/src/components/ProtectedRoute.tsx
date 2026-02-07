'use client'

import React, { ReactNode } from 'react'
import { useAuthContext } from './AuthProvider'

interface ProtectedRouteProps {
  children: ReactNode
  requiredRole?: string | string[]
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, user, loading } = useAuthContext()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-6">You must be logged in to access this page</p>
          <a
            href="/login"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go to Login
          </a>
        </div>
      </div>
    )
  }

  // Check role requirement
  if (requiredRole) {
    const requiredRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]
    if (!user || !requiredRoles.includes(user.role)) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Forbidden</h1>
            <p className="text-gray-600 mb-2">You don't have permission to access this resource</p>
            <p className="text-sm text-gray-500 mb-6">Required role: {requiredRoles.join(', ')}</p>
            <a
              href="/"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Go Home
            </a>
          </div>
        </div>
      )
    }
  }

  return <>{children}</>
}
