import type { Metadata } from 'next'

import { UI } from '@/application/shared/components'

export const metadata: Metadata = {
  title: 'Create Next App',
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <UI.SidebarProvider>
      <UI.AppSidebar />
      <UI.SidebarInset className="bg-background-secondary flex w-full flex-col">
        <UI.AppSidebarHeader />
        <main className="p-8">{children}</main>
      </UI.SidebarInset>
    </UI.SidebarProvider>
  )
}
