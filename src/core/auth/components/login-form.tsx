'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { UI } from '@/core/_shared/components'
import { addAuthCookies } from '@/core/_shared/helpers/add-auth-cookies.helper'
import { LoginSchema, loginSchema } from '@/core/auth/schemas/login.schema'
import { CreateSessionService } from '@/core/auth/services/create-session.service'

export function LoginForm() {
  const { control, handleSubmit } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })

  const { mutate: createSession } = CreateSessionService({
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data
      addAuthCookies({ accessToken, refreshToken })
    },
  })

  async function handleCreateSession(data: LoginSchema) {
    createSession(data)
  }

  return (
    <form
      className="flex w-full flex-col gap-5"
      onSubmit={handleSubmit(handleCreateSession)}
    >
      <UI.InputText control={control} name="email" placeholder="E-mail" />
      <UI.InputText
        control={control}
        name="password"
        placeholder="Senha"
        type="password"
      />
      <UI.Button
        className="text-text-three mb-8 self-end font-medium"
        variant="ghost"
      >
        Esqueci minha senha
      </UI.Button>
      <UI.Button className="w-full" type="submit">
        Entrar
      </UI.Button>
    </form>
  )
}
