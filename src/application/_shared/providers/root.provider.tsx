'use client'

import { QueryClientProvider } from '@tanstack/react-query'

import { Toaster } from '@/application/_shared/components/atoms/sonner'
import { queryClient } from '@/application/_shared/libs/react-query'
import { AuthProvider } from '@/application/auth/hooks/auth.hook'

export function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  )
}
