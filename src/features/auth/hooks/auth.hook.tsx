'use client'

import {
  EmailAuthProvider,
  linkWithCredential,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useRef, useState } from 'react'

import { UserModel } from '@/features/auth/models/user.model'
import {
  getUser,
  upsertUser,
} from '@/features/auth/services/auth-firebase.service'
import {
  appPublicRoutes,
  appRoutes,
} from '@/shared/constants/app-routes.constant'
import { addAuthCookies } from '@/shared/helpers/add-auth-cookies.helper'
import { deleteAuthCookies } from '@/shared/helpers/delete-auth-cookies.helper'
import { handleError } from '@/shared/helpers/error.helper'
import { generateRandomPassword } from '@/shared/helpers/generate-password'
import { getAuthCookies } from '@/shared/helpers/get-auth-cookies.helper'
import { auth } from '@/shared/libs/firebase'
import { userSchema } from '@/features/auth/schemas/user.schema'

type AuthContextType = {
  user: UserModel | null
  updateUser: (userUpdated: UserModel) => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserModel | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const previousUserRef = useRef<UserModel | null>(null)
  const hasRedirectedRef = useRef(false)

  async function linkToAuthProviders(firebaseUser: FirebaseUser | null) {
    if (!firebaseUser) {
      return
    }

    const hasEmailProvider = firebaseUser.providerData.some(
      (p) => p.providerId === 'password',
    )
    if (!hasEmailProvider) {
      const email = firebaseUser.email
      const password = generateRandomPassword()

      const credential = EmailAuthProvider.credential(email!, password)
      await linkWithCredential(firebaseUser, credential)
    }
  }

  async function getOrCreateFirestoreUser(
    firebaseUser: FirebaseUser,
  ): Promise<UserModel> {
    const userDocument = await getUser(firebaseUser.uid)

    if (!userDocument) {
      const userByCookies = await getAuthCookies()
      const parsedUserByCookies = userByCookies
        ? JSON.parse(userByCookies)
        : null
      const newUser: UserModel = {
        id: firebaseUser.uid,
        email: firebaseUser.email ?? '',
        name: firebaseUser.displayName ?? parsedUserByCookies?.name ?? '',
        role: 'dentist',
        photo: firebaseUser.photoURL ?? '',
        status: 'pending',
      }

      await upsertUser(firebaseUser.uid, newUser)

      return newUser
    }

    return {
      id: userDocument.id,
      email: userDocument.email,
      name: userDocument.name,
      role: userDocument.role,
      photo: userDocument.photo,
      cro: userDocument.cro,
      phone: userDocument.phone,
      status: userDocument.status,
    }
  }

  async function setUserAsLoggedIn(userUpdated: UserModel | null) {
    if (userUpdated) {
      if (userUpdated.role !== 'admin' && userUpdated.role !== 'dentist') {
        await auth.signOut()
        await deleteAuthCookies()
        handleError({
          message: 'Usuário já associado a uma conta de paciente',
        })
        return
      }

      if (userUpdated.status === 'rejected') {
        await auth.signOut()
        await deleteAuthCookies()
        handleError({
          message: 'Sua conta foi rejeitada. Entre em contato com o suporte.',
        })
        return
      }

      await addAuthCookies({ user: userUpdated })
      setUser(userUpdated)
    } else {
      await deleteAuthCookies()
      setUser(null)
    }
  }

  function updateUser(userUpdated: UserModel) {
    setUser(userUpdated)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      let userUpdated = null

      await linkToAuthProviders(authUser)

      if (authUser) {
        userUpdated = await getOrCreateFirestoreUser(authUser)
      }

      const previousUser = previousUserRef.current
      const userChanged = previousUser?.id !== userUpdated?.id
      
      await setUserAsLoggedIn(userUpdated)
      
      // Atualiza a ref com o novo usuário
      previousUserRef.current = userUpdated

      // O redirecionamento é feito pelo proxy no servidor
      // Apenas força reload quando o usuário faz login (de null para user)
      // e está em uma rota pública, para que o proxy possa redirecionar
      if (typeof window !== 'undefined' && userChanged && !hasRedirectedRef.current) {
        const currentPath = window.location.pathname
        const hasReloadedAfterLogin = sessionStorage.getItem('auth_reload_done')
        
        if (userUpdated && !previousUser) {
          // Usuário acabou de fazer login
          const profileCompleted = userSchema.safeParse(userUpdated).success
          const isOnCorrectRoute = profileCompleted 
            ? currentPath === appRoutes.dashboard
            : currentPath === appRoutes.completeProfile
          
          // Só força reload se estiver em rota pública ou rota incorreta
          // e ainda não fez reload após login
          if (!hasReloadedAfterLogin && (appPublicRoutes.includes(currentPath) || !isOnCorrectRoute)) {
            hasRedirectedRef.current = true
            sessionStorage.setItem('auth_reload_done', 'true')
            setTimeout(() => {
              window.location.reload()
            }, 100)
            return
          } else if (hasReloadedAfterLogin) {
            // Limpa a flag após usar
            sessionStorage.removeItem('auth_reload_done')
          }
        } else if (!userUpdated && previousUser) {
          // Usuário acabou de fazer logout
          sessionStorage.removeItem('auth_reload_done')
          if (currentPath !== appRoutes.signIn) {
            hasRedirectedRef.current = true
            window.location.href = appRoutes.signIn
            return
          }
        }
      }

      setLoading(false)
    })

    return unsubscribe
  }, [])

  // Redirecionamento agora é feito no servidor pelo proxy
  // Removido para evitar content switch (flash de conteúdo)

  useEffect(() => {
    async function getUser() {
      const authCookie = await getAuthCookies()
      if (authCookie) {
        setUser(JSON.parse(authCookie))
      }
    }

    getUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
