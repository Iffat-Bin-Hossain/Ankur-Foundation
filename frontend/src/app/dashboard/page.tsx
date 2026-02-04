'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function DashboardPage() {
  const { user, logout, isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, loading, router])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!user) {
    return null
  }

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6">Welcome, {user.name}!</h2>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-lg font-semibold">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Role</p>
              <p className="text-lg font-semibold uppercase">{user.role}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <p className="text-lg font-semibold">
                {user.isActive ? 'Active' : 'Inactive'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">User ID</p>
              <p className="text-sm font-mono">{user.id.slice(0, 8)}...</p>
            </div>
          </div>

          <div className="pt-6 border-t">
            <h3 className="text-lg font-semibold mb-4">Role-Based Access</h3>
            <div className="space-y-2 text-sm">
              {user.role === 'PRESIDENT' && (
                <>
                  <p>✓ Manage all users</p>
                  <p>✓ Create committees</p>
                  <p>✓ Manage accounts</p>
                  <p>✓ View audit logs</p>
                </>
              )}
              {user.role === 'SECRETARY' && (
                <>
                  <p>✓ Create committees</p>
                  <p>✓ Enter data</p>
                  <p>✓ View reports</p>
                </>
              )}
              {user.role === 'TREASURER' && (
                <>
                  <p>✓ Manage accounts</p>
                  <p>✓ Create transactions</p>
                  <p>✓ View financial reports</p>
                </>
              )}
              {user.role === 'MEMBER' && (
                <>
                  <p>✓ View committees</p>
                  <p>✓ View reports</p>
                </>
              )}
              {user.role === 'AUDITOR' && (
                <>
                  <p>✓ View all users</p>
                  <p>✓ View audit logs</p>
                  <p>✓ Export data</p>
                </>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
