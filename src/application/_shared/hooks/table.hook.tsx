'use client'

import { usePathname } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'

type TableContextType = {
  currentPage: number
  search: string
  itemsPerPage: number
  updateCurrentPage: (page: number) => void
  form: UseFormReturn<{ itemsPerPage: number; search: string }>
}

const TableContext = createContext<TableContextType>({} as TableContextType)

const DEFAULT_CURRENT_PAGE = 1
const DEFAULT_SEARCH = ''
const DEFAULT_ITEMS_PER_PAGE = 10

export function TableProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_CURRENT_PAGE)

  const form = useForm({
    defaultValues: {
      itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
      search: DEFAULT_SEARCH,
    },
  })

  const search = form.watch('search')
  const itemsPerPage = form.watch('itemsPerPage')

  const pathname = usePathname()

  function updateCurrentPage(page: number) {
    setCurrentPage(page)
  }

  useEffect(() => {
    setCurrentPage(DEFAULT_CURRENT_PAGE)
    form.reset({
      itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
      search: DEFAULT_SEARCH,
    })
  }, [pathname, form])

  return (
    <TableContext.Provider
      value={{
        currentPage,
        search,
        itemsPerPage,
        updateCurrentPage,
        form,
      }}
    >
      {children}
    </TableContext.Provider>
  )
}

export const useTable = () => useContext(TableContext)
