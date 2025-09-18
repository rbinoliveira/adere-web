import { FormCard } from '@/application/_shared/components/molecules/form-card'
import { CompleteProfileForm } from '@/application/auth/components/complete-profile-form'

export function CompleteProfilePage() {
  return (
    <main className="linear-one px-6 lg:px-0 flex flex-col w-full min-h-screen items-center justify-center">
      <section className="flex flex-col w-full max-w-[900px] mx-auto">
        <FormCard className="gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold">Complete seu perfil</h1>
            <h2 className="text-text-two">
              Preencha os campos abaixo para completar seu perfil
            </h2>
          </div>
          <CompleteProfileForm />
        </FormCard>
      </section>
    </main>
  )
}
