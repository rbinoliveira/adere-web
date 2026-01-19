import {
  FormCard,
  FormCardHeader,
} from '@/shared/components/molecules/form/form-card'
import { SaveMedicineForm } from '@/features/medicine/components/save-medicine-form'

export function CreateMedicinePage() {
  return (
    <FormCard>
      <FormCardHeader
        title="Informações do Medicamento"
        subtitle="Preencha os dados abaixo para cadastrar um novo medicamento"
      />
      <SaveMedicineForm />
    </FormCard>
  )
}
