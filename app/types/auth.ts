export type UserRole = 'admin' | 'customer'

export interface User {
  id: string
  email: string
  password: string
  name: string
  role: UserRole
}

export interface AuthState {
  user: User | null
}
