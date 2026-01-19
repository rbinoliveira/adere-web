import { remove as removeAccents } from 'diacritics'
import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore'

import { PrescriptionModel } from '@/features/prescription/models/prescription.model'
import { db } from '@/shared/libs/firebase'
import { ListPaginatedModel } from '@/shared/models/list-paginated.model'

export type ListPrescriptionsUseCaseInput = {
  ownerId: string
  page: number
  itemsPerPage: number
  search?: string
  patientEmail?: string
}

export type ListPrescriptionsUseCaseOutput =
  ListPaginatedModel<PrescriptionModel>

export async function listPrescriptionsUseCase({
  ownerId,
  page,
  itemsPerPage,
  search,
  patientEmail,
}: ListPrescriptionsUseCaseInput): Promise<ListPrescriptionsUseCaseOutput> {
  if (!ownerId || ownerId.trim() === '') {
    return {
      items: [],
      totalItems: 0,
      totalPages: 0,
      currentPage: page,
      itemsPerPage,
    }
  }

  const prescriptionsRef = collection(db, 'prescriptions')

  let baseQuery

  if (patientEmail) {
    baseQuery = query(
      prescriptionsRef,
      where('ownerId', '==', ownerId),
      where('email', '==', patientEmail),
      orderBy('createdAt', 'desc'),
    )
  } else {
    baseQuery = query(
      prescriptionsRef,
      where('ownerId', '==', ownerId),
      orderBy('nameNormalized'),
    )
  }

  if (search && search.trim()) {
    const searchNormalized = removeAccents(search.trim().toLowerCase())

    const endName = searchNormalized.replace(/.$/, (c: string) =>
      String.fromCharCode(c.charCodeAt(0) + 1),
    )

    const queryConditions: Parameters<typeof query> = [
      prescriptionsRef,
      where('ownerId', '==', ownerId),
      where('nameNormalized', '>=', searchNormalized),
      where('nameNormalized', '<', endName),
      orderBy('nameNormalized'),
    ]

    if (patientEmail) {
      queryConditions.splice(3, 0, where('email', '==', patientEmail))
    }

    const queryByName = query(...queryConditions)

    const [snapName] = await Promise.all([getDocs(queryByName)])

    const allDocs = [...snapName.docs]
    const uniqueDocsMap = new Map(allDocs.map((doc) => [doc.id, doc]))
    const uniqueDocs = Array.from(uniqueDocsMap.values())

    const totalItems = uniqueDocs.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const start = (page - 1) * itemsPerPage
    const end = start + itemsPerPage
    const pageDocs = uniqueDocs.slice(start, end)

    const prescriptions = pageDocs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<PrescriptionModel, 'id'>),
    }))

    return {
      items: prescriptions,
      totalItems,
      totalPages,
      currentPage: page,
      itemsPerPage,
    }
  }

  const countSnap = await getCountFromServer(baseQuery)

  const totalItems = countSnap.data().count
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const skip = (page - 1) * itemsPerPage
  let startAfterDoc = null

  if (skip > 0) {
    const prevSnapshot = await getDocs(query(baseQuery, limit(skip)))
    const docs = prevSnapshot.docs
    if (docs.length > 0) {
      startAfterDoc = docs[docs.length - 1]
    }
  }

  let finalQuery = baseQuery
  if (startAfterDoc) {
    finalQuery = query(baseQuery, startAfter(startAfterDoc))
  }

  const snapshot = await getDocs(query(finalQuery, limit(itemsPerPage)))

  const prescriptions = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<PrescriptionModel, 'id'>),
  }))

  return {
    items: prescriptions,
    totalItems,
    totalPages,
    currentPage: page,
    itemsPerPage,
  }
}
