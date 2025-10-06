import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { getStorage } from 'firebase-admin/storage'

import { envVars } from '@/application/_shared/config/env/env.mjs'

const base64 = envVars.GCP_SERVICE_ACCOUNT
if (!base64) throw new Error('Missing GOOGLE_CLOUD_SERVICE_ACCOUNT_JSON')

const serviceAccount = JSON.parse(
  Buffer.from(base64, 'base64').toString('utf-8'),
)

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  })
}

export const dbAdmin = getFirestore(envVars.GCP_FIRESTORE_DB_ID)
export const storageAdmin = getStorage().bucket(envVars.GCP_STORAGE_BUCKET_ID)
export const authAdmin = getAuth()
