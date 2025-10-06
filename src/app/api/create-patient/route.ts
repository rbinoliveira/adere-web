import { NextResponse } from 'next/server'

import { authAdmin, dbAdmin } from '@/application/_shared/libs/firebase-admin'
import { savePatientFirestoreSchema } from '@/application/patient/schemas/save-patient.schema'
import { createPatientInFirestore } from '@/application/patient/use-cases/patient-firebase-admin.service'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const parsed = savePatientFirestoreSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.flatten().fieldErrors },
        { status: 400 },
      )
    }

    const data = parsed.data

    const usersRef = dbAdmin.collection('users')
    const existingFirestoreUser = await usersRef
      .where('email', '==', data.email)
      .limit(1)
      .get()

    if (!existingFirestoreUser.empty) {
      return NextResponse.json(
        { error: 'Usuário já existe no banco de dados.' },
        { status: 400 },
      )
    }

    let authUser = null
    try {
      authUser = await authAdmin.getUserByEmail(data.email)
    } catch (err: any) {
      if (err.code !== 'auth/user-not-found') {
        return NextResponse.json(
          { error: 'Erro ao verificar usuário no Auth.' },
          { status: 500 },
        )
      }
    }

    if (authUser) {
      await createPatientInFirestore(authUser.uid, data)

      return NextResponse.json({
        message: 'Usuário já existia no Auth. Criado no Firestore.',
        uid: authUser.uid,
      })
    }

    const newAuthUser = await authAdmin.createUser({
      email: data.email,
      password: data.password,
      displayName: data.name,
    })

    await createPatientInFirestore(newAuthUser.uid, data)

    return NextResponse.json({
      message: 'Usuário criado com sucesso no Auth e Firestore.',
      uid: newAuthUser.uid,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor.' },
      { status: 500 },
    )
  }
}
