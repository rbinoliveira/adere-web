import { NextResponse } from 'next/server'

import { saveMedicineUseCaseSchema } from '@/features/medicine/schemas/save-medicine.schema'
import { normalizeName } from '@/shared/helpers/normalize-string.helper'
import { dbAdmin } from '@/shared/libs/firebase-admin'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const parsed = saveMedicineUseCaseSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.flatten().fieldErrors },
        { status: 400 },
      )
    }

    const data = parsed.data

    const medicinesRef = dbAdmin.collection('medicines')
    const newDocRef = medicinesRef.doc()

    const nameNormalized = normalizeName(data.name)

    await newDocRef.set({
      id: newDocRef.id,
      name: data.name,
      nameNormalized,
      dose: data.dose,
      pharmaceuticalForm: data.pharmaceuticalForm,
      administrationRoute: data.administrationRoute,
      quantity: data.quantity,
      intervalHours: data.intervalHours,
      durationDays: data.durationDays,
      whilePain: data.whilePain || false,
      defaultDosage: data.defaultDosage || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    const createdMedicine = {
      id: newDocRef.id,
      name: data.name,
      nameNormalized,
      dose: data.dose,
      pharmaceuticalForm: data.pharmaceuticalForm,
      administrationRoute: data.administrationRoute,
      quantity: data.quantity,
      intervalHours: data.intervalHours,
      durationDays: data.durationDays,
      whilePain: data.whilePain || false,
      defaultDosage: data.defaultDosage || '',
    }

    return NextResponse.json(createdMedicine)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Ocorreu um erro interno, tente novamente mais tarde.' },
      { status: 500 },
    )
  }
}
