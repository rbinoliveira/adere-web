import { SidebarContentNavItem } from '@/core/_shared/components/shared/sidebar-content-nav-item'
import { sidebarContentNavItems } from '@/core/_shared/components/shared/sidebar-content-nav-items'

export function SidebarContentNav() {
  return (
    <nav>
      <ul className="flex flex-col gap-4 px-4">
        {sidebarContentNavItems.map((item) => (
          <SidebarContentNavItem key={item.href} {...item} />
        ))}
      </ul>
    </nav>
  )
}
