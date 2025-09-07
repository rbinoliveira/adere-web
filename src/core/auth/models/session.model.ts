export type SessionModel = {
  account: {
    id: string
    email: string
    name: string
    status: string
  }
  accessToken: string
  refreshToken: string
}
