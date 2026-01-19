export type PrescriptionStatus = 'active' | 'finished' | 'cancelled'

export type PrescriptionModel = {
  id: string
  patientId: string
  patientEmail: string
  patientName: string
  medicineId: string
  medicineName: string
  dosage: string
  ownerId: string
  status: PrescriptionStatus
  createdAt?: Date | string
  updatedAt?: Date | string
}

export const prescriptionStatusLabels: Record<PrescriptionStatus, string> = {
  active: 'Ativa',
  finished: 'Finalizada',
  cancelled: 'Cancelada',
}
