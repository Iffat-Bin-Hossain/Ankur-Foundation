'use client'

import { FormEvent, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login, error } = useAuth()
  const router = useRouter()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    try {
      await login(email, password)
      router.push('/dashboard')
    } catch (err) {
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Ankur Foundation</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-200">
          <p className="text-sm font-semibold mb-2">Test Credentials:</p>
          <p className="text-xs mb-1"><strong>President:</strong> president@ankur.org</p>
          <p className="text-xs mb-1"><strong>Secretary:</strong> secretary@ankur.org</p>
          <p className="text-xs mb-1"><strong>Treasurer:</strong> treasurer@ankur.org</p>
          <p className="text-xs mb-1"><strong>Member:</strong> member@ankur.org</p>
          <p className="text-xs"><strong>Auditor:</strong> auditor@ankur.org</p>
          <p className="text-xs mt-2 text-gray-600"><strong>Password:</strong> password123</p>
        </div>
      </Card>
    </div>
  )
}
