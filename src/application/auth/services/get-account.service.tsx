import { useQuery } from '@tanstack/react-query'

import {
  getAccountUseCase,
  GetAccountUseCaseOutput,
} from '@/application/auth/use-cases/get-account.use-case'

export const getAccountQueryKey = 'getAccountQueryKey'

export function GetAccountService() {
  const query = useQuery<GetAccountUseCaseOutput>({
    queryKey: [getAccountQueryKey],
    queryFn: async () => getAccountUseCase(),
  })
  return query
}
