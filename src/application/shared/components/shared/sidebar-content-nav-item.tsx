'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useSidebar } from '@/application/shared/components/sidebar'

export type SidebarContentNavItem = {
  title: string
  href: string
  icon: React.ReactNode
}

export function SidebarContentNavItem({
  href,
  icon,
  title,
}: SidebarContentNavItem) {
  const pathname = usePathname()

  const { state } = useSidebar()

  const stateIsExpanded = state === 'expanded'

  const isActive = pathname.includes(href)

  return (
    <li
      key={href}
      className={clsx(
        'flex w-full items-center',
        stateIsExpanded ? 'justify-start' : 'justify-center',
      )}
    >
      <Link
        href={href}
        className={clsx(
          'rounded-radius flex w-full items-center',
          'h-[56px] gap-4 px-4 font-bold leading-[1.1875]',
          'hover:bg-primary hover:text-primary-contrast hover:[&_svg]:text-primary-contrast',
          {
            'bg-primary text-primary-contrast [&_svg]:text-primary-contrast':
              isActive,
            '[&_svg]:text-text-four': !isActive,
          },
          stateIsExpanded ? 'justify-start' : 'justify-center',
        )}
      >
        {icon}
        {stateIsExpanded && title}
      </Link>
    </li>
  )
}
