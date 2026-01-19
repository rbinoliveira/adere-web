export type UserStatus = 'pending' | 'approved' | 'rejected'

export type UserModel = {
  id: string
  email: string
  name: string
  role: string
  photo?: string | null
  cro?: string | null
  phone?: string | null
  status?: UserStatus
}
