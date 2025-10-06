'use client'

import { DataHandler } from '@/application/_shared/components/molecules/data-handler'
import { Table } from '@/application/_shared/components/organisms/table/table'
import { useTable } from '@/application/_shared/hooks/table.hook'
import { useAuth } from '@/application/auth/hooks/auth.hook'
import { ListPatientsService } from '@/application/patient/service/list-patients.service'

export function ListPatientsPage() {
  const { user } = useAuth()
  const { itemsPerPage, search, currentPage } = useTable()

  const { data, isError, isLoading } = ListPatientsService({
    ownerId: user?.id || '',
    page: currentPage,
    itemsPerPage,
    search,
  })

  return (
    <div className="flex flex-col gap-6">
      <DataHandler isError={isError} isLoading={isLoading}>
        {data && (
          <Table
            actions={{
              search: {
                placeholder: 'Buscar pacientes...',
              },
              add: {
                label: 'Adicionar Paciente',
                href: '/pacientes/adicionar',
              },
            }}
            columns={[
              {
                columnLabel: 'Paciente',
                columnName: 'name',
                render: (row) => row.name,
              },
              {
                columnLabel: 'Data de Nascimento',
                columnName: 'dob',
                render: (row) => row.dob,
              },
              {
                columnLabel: 'Telefone',
                columnName: 'phone',
                render: (row) => row.phone,
              },
            ]}
            data={data}
          />
        )}
      </DataHandler>
    </div>
  )
}
