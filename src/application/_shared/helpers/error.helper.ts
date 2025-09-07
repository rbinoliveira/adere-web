import { AxiosError } from 'axios'
import { toast } from 'sonner'

type ErrorType = {
  message?: string
  err?: any
}

export function handleError({ message, err }: ErrorType) {
  if (
    err &&
    err instanceof AxiosError &&
    err.response?.data?.message &&
    err.response?.status !== 500
  ) {
    toast('Error', {
      description: err.response.data.message,
    })
  } else {
    toast('Error', {
      description: message ?? 'Um erro inesperado ocorreu',
    })
  }
}
