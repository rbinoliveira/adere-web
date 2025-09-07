import axios, { AxiosError } from 'axios'
import { getCookie, setCookie } from 'cookies-next'

import { envVars } from '@/application/_shared/config/env/env.mjs'
import { appCookies } from '@/application/_shared/constants/app-cookies.constant'
import { serverRoutes } from '@/application/_shared/constants/server-routes.constant'
import { deleteAuthCookies } from '@/application/_shared/helpers/delete-auth-cookies.helper'

type AxiosErrorModel = AxiosError & {
  response: { status: number; data: { message: string } }
}

let isRefreshing = false
let failedRequestQueue: {
  onSuccess: (token: string) => void
  onFailure: (err: AxiosErrorModel) => void
}[] = []

export function setupAPIClient() {
  const accessToken = getCookie(appCookies.ACCESS_TOKEN)

  const axiosApi = axios.create({
    baseURL: envVars.NEXT_PUBLIC_BACKEND_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  axiosApi.interceptors.response.use(
    (response) => {
      return response
    },
    async (error: AxiosErrorModel) => {
      if (error?.response?.status === 401) {
        const refreshToken = getCookie(appCookies.REFRESH_TOKEN)
        const originalConfig = error.config
        if (!isRefreshing) {
          isRefreshing = true
          axiosApi
            .post(`${serverRoutes.auth}/refresh`, {
              token: refreshToken,
            })
            .then((response) => {
              const { accessToken, refreshToken: refreshTokenByResponse } =
                response.data
              setCookie(appCookies.ACCESS_TOKEN, accessToken)
              setCookie(appCookies.REFRESH_TOKEN, refreshTokenByResponse)
              axiosApi.defaults.headers.Authorization = `Bearer ${accessToken}`
              failedRequestQueue.forEach((request) =>
                request.onSuccess(accessToken),
              )
              failedRequestQueue = []
            })
            .catch(async (err) => {
              failedRequestQueue.forEach((request) => request.onFailure(err))
              failedRequestQueue = []
              deleteAuthCookies()
            })
            .finally(() => {
              isRefreshing = false
            })
        }
        return await new Promise((resolve, reject) => {
          failedRequestQueue.push({
            onSuccess: (token: string) => {
              if (originalConfig) {
                originalConfig.headers.Authorization = `Bearer ${token}`
                resolve(axiosApi(originalConfig))
              }
            },
            onFailure: (err: AxiosErrorModel) => {
              reject(err)
            },
          })
        })
      }
      return await Promise.reject(error)
    },
  )
  return axiosApi
}

export const api = setupAPIClient()
