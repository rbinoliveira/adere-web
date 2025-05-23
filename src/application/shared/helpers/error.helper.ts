import { AxiosError } from 'axios'
import { toast } from 'sonner'

export function handleError(err: any) {
  if (
    err instanceof AxiosError &&
    err.response?.data?.message &&
    err.response?.status !== 500
  ) {
    toast('Error', {
      description: err.response.data.message,
    })
  } else {
    toast('Error', {
      description: 'An unexpected error occurred',
    })
  }
}
