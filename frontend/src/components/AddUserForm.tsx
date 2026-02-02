'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserPlus, Check, X } from 'lucide-react'

export default function AddUserForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name.trim(), email: email.trim() })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create user')
      }
      
      setSuccess(true)
      setName('')
      setEmail('')
      
      // Reset success state after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter full name"
            className="w-full"
            disabled={loading}
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            className="w-full"
            disabled={loading}
          />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-md">
          <X className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 p-3 rounded-md">
          <Check className="w-4 h-4" />
          <span>User created successfully!</span>
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Creating User...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            <span>Add User</span>
          </div>
        )}
      </Button>
    </form>
  )
}