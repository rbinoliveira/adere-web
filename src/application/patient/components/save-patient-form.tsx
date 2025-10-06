'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AtSign, Calendar, Check, Phone, User } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/application/_shared/components/atoms/button'
import { FormCardFooter } from '@/application/_shared/components/molecules/form/form-card'
import { InputDate } from '@/application/_shared/components/molecules/form/input-date'
import { InputMaskedText } from '@/application/_shared/components/molecules/form/input-masked-text'
import { InputText } from '@/application/_shared/components/molecules/form/input-text'
import { convertToNumberDate } from '@/application/_shared/helpers/date.helper'
import { handleError } from '@/application/_shared/helpers/error.helper'
import api from '@/application/_shared/libs/axios'
import { useAuth } from '@/application/auth/hooks/auth.hook'
import {
  SavePatientFormSchema,
  savePatientFormSchema,
} from '@/application/patient/schemas/save-patient.schema'

export function SavePatientForm() {
  const { control, handleSubmit } = useForm<SavePatientFormSchema>({
    resolver: zodResolver(savePatientFormSchema),
  })

  const { user } = useAuth()

  async function onSubmit(data: SavePatientFormSchema) {
    try {
      await api.post('/api/create-patient', {
        ...data,
        password: convertToNumberDate(data.dob),
        ownerId: user?.id,
      })
      toast('Paciente cadastrado com sucesso')
    } catch (error) {
      handleError({ err: error })
    }
  }

  return (
    <form className="flex flex-col mt-8 gap-6">
      <InputText
        placeholder="Ex: Maria da Silva Santos"
        label="Nome Completo"
        control={control}
        name="name"
        iconBefore={<User />}
      />
      <InputText
        placeholder="Ex: maria.silva.santos@gmail.com"
        label="E-mail"
        control={control}
        name="email"
        iconBefore={<AtSign />}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputMaskedText
          label="Telefone"
          mask="phone"
          control={control}
          name="phone"
          iconBefore={<Phone />}
          placeholder="(11) 99999-9999"
        />
        <InputDate
          label="Data de Nascimento"
          control={control}
          name="dob"
          iconBefore={<Calendar />}
        />
      </div>
      <FormCardFooter>
        <Button variant="secondary" className="max-w-[116px]">
          Cancelar
        </Button>
        <Button
          variant="primary"
          className="max-w-[205px]"
          onClick={handleSubmit(onSubmit)}
        >
          <Check size={16} />
          Completar
        </Button>
      </FormCardFooter>
    </form>
  )
}
