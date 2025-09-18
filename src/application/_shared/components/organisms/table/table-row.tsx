import { cn } from '@/application/_shared/libs/tw-merge'

export function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        'w-full grid grid-cols-[repeat(4,minmax(200px,1fr))]',
        className,
      )}
      {...props}
    />
  )
}
