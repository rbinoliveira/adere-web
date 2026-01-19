'use client'

import {
  Archive,
  Calendar,
  CheckCircle,
  Edit,
  FilePlus,
  FileText,
  Mail,
  MapPin,
  Phone,
  Target,
  User,
} from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { useAuth } from '@/features/auth/hooks/auth.hook'
import { MetricCard } from '@/features/dashboard/components/metric-card'
import { genderLabels } from '@/features/patient/models/patient.model'
import { ShowPatientService } from '@/features/patient/service/show-patient.service'
import { TablePrescriptionActions } from '@/features/prescription/components/table-prescription-actions'
import { TablePrescriptionName } from '@/features/prescription/components/table-prescription-name'
import { ListPrescriptionsService } from '@/features/prescription/service/list-prescriptions.service'
import { Button } from '@/shared/components/atoms/button'
import { DataHandler } from '@/shared/components/molecules/data-handler'
import { appRoutes } from '@/shared/constants/app-routes.constant'
import { getDifferenceInYears } from '@/shared/helpers/date.helper'
import { useTable } from '@/shared/hooks/table.hook'

export function ViewPatientProfilePage() {
  const params = useParams<{ id: string }>()
  const id = params.id

  const { itemsPerPage, currentPage } = useTable()

  const { data: patient, isError, isLoading } = ShowPatientService({ id })

  const { user } = useAuth()

  const {
    data: prescriptionsData,
    isError: isErrorPrescriptions,
    isLoading: isLoadingPrescriptions,
  } = ListPrescriptionsService({
    ownerId: user?.id ?? '',
    page: currentPage,
    itemsPerPage,
    patientEmail: patient?.email ?? undefined,
  })

  if (!patient) {
    return null
  }

  const age = getDifferenceInYears(patient.dob)

  const formatAddress = () => {
    if (!patient.address) return 'Não informado'
    const addr = patient.address
    const parts = [
      addr.street && addr.number && `${addr.street}, ${addr.number}`,
      addr.complement,
      addr.neighborhood,
      addr.city && addr.state && `${addr.city} - ${addr.state}`,
      addr.zipCode,
    ].filter(Boolean)
    return parts.length > 0 ? parts.join(', ') : 'Não informado'
  }

  const totalPrescriptions = prescriptionsData?.totalItems ?? 0
  const activePrescriptions = totalPrescriptions
  const finishedPrescriptions = 0
  const adherenceRate = 0

  return (
    <DataHandler isError={isError} isLoading={isLoading}>
      <div className="flex flex-col gap-6 p-6">
        <div>
          <h1 className="text-text-one text-2xl font-bold">{patient.name}</h1>
          <p className="text-text-two text-sm">
            ({age} {age === 1 ? 'ano' : 'anos'})
          </p>
        </div>

        <section className="shadow-one flex flex-col gap-4 rounded-2xl bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-text-one text-lg font-semibold">
              Informações do Paciente
            </h2>
            <Button variant="secondary" asChild>
              <Link href={`${appRoutes.patients}/${patient.id}/editar`}>
                <Edit className="h-4 w-4" />
                Editar
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-start gap-3">
              <User className="text-text-three mt-0.5 h-5 w-5" />
              <div className="flex flex-col">
                <span className="text-text-two text-xs">Nome</span>
                <span className="text-text-one text-sm font-medium">
                  {patient.name}
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="text-text-three mt-0.5 h-5 w-5" />
              <div className="flex flex-col">
                <span className="text-text-two text-xs">
                  Data de Nascimento
                </span>
                <span className="text-text-one text-sm font-medium">
                  ({age} {age === 1 ? 'ano' : 'anos'})
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <User className="text-text-three mt-0.5 h-5 w-5" />
              <div className="flex flex-col">
                <span className="text-text-two text-xs">Gênero</span>
                <span className="text-text-one text-sm font-medium">
                  {genderLabels[patient.gender]}
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="text-text-three mt-0.5 h-5 w-5" />
              <div className="flex flex-col">
                <span className="text-text-two text-xs">Telefone</span>
                <span className="text-text-one text-sm font-medium">
                  {patient.phone}
                </span>
              </div>
            </div>
            {patient.email && (
              <div className="flex items-start gap-3">
                <Mail className="text-text-three mt-0.5 h-5 w-5" />
                <div className="flex flex-col">
                  <span className="text-text-two text-xs">E-mail</span>
                  <span className="text-text-one text-sm font-medium">
                    {patient.email}
                  </span>
                </div>
              </div>
            )}
            {patient.address && (
              <div className="flex items-start gap-3">
                <MapPin className="text-text-three mt-0.5 h-5 w-5" />
                <div className="flex flex-col">
                  <span className="text-text-two text-xs">Endereço</span>
                  <span className="text-text-one text-sm font-medium">
                    {formatAddress()}
                  </span>
                </div>
              </div>
            )}
          </div>
        </section>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            icon={<FileText className="h-7 w-7 text-white" />}
            iconBgColor="bg-blue-500"
            value={totalPrescriptions}
            label="Total de Prescrições"
            description="Prescrições cadastradas"
          />
          <MetricCard
            icon={<CheckCircle className="h-7 w-7 text-white" />}
            iconBgColor="bg-primary"
            value={activePrescriptions}
            label="Prescrições Ativas"
            description="Em tratamento"
          />
          <MetricCard
            icon={<Archive className="h-7 w-7 text-white" />}
            iconBgColor="bg-gray-500"
            value={finishedPrescriptions}
            label="Prescrições Finalizadas"
            description="Tratamento concluído"
          />
          <MetricCard
            icon={<Target className="h-7 w-7 text-white" />}
            iconBgColor="bg-green"
            value={`${adherenceRate}%`}
            label="Taxa de Adesão"
            description="Aderência às medicações"
          />
        </div>

        <section className="shadow-one flex flex-col gap-4 rounded-2xl bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-text-one text-lg font-semibold">
              Histórico de Prescrições
            </h2>
            <Button variant="primary" asChild>
              <Link
                href={`${appRoutes.prescriptions}/adicionar?patientName=${encodeURIComponent(patient.name)}`}
              >
                <FilePlus className="h-4 w-4" />
                Nova Prescrição
              </Link>
            </Button>
          </div>
          <DataHandler
            isError={isErrorPrescriptions}
            isLoading={isLoadingPrescriptions}
          >
            {prescriptionsData && prescriptionsData.items.length > 0 ? (
              <div className="divide-border-one flex flex-col divide-y">
                {prescriptionsData.items.map((prescription) => (
                  <div
                    key={prescription.id}
                    className="flex items-center justify-between p-4"
                  >
                    <TablePrescriptionName prescription={prescription} />
                    <TablePrescriptionActions prescription={prescription} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-text-two py-4 text-center text-sm">
                Nenhuma prescrição encontrada
              </p>
            )}
          </DataHandler>
        </section>
      </div>
    </DataHandler>
  )
}
