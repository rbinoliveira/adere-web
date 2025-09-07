import type { Metadata } from 'next'

import { UI } from '@/core/_shared/components'

export const metadata: Metadata = {
  title: 'Pill Reminder',
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
        <main className="p-5 md:p-8 w-full max-w-[1200px] mx-auto">
          {children}
        </main>
      </UI.SidebarInset>
    </UI.SidebarProvider>
  )
}
