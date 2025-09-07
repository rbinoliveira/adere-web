'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'

import { UI } from '@/application/_shared/components'
import { queryClient } from '@/application/_shared/libs/react-query'
import { AuthProvider } from '@/application/auth/hooks/auth.hook'

export function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <AuthProvider>
          {children}
          <UI.Toaster />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
