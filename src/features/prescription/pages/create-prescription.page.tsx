import { SavePrescriptionForm } from '@/features/prescription/components/save-prescription-form'
import {
  FormCard,
  FormCardHeader,
} from '@/shared/components/molecules/form/form-card'

export function CreatePrescriptionPage() {
  return (
    <FormCard>
      <FormCardHeader
        title="Nova Prescrição"
        subtitle="Preencha os dados abaixo para criar uma nova prescrição"
      />
      <SavePrescriptionForm />
    </FormCard>
  )
}
