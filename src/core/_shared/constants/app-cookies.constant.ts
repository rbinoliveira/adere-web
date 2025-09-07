import { envVars } from '@/core/_shared/config/env/env.mjs'

export const appCookies = {
  REFRESH_TOKEN: `${envVars.NEXT_PUBLIC_BACKEND_NAME}_refresh_token`,
  ACCESS_TOKEN: `${envVars.NEXT_PUBLIC_BACKEND_NAME}_access_token`,
}
