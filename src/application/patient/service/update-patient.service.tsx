// import { useMutation } from '@tanstack/react-query'

// import { listPlansQueryKey } from '@/application/plan/services/list-plans.service'
// import { toast } from '@/application/shared/components/toast/hooks'
// import { handleError } from '@/application/shared/helpers'
// import { ServiceInput } from '@/application/shared/types'
// import {
//   updatePlanUseCase,
//   UpdatePlanUseCaseInput,
// } from '@/domain/plan/use-cases/update-plan.use-case'
// import { queryClient } from '@/infra/shared/libs'

// export function UpdatePlanService({ onSuccess }: ServiceInput) {
//   const mutation = useMutation({
//     mutationFn: (data: UpdatePlanUseCaseInput) => updatePlanUseCase(data),
//     onSuccess: async () => {
//       if (onSuccess) {
//         onSuccess()
//       }
//       queryClient.invalidateQueries({
//         predicate: (query) => query.queryKey[0] === listPlansQueryKey,
//       })
//       toast({ variant: 'success', description: 'Plan updated successfully!' })
//     },
//     onError: (error) => {
//       handleError(error)
//     },
//   })
//   return mutation
// }
