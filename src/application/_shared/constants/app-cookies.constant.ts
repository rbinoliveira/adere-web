import { envVars } from '@/application/_shared/config/env/env.mjs'

export const appCookies = {
  REFRESH_TOKEN: `${envVars.NEXT_PUBLIC_BACKEND_NAME}_refresh_token`,
  ACCESS_TOKEN: `${envVars.NEXT_PUBLIC_BACKEND_NAME}_access_token`,
  USER_ID: `${envVars.NEXT_PUBLIC_APP_NAME}_user_id`,
}
