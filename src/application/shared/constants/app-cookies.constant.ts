import { envVars } from '@/infra/config/env'

export const appCookies = {
  REFRESH_TOKEN: `${envVars.NEXT_PUBLIC_API_NAME}_refresh_token`,
  ACCESS_TOKEN: `${envVars.NEXT_PUBLIC_API_NAME}_access_token`,
}
