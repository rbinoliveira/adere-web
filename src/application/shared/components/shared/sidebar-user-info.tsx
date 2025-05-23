import clsx from 'clsx'

import { UI } from '@/application/shared/components'
import { useSidebar } from '@/application/shared/components/sidebar'

export function SidebarUserInfo() {
  const { state } = useSidebar()

  const stateIsExpanded = state === 'expanded'

  return (
    <div
      className={clsx(
        'flex items-center gap-4',
        stateIsExpanded ? 'px-8' : 'px-4',
      )}
    >
      {stateIsExpanded ? (
        <UI.Avatar
          imageUrl=""
          roundedFull={false}
          size="lg"
          name={'Broto Store'}
        />
      ) : (
        <UI.Avatar
          imageUrl=""
          roundedFull={false}
          size="md"
          name={'Broto Store'}
        />
      )}

      {stateIsExpanded && (
        <div className="flex flex-col gap-2">
          <h3 className="line-clamp-1 font-bold leading-[1.1875]">
            Broto Store
          </h3>
          <span className="text-primary line-clamp-1 text-[0.5625rem] font-bold leading-[1.11]">
            Verified
          </span>
        </div>
      )}
    </div>
  )
}
