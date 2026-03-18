export type UserRole = 'admin' | 'customer'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  fname?: string
  lname?: string
  // Add additional fields returned by the backend as needed
}

export interface AuthState {
  user: User | null
}
