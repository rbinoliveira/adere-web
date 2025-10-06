import { dbAdmin } from '@/application/_shared/libs/firebase-admin'
import { SavePatientFirestoreSchema } from '@/application/patient/schemas/save-patient.schema'

export function createPatientInFirestore(
  docId: string,
  data: SavePatientFirestoreSchema,
) {
  const usersRef = dbAdmin.collection('users')

  return usersRef.doc(docId).set({
    name: data.name,
    phone: data.phone,
    dob: data.dob,
    email: data.email,
    ownerId: data.ownerId,
    role: 'patient',
  })
}
