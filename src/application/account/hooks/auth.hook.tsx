import React, { createContext, ReactNode, useContext, useMemo } from 'react'

import { GetAccountService } from '@/application/account/services/get-account.service'
import { AccountModel } from '@/domain/account/models/account.model'

type AuthContextData = {
  account: AccountModel | null
  isLoadingAccount: boolean
}

type AuthProviderProps = {
  children: ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const { data, isLoading: isLoadingAccount } = GetAccountService()

  const account = useMemo(() => {
    return data?.account ?? null
  }, [data])

  return (
    <AuthContext.Provider
      value={{
        account,
        isLoadingAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
