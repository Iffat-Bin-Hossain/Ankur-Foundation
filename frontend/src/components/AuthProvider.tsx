'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface User {
  id: string
  name: string | null
  email: string
  role: 'PRESIDENT' | 'SECRETARY' | 'TREASURER' | 'MEMBER' | 'AUDITOR'
  isActive: boolean
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, role?: string) => Promise<void>
  logout: () => Promise<void>
  refreshAuth: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Check authentication status on mount
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      // Use credentials: 'include' to send HTTP-only cookies
      const response = await fetch('/api/user/profile', {
        credentials: 'include'
      })
      
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else {
        setUser(null)
      }
    } catch (err) {
      console.error('Auth check failed:', err)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const refreshAuth = async () => {
    setLoading(true)
    await checkAuth()
  }

  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    
    // Clear any existing user state first
    setUser(null)
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Login failed')
      }

      const data = await response.json()
      setUser(data.user)
      // Token is handled via HTTP-only cookies
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string, role = 'MEMBER') => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
        credentials: 'include',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Registration failed')
      }

      const data = await response.json()
      setUser(data.user)
      // Token is handled via HTTP-only cookies
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      // Call logout API to clear server-side session
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
      
      // Immediately clear user state
      setUser(null)
      setError(null)
      
      // Force a fresh auth check to ensure clean state
      await checkAuth()
    } catch (err: any) {
      console.error('Logout error:', err)
      // Even if logout API fails, clear local state
      setUser(null)
      setError(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        refreshAuth,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}
