import { ArchiveIcon } from '@phosphor-icons/react'

import { SidebarContentNavItem } from '@/application/_shared/components/shared/sidebar-content-nav-item'

export const sidebarContentNavItems: SidebarContentNavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <ArchiveIcon />,
  },
  {
    title: 'Remédios',
    href: '/medicines',
    icon: <ArchiveIcon />,
  },
]
