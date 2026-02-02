'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Trash2, Mail, Calendar, Users } from 'lucide-react'

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

type User = {
  id: string
  name: string
  email: string
  createdAt: string
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users')
      const data = await response.json()
      setUsers(data.users || [])
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteUser = async (id: string) => {
    setDeletingIds(prev => new Set(prev).add(id))
    
    try {
      const response = await fetch(`/api/users?id=${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setUsers(users.filter(user => user.id !== id))
      } else {
        console.error('Failed to delete user')
      }
    } catch (error) {
      console.error('Failed to delete user:', error)
    } finally {
      setDeletingIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-20 bg-gray-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    )
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-8">
        <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No users found</p>
        <p className="text-gray-400 text-sm">Add some users to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div
          key={user.id}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{user.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Mail className="w-3 h-3" />
                    <span>{user.email}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500 ml-13">
                <Calendar className="w-3 h-3" />
                <span>Created {formatDate(user.createdAt)}</span>
              </div>
            </div>
            
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteUser(user.id)}
              disabled={deletingIds.has(user.id)}
            >
              {deletingIds.has(user.id) ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
