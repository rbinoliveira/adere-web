import { NextResponse } from 'next/server'

import { saveMedicineUseCaseSchema } from '@/features/medicine/schemas/save-medicine.schema'
import { normalizeName } from '@/shared/helpers/normalize-string.helper'
import { dbAdmin } from '@/shared/libs/firebase-admin'

export async function PUT(req: Request) {
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
    const medicineId = data.id

    if (!medicineId) {
      return NextResponse.json(
        { error: 'Medicamento não encontrado.' },
        { status: 404 },
      )
    }

    const medicineRef = dbAdmin.collection('medicines').doc(medicineId)
    const medicineSnap = await medicineRef.get()

    if (!medicineSnap.exists) {
      return NextResponse.json(
        { error: 'Medicamento não encontrado.' },
        { status: 404 },
      )
    }

    const nameNormalized = normalizeName(data.name)

    const updateData: {
      name: string
      nameNormalized: string
      dose: string
      pharmaceuticalForm: string
      administrationRoute: string
      quantity: number
      intervalHours: number
      durationDays?: number | null
      whilePain: boolean
      defaultDosage: string
      updatedAt: string
    } = {
      name: data.name,
      nameNormalized,
      dose: data.dose,
      pharmaceuticalForm: data.pharmaceuticalForm,
      administrationRoute: data.administrationRoute,
      quantity: data.quantity,
      intervalHours: data.intervalHours,
      whilePain: data.whilePain || false,
      defaultDosage: data.defaultDosage || '',
      updatedAt: new Date().toISOString(),
    }

    if (updateData.whilePain) {
      updateData.durationDays = null
    } else {
      updateData.durationDays = data.durationDays ?? null
    }

    await medicineRef.update(updateData)

    const updatedMedicine = {
      id: medicineId,
      name: data.name,
      nameNormalized,
      dose: data.dose,
      pharmaceuticalForm: data.pharmaceuticalForm,
      administrationRoute: data.administrationRoute,
      quantity: data.quantity,
      intervalHours: data.intervalHours,
      durationDays: updateData.durationDays ?? undefined,
      whilePain: updateData.whilePain,
      defaultDosage: updateData.defaultDosage,
    }

    return NextResponse.json(updatedMedicine)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Ocorreu um erro interno, tente novamente mais tarde.' },
      { status: 500 },
    )
  }
}
