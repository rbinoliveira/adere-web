import {
  FormCard,
  FormCardHeader,
} from '@/shared/components/molecules/form/form-card'
import { SavePrescriptionForm } from '@/features/prescription/components/save-prescription-form'

export function CreatePrescriptionPage() {
  return (
    <FormCard>
      <FormCardHeader
        title="Informações do Medicamento"
        subtitle="Preencha os dados abaixo para cadastrar um novo medicamento"
      />
      <SavePrescriptionForm />
    </FormCard>
  )
}
