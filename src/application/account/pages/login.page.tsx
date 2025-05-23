import Image from 'next/image'

import { LoginForm } from '@/application/account/components/login-form'
import { UI } from '@/application/shared/components'

export function LoginPage() {
  return (
    <main className="flex min-h-screen w-full flex-col md:flex-row">
      <UI.ColorSwitcher className="fixed right-6 top-6" />
      <div className="flex-1 bg-amber-700">ew</div>
      <section className="flex max-w-full flex-1 items-center justify-center md:max-w-[640px]">
        <div className="mx-auto flex w-full max-w-[459px] flex-col items-start px-[1.875rem]">
          <h1 className="mb-1 self-center text-center text-[2rem] font-medium">
            Welcome Back, Ahmad!
          </h1>
          <p className="text-text-three mb-10 self-center text-center text-[1.125rem] font-medium leading-[1.5]">
            Welcome back, please enter your detail
          </p>
          <LoginForm />
          <span className="text-text-three my-6 self-center font-medium">
            ou
          </span>
          <UI.Button variant="secondary" className="mb-4 w-full">
            <Image
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
        </div>
      </section>
    </main>
  )
}
