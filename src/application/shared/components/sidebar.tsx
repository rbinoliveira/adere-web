'use client'

import { ChevronDownIcon, PanelLeftIcon } from 'lucide-react'
import * as React from 'react'

import { deleteAuthCookies } from '@/application/account/helpers/delete-auth-cookies.helper'
import { useAuth } from '@/application/account/hooks/auth.hook'
import { PRIMITIVE, UI } from '@/application/shared/components'
import { ButtonProps } from '@/application/shared/components/button'
import { SidebarContentNav } from '@/application/shared/components/shared/sidebar-content-nav'
import { SidebarUserInfo } from '@/application/shared/components/shared/sidebar-user-info'
import { getCompoundName } from '@/application/shared/helpers'
import { useIsMobile } from '@/application/shared/hooks/use-mobile'
import { cn } from '@/infra/libs/tw-merge'

const SIDEBAR_COOKIE_NAME = 'sidebar_state'
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = '256px'
const SIDEBAR_WIDTH_MOBILE = '256px'
const SIDEBAR_KEYBOARD_SHORTCUT = 'b'

type SidebarContext = {
  state: 'expanded' | 'collapsed'
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.')
  }

  return context
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
  }
>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const isMobile = useIsMobile()
    const [openMobile, setOpenMobile] = React.useState(false)

    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = React.useState(defaultOpen)
    const open = openProp ?? _open
    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === 'function' ? value(open) : value
        if (setOpenProp) {
          setOpenProp(openState)
        } else {
          _setOpen(openState)
        }

        // This sets the cookie to keep the sidebar state.
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
      },
      [setOpenProp, open],
    )

    // Helper to toggle the sidebar.
    const toggleSidebar = React.useCallback(() => {
      return isMobile
        ? setOpenMobile((open) => !open)
        : setOpen((open) => !open)
    }, [isMobile, setOpen, setOpenMobile])

    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault()
          toggleSidebar()
        }
      }

      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }, [toggleSidebar])

    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    const state = open ? 'expanded' : 'collapsed'

    const contextValue = React.useMemo<SidebarContext>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      ],
    )

    return (
      <SidebarContext.Provider value={contextValue}>
        <PRIMITIVE.TooltipProvider delayDuration={0}>
          <div
            data-slot="sidebar-wrapper"
            style={
              {
                '--sidebar-width': SIDEBAR_WIDTH,
                ...style,
              } as React.CSSProperties
            }
            className={cn(
              'group/sidebar-wrapper has-data-[variant=inset]:bg-red-500 flex min-h-svh w-full',
              className,
            )}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </PRIMITIVE.TooltipProvider>
      </SidebarContext.Provider>
    )
  },
)

function Sidebar({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  side?: 'left' | 'right'
  variant?: 'sidebar' | 'floating' | 'inset'
  collapsible?: 'offcanvas' | 'icon' | 'none'
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === 'none') {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          'text-sidebar-foreground w-(--sidebar-width) flex h-full flex-col bg-red-500',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <PRIMITIVE.Sheet
        open={openMobile}
        onOpenChange={setOpenMobile}
        {...props}
      >
        <PRIMITIVE.SheetHeader className="sr-only">
          <PRIMITIVE.SheetTitle>Sidebar</PRIMITIVE.SheetTitle>
          <PRIMITIVE.SheetDescription>
            Displays the mobile sidebar.
          </PRIMITIVE.SheetDescription>
        </PRIMITIVE.SheetHeader>
        <PRIMITIVE.SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="text-sidebar-foreground w-(--sidebar-width) border-r border-yellow-500 bg-blue-500 p-0 [&>button]:hidden"
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <div className="flex h-full w-full flex-col">{children}</div>
        </PRIMITIVE.SheetContent>
      </PRIMITIVE.Sheet>
    )
  }

  return (
    <div
      className="text-sidebar-foreground group peer hidden md:block"
      data-state={state}
      data-collapsible={state === 'collapsed' ? collapsible : ''}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        className={cn(
          'w-(--sidebar-width) relative h-svh bg-transparent transition-[width] duration-200 ease-linear',
          'group-data-[collapsible=offcanvas]:w-0',
          'group-data-[side=right]:rotate-180',
          variant === 'floating' || variant === 'inset'
            ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
            : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)',
        )}
      />
      <div
        className={cn(
          'w-(--sidebar-width) fixed inset-y-0 z-10 hidden h-svh transition-[left,right,width] duration-200 ease-linear md:flex',
          side === 'left'
            ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
            : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
          // Adjust the padding for floating and inset variants.
          variant === 'floating' || variant === 'inset'
            ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]'
            : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=right]:border-l',
          className,
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          className="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
        >
          {children}
        </div>
      </div>
    </div>
  )
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: Omit<ButtonProps, 'children'>) {
  const { toggleSidebar } = useSidebar()

  return (
    <UI.Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      className={cn('h-7 w-7', className)}
      onClick={(event: any) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </UI.Button>
  )
}

function SidebarRail({ className, ...props }: React.ComponentProps<'button'>) {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        'hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex',
        'in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize',
        '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
        'hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full',
        '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
        '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
        className,
      )}
      {...props}
    />
  )
}

function SidebarInset({ className, ...props }: React.ComponentProps<'main'>) {
  const { state } = useSidebar()

  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        'relative flex min-h-svh flex-1 flex-col bg-white dark:bg-neutral-950',
        'peer-data-[variant=inset]:min-h-[calc(100svh-(--spacing(4)))] md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm',
        state === 'collapsed' && 'ml-[88px]',
        className,
      )}
      {...props}
    />
  )
}

function SidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn('flex flex-col', className)}
      {...props}
    />
  )
}

function SidebarFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn('flex flex-col gap-2 p-2', className)}
      {...props}
    />
  )
}

function SidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        'flex min-h-0 flex-1 flex-col overflow-auto group-data-[collapsible=icon]:overflow-hidden',
        className,
      )}
      {...props}
    />
  )
}

function AppSidebarHeader() {
  const { account } = useAuth()

  return (
    <header className="border-border-one bg-background flex h-[80px] w-full items-center justify-end border-b pr-8 transition-[width,height] ease-linear">
      <PRIMITIVE.DropdownMenu
        trigger={
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <UI.Avatar name={account?.name} />
            <div className="flex max-w-[150px] flex-col items-start gap-1">
              <p className="line-clamp-1 text-left font-semibold leading-[1.1875]">
                {getCompoundName(account?.name)}
              </p>
              <span className="text-text-two line-clamp-1 text-left text-xs leading-[1.16]">
                {account?.email}
              </span>
            </div>
            <ChevronDownIcon />
          </div>
        }
        items={[<button onClick={deleteAuthCookies}>Sair</button>]}
      />
    </header>
  )
}

function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-border-one flex h-[80px] justify-center border-b px-7">
        {state === 'expanded' ? (
          <UI.Image
            src={'/logo-icon-text.png'}
            alt="Logo"
            className="h-[32px] w-[164px]"
          />
        ) : (
          <UI.Image
            src={'/logo.png'}
            alt="Logo"
            className="h-[32px] w-[32px]"
          />
        )}
      </SidebarHeader>
      <SidebarContent className="border-border-one border-r py-10">
        <SidebarUserInfo />
        <div className="my-6 flex px-4">
          <UI.Separator />
        </div>
        <SidebarContentNav />
      </SidebarContent>
      <SidebarFooter className="border-border-one border-r">
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
      <SidebarRail className="top-20" />
    </Sidebar>
  )
}

export {
  AppSidebar,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
  AppSidebarHeader,
}
