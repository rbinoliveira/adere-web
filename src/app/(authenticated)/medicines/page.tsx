'use client'

import { PlusCircleIcon } from '@phosphor-icons/react'

import { UI } from '@/core/_shared/components'
import { ListMedicineService } from '@/core/medicine/services/list-medicine.service'

export default function Medicines() {
  const { data } = ListMedicineService()

  if (!data) return null

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <h1 className="text-[1.9375rem] font-bold leading-[1.19]">
          Medicamentos
        </h1>
        <UI.Button>
          Adicionar
          <PlusCircleIcon />
        </UI.Button>
      </div>
      <UI.Table
        columns={[
          {
            columnLabel: 'Ingrediente ativo',
            columnName: 'activeIngredient',
            render: (row) => row.activeIngredient,
          },
        ]}
        data={data}
      />
    </div>
  )
}
