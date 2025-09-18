import { Archive, Users } from 'lucide-react'

import { SidebarContentNavItem } from '@/application/_shared/components/organisms/sidebar/sidebar-content-nav-item'

export const sidebarContentNavItems: SidebarContentNavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <Archive />,
    description: 'Gerencie o dashboard',
  },
  {
    title: 'Pacientes',
    href: '/pacientes',
    icon: <Users />,
    description: 'Gerencie os pacientes e seus tratamentos',
  },
]
