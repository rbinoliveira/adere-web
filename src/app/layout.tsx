import '@/application/_shared/styles/globals.css'

import type { Metadata } from 'next'
import { Mulish } from 'next/font/google'

import { RootProviders } from '@/application/_shared/providers/root.provider'

const mulish = Mulish({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--mulish',
})

export const metadata: Metadata = {
  title: 'Create Next App',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={mulish.className}>
      <body>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  )
}
