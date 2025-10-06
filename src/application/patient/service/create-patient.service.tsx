// import { useMutation } from '@tanstack/react-query'

// import { listPlansQueryKey } from '@/application/plan/services/list-plans.service'
// import { toast } from '@/application/shared/components/toast/hooks'
// import { handleError } from '@/application/shared/helpers'
// import { ServiceInput } from '@/application/shared/types'
// import {
//   createPlanUseCase,
//   CreatePlanUseCaseInput,
// } from '@/domain/plan/use-cases/create-plan.use-case'
// import { queryClient } from '@/infra/shared/libs'

// export function CreatePlanService({ onSuccess }: ServiceInput) {
//   const mutation = useMutation({
//     mutationFn: (data: CreatePlanUseCaseInput) => createPlanUseCase(data),
//     onSuccess: () => {
//       if (onSuccess) {
//         onSuccess()
//       }
//       queryClient.invalidateQueries({
//         predicate: (query) => query.queryKey[0] === listPlansQueryKey,
//       })
//       toast({ variant: 'success', description: 'Plan created successfully!' })
//     },
//     onError: (error) => {
//       handleError(error)
//     },
//   })
//   return mutation
// }
