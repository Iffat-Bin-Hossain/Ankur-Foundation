'use client'

import { useAuthContext } from './AuthProvider'
import { useRouter } from 'next/navigation'
import { LogOut, LogIn, LayoutDashboard, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function HeaderNav() {
  const { user, logout } = useAuthContext()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between max-w-6xl">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition" onClick={() => router.push('/')}>
          <Image
            src="/logo.png"
            alt="Ankur Foundation Logo"
            width={40}
            height={40}
            className="rounded-full object-cover"
            priority
          />
          <div>
            <div className="text-lg font-bold text-green-700">Ankur</div>
            <div className="text-xs text-gray-500">Foundation</div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-gray-600">
                Welcome, <strong>{user.name}</strong>
              </span>
              <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                {user.role}
              </span>
              <Button
                onClick={() => router.push('/dashboard')}
                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                size="sm"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                onClick={() => router.push('/login')}
                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                size="sm"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Button>
              <Button
                onClick={() => router.push('/signup')}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 border-green-600 text-green-600 hover:bg-green-50"
              >
                <UserPlus className="w-4 h-4" />
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
