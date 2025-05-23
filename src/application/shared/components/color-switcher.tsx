'use client'

import { SunMoon } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/application/shared/components/button'

type ColorSwitcherProps = {
  className?: string
}

function ColorSwitcher({ className }: ColorSwitcherProps) {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      className={className}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      variant="ghost"
    >
      <SunMoon size={24} />
    </Button>
  )
}

export { ColorSwitcher }
