'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'

import { AuthProvider } from '@/application/account/hooks/auth.hook'
import { UI } from '@/application/shared/components'
import { queryClient } from '@/infra/libs/react-query'

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
