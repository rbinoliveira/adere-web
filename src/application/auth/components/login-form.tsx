'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { UI } from '@/application/_shared/components'
import { addAuthCookies } from '@/application/_shared/helpers/add-auth-cookies.helper'
import { useAuth } from '@/application/auth/hooks/auth.hook'
import {
  LoginSchema,
  loginSchema,
} from '@/application/auth/schemas/login.schema'
import { CreateSessionService } from '@/application/auth/services/create-session.service'

export function LoginForm() {
  const { control, handleSubmit } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })

  const { loginWithGoogle } = useAuth()

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
      <h1 className="mb-1 self-center text-center text-[2rem] font-medium">
        Welcome Back, Ahmad!
      </h1>
      <p className="text-text-three mb-10 self-center text-center text-[1.125rem] font-medium leading-[1.5]">
        Welcome back, please enter your detail
      </p>
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
      <span className="text-text-three my-6 self-center font-medium">ou</span>
      <UI.Button
        variant="secondary"
        className="mb-4 w-full"
        onClick={loginWithGoogle}
      >
        <UI.Image
          src={'/google.svg'}
          alt="Ícone do google"
          width={19}
          height={19}
        />
        Entrar com o Google
      </UI.Button>
      <div className="inline-flex items-center gap-1">
        <span className="font-medium">Não tem uma conta?</span>
        <UI.Button variant="ghost" className="text-primary font-medium">
          Crie uma conta
        </UI.Button>
      </div>
    </form>
  )
}
