'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { LogIn, UserPlus } from 'lucide-react'

interface NavbarProps {
  hideAuthButtons?: boolean
  authOnly?: boolean
}

export default function Navbar({ hideAuthButtons = false, authOnly = false }: NavbarProps) {
  const router = useRouter()

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 max-w-6xl flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition" 
          onClick={() => router.push('/')}
        >
          <Image
            src="/logo.png"
            alt="Ankur Foundation Logo"
            width={45}
            height={45}
            className="rounded-full object-cover"
            priority
          />
          <div>
            <div className="text-xl font-bold text-green-700">Ankur</div>
            <div className="text-xs text-gray-500">Foundation</div>
          </div>
        </div>
        
        {/* Auth-only navbar (for login/signup pages) */}
        {authOnly ? (
          <div className="flex gap-2">
            <Button
              onClick={() => router.push('/login')}
              className="bg-green-600 hover:bg-green-700 flex items-center gap-2 h-9"
              size="sm"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </Button>
            <Button
              onClick={() => router.push('/signup')}
              className="bg-green-600 hover:bg-green-700 flex items-center gap-2 h-9"
              size="sm"
            >
              <UserPlus className="w-4 h-4" />
              Sign Up
            </Button>
          </div>
        ) : (
          <>
            {/* Full navbar (for homepage) */}
            <div className="hidden md:flex gap-6 text-sm font-medium items-center">
              <a href="/#profile" className="text-gray-700 hover:text-green-700 transition">Profile</a>
              <a href="/#mission" className="text-gray-700 hover:text-green-700 transition">Mission</a>
              <a href="/#projects" className="text-gray-700 hover:text-green-700 transition">Projects</a>
              <a href="/#gallery" className="text-gray-700 hover:text-green-700 transition">Gallery</a>
              <a href="/#donate" className="text-gray-700 hover:text-green-700 transition">Donate</a>
              <a href="/#contact" className="text-gray-700 hover:text-green-700 transition">Contact</a>
              
              {!hideAuthButtons && (
                <>
                  <div className="h-6 w-px bg-gray-300"></div>
                  <Button
                    onClick={() => router.push('/login')}
                    className="bg-green-600 hover:bg-green-700 flex items-center gap-2 h-9"
                    size="sm"
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </Button>
                  <Button
                    onClick={() => router.push('/signup')}
                    className="bg-green-600 hover:bg-green-700 flex items-center gap-2 h-9"
                    size="sm"
                  >
                    <UserPlus className="w-4 h-4" />
                    Sign Up
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex gap-2">
              {!hideAuthButtons && (
                <>
                  <Button
                    onClick={() => router.push('/login')}
                    className="bg-green-600 hover:bg-green-700 h-9"
                    size="sm"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => router.push('/signup')}
                    className="bg-green-600 hover:bg-green-700 h-9"
                    size="sm"
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  )
}
