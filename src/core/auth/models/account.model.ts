export enum AccountRole {
  ADMIN = 'ADMIN',
  PATIENT = 'PATIENT',
  DENTIST = 'DENTIST',
}

export type AccountRoleType = keyof typeof AccountRole

export type AccountModel = {
  id: string
  name: string
  email: string | null
  phone: string | null
  dob: Date | null
  role: AccountRoleType
}
