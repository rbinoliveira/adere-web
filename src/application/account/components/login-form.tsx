'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  LoginSchema,
  loginSchema,
} from '@/application/account/schemas/login.schema'
import { CreateSessionService } from '@/application/account/services/create-session.service'
import { UI } from '@/application/shared/components'
import { addAuthCookies } from '@/application/shared/helpers'

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
