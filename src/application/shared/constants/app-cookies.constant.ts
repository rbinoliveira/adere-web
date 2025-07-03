import { envVars } from '@/infra/config/env'

export const appCookies = {
  REFRESH_TOKEN: `${envVars.NEXT_PUBLIC_BACKEND_NAME}_refresh_token`,
  ACCESS_TOKEN: `${envVars.NEXT_PUBLIC_BACKEND_NAME}_access_token`,
}
