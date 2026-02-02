'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Download, Check } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent
  }
}

export default function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    // Check if app is already installed
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      setIsInstalled(true)
      setIsInstallable(false)
    }

    setDeferredPrompt(null)
  }

  if (isInstalled) {
    return (
      <Button variant="secondary" disabled className="flex items-center gap-2">
        <Check className="w-4 h-4" />
        App Installed
      </Button>
    )
  }

  if (!isInstallable) {
    return null
  }

  return (
    <Button onClick={handleInstall} className="flex items-center gap-2">
      <Download className="w-4 h-4" />
      Install App
    </Button>
  )
}