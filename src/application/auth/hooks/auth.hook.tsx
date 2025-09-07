'use client'

import {
  EmailAuthProvider,
  GoogleAuthProvider,
  linkWithCredential,
  onAuthStateChanged,
  signInWithPopup,
  User as FirebaseUser,
} from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { usePathname, useRouter } from 'next/navigation'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { appRoutes } from '@/application/_shared/constants/app-routes.constant'
import { addAuthCookies } from '@/application/_shared/helpers/add-auth-cookies.helper'
import { deleteAuthCookies } from '@/application/_shared/helpers/delete-auth-cookies.helper'
import { handleError } from '@/application/_shared/helpers/error.helper'
import { generateRandomPassword } from '@/application/_shared/helpers/generate-password'
import { auth, db, provider } from '@/application/_shared/libs/firebase'

type User = {
  id: string
  email: string
  name: string
  role: string
  photo: string
}

type AuthContextType = {
  user: User | null
  loading: boolean
  loginWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const pathname = usePathname()
  const router = useRouter()

  async function loginWithGoogle() {
    try {
      await signInWithPopup(auth, provider)
    } catch (err) {
      handleError({ err })
    }
  }

  async function linkToAuthProviders(user: FirebaseUser | null) {
    if (!user) {
      return
    }

    const hasEmailProvider = user.providerData.some(
      (p) => p.providerId === 'password',
    )
    if (!hasEmailProvider) {
      const email = user.email
      const password = generateRandomPassword()

      const credential = EmailAuthProvider.credential(email!, password)
      await linkWithCredential(user, credential)
    }

    const hasGoogleProvider = user.providerData.some(
      (p) => p.providerId === 'google.com',
    )
    if (!hasGoogleProvider) {
      const credential = GoogleAuthProvider.credential()
      await linkWithCredential(user, credential)
    }
  }

  async function getOrCreateFirestoreUser(user: FirebaseUser): Promise<User> {
    const userRef = doc(db, 'users', user.uid)
    const userSnap = await getDoc(userRef)

    if (!userSnap.exists()) {
      const newUser: User = {
        id: user.uid,
        email: user.email || '',
        name: user.displayName || '',
        role: 'admin',
        photo: user.photoURL || '',
      }

      await setDoc(userRef, {
        ...newUser,
        createdAt: serverTimestamp(),
        uid: user.uid,
      })

      return newUser
    }

    const data = userSnap.data()!

    return {
      id: data.uid,
      email: data.email,
      name: data.name,
      role: data.role,
      photo: data.photo,
    }
  }

  const signOut = useCallback(async () => {
    try {
      if (auth.currentUser) {
        await auth.signOut()
      }
      await deleteAuthCookies()
      setUser(null)
      if (pathname !== appRoutes.signIn) {
        router.push(appRoutes.signIn)
      }
    } catch (err) {
      handleError({
        err,
      })
    }
  }, [pathname, router])

  const setUserAsLoggedIn = useCallback(
    async (user: User | null) => {
      if (user) {
        if (user.role === 'admin') {
          await addAuthCookies({
            userId: user.id,
          })
          setUser(user)
          if (pathname !== appRoutes.dashboard) {
            router.push(appRoutes.dashboard)
          }
        } else {
          await signOut()
          handleError({
            message: 'Usuário já associado a uma conta de paciente',
          })
        }
      } else {
        await signOut()
      }
    },
    [pathname, router, signOut],
  )

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('firebaseUser', firebaseUser)
      let user = null

      await linkToAuthProviders(firebaseUser)

      if (firebaseUser) {
        user = await getOrCreateFirestoreUser(firebaseUser)
      }

      await setUserAsLoggedIn(user)
      setLoading(false)
    })

    return unsubscribe
  }, [setUserAsLoggedIn])

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
