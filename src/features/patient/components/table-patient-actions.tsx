import { Eye, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

import { PatientModel } from '@/features/patient/models/patient.model'
import { DeletePatientService } from '@/features/patient/service/delete-patient.service'
import { listPatientsQueryKey } from '@/features/patient/service/list-patients.service'
import { Button } from '@/shared/components/atoms/button'
import { appRoutes } from '@/shared/constants/app-routes.constant'
import { handleError } from '@/shared/helpers/error.helper'
import { useDialog } from '@/shared/hooks/dialog.hook'
import { queryClient } from '@/shared/libs/react-query'

type TablePatientActionsProps = {
  patient: PatientModel
}

export function TablePatientActions({ patient }: TablePatientActionsProps) {
  const { openDialog, closeDialog } = useDialog()
  const { mutateAsync } = DeletePatientService()

  async function deletePatient() {
    try {
      await mutateAsync({ id: patient.id })
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === listPatientsQueryKey,
      })
      toast.success('Paciente deletado com sucesso!')
      closeDialog()
    } catch (err) {
      handleError({ err })
    }
  }

  function handleDelete() {
    openDialog({
      title: 'Excluir paciente',
      description: `Tem certeza que deseja excluir o paciente "${patient.name}"?`,
      confirmButton: {
        label: 'Excluir',
        onClick: deletePatient,
      },
      cancelButton: {
        label: 'Cancelar',
        onClick: () => {},
      },
    })
  }

  return (
    <div className="flex items-center gap-1">
      <Button variant="ghost" size="sm" asChild title="Ver perfil">
        <Link href={`${appRoutes.patients}/${patient.id}`}>
          <Eye className="text-primary h-4 w-4" />
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDelete}
        title="Excluir paciente"
      >
        <Trash2 className="text-danger-one h-4 w-4" />
      </Button>
    </div>
  )
}
