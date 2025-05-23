import { LayoutDashboardIcon } from 'lucide-react'

import { SidebarContentNavItem } from '@/application/shared/components/shared/sidebar-content-nav-item'

export const sidebarContentNavItems: SidebarContentNavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboardIcon />,
  },
  {
    title: 'Remédios',
    href: '/medicines',
    icon: <LayoutDashboardIcon />,
  },
]
