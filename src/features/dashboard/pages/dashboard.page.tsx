'use client'

import { AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react'
import Link from 'next/link'

import { useAuth } from '@/features/auth/hooks/auth.hook'
import { AlertNotification } from '@/features/dashboard/components/alert-notification'
import { MetricCard } from '@/features/dashboard/components/metric-card'
import { QuickActions } from '@/features/dashboard/components/quick-actions'
import { RecentPrescription } from '@/features/dashboard/components/recent-prescription'
import { GetDashboardMetricsService } from '@/features/dashboard/service/get-dashboard-metrics.service'
import { GetRecentPrescriptionsService } from '@/features/dashboard/service/get-recent-prescriptions.service'
import { formatTimeAgo } from '@/features/dashboard/utils/format-time-ago'
import { appRoutes } from '@/shared/constants/app-routes.constant'

export function DashboardPage() {
  const { user } = useAuth()

  const { data: metrics, isLoading: isLoadingMetrics } =
    GetDashboardMetricsService({
      ownerId: user?.id ?? '',
    })

  const { data: recentPrescriptions, isLoading: isLoadingPrescriptions } =
    GetRecentPrescriptionsService({
      ownerId: user?.id ?? '',
      limitCount: 5,
    })

  return (
    <div className="flex flex-col gap-6 p-6">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <MetricCard
          icon={<CheckCircle className="h-7 w-7 text-white" />}
          iconBgColor="bg-green-500"
          value={isLoadingMetrics ? '-' : (metrics?.activePrescriptions ?? 0)}
          label="Tratamentos Ativos"
          description="Pacientes em tratamento"
        />
        <MetricCard
          icon={<TrendingUp className="h-7 w-7 text-white" />}
          iconBgColor="bg-purple-500"
          value={isLoadingMetrics ? '-' : `${metrics?.adherenceRate ?? 0}%`}
          label="Adesão Média"
          description="Aderência às medicações"
        />
        <MetricCard
          icon={<AlertTriangle className="h-7 w-7 text-white" />}
          iconBgColor="bg-[#DC2626]"
          value={isLoadingMetrics ? '-' : (metrics?.pendingAlerts ?? 0)}
          label="Alertas Pendentes"
          description="Requerem atenção"
        />
      </section>

      <section className="shadow-one flex flex-col gap-4 rounded-2xl bg-white p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-text-one text-lg font-semibold">
            Notificações de Alerta
          </h3>
          <Link
            href="#"
            className="text-primary text-sm font-medium hover:underline"
          >
            Ver todas
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {metrics?.pendingAlerts === 0 ? (
            <p className="text-text-two py-4 text-center text-sm">
              Nenhum alerta pendente
            </p>
          ) : (
            <>
              <AlertNotification
                type="danger"
                title="Maria Silva não confirmou dose há 3 dias"
                description="Amoxicilina 500mg - Última confirmação: 15/01/2024"
                onContact={() => {}}
              />
              <AlertNotification
                type="warning"
                title="João Santos atrasou dose por 2 horas"
                description="Ibuprofeno 600mg - Horário previsto: 14:00"
                onContact={() => {}}
              />
              <AlertNotification
                type="info"
                title="Ana Costa perdeu dose de ontem"
                description="Paracetamol 750mg - Dose não confirmada: 17/01/2024"
                onContact={() => {}}
              />
            </>
          )}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="shadow-one flex flex-col gap-4 rounded-2xl bg-white p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-text-one text-lg font-semibold">
              Últimas Prescrições
            </h3>
            <Link
              href={appRoutes.prescriptions}
              className="text-primary text-sm font-medium hover:underline"
            >
              Ver todas
            </Link>
          </div>

          <div className="divide-border-one flex flex-col divide-y">
            {isLoadingPrescriptions ? (
              <p className="text-text-two py-4 text-center text-sm">
                Carregando...
              </p>
            ) : recentPrescriptions && recentPrescriptions.length > 0 ? (
              recentPrescriptions.map((prescription) => (
                <RecentPrescription
                  key={prescription.id}
                  patientName={prescription.patientName}
                  medication={prescription.medication}
                  timeAgo={formatTimeAgo(prescription.createdAt)}
                  status={prescription.status}
                />
              ))
            ) : (
              <p className="text-text-two py-4 text-center text-sm">
                Nenhuma prescrição encontrada
              </p>
            )}
          </div>
        </section>

        <QuickActions />
      </div>
    </div>
  )
}
