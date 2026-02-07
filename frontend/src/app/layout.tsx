import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import { AuthProvider } from '@/components/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ankur Foundation',
  description: 'Ankur Foundation - Building sustainable communities',
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: ['ngo', 'foundation', 'charity', 'community'],
  authors: [
    { name: 'Ankur Foundation' }
  ],
  icons: [
    { rel: 'apple-touch-icon', url: '/icons/icon-128x128.png' },
    { rel: 'icon', url: '/icons/icon-128x128.png' }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <main className="min-h-screen bg-white">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
