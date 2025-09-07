import { LoginForm } from '@/application/auth/components/login-form'
import { LoginInformations } from '@/application/auth/components/login-informations'

export function LoginPage() {
  return (
    <main className="linear-bg-one flex min-h-screen w-full flex-col md:flex-row">
      <section className="flex max-w-full flex-1 items-center justify-center md:max-w-[640px]">
        <LoginInformations />
      </section>
      <section className="flex max-w-full flex-1 items-center justify-center md:max-w-[640px]">
        <LoginForm />
      </section>
    </main>
  )
}
