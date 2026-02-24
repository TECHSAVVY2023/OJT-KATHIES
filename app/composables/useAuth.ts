import type { User } from '~/types/auth'
import usersJson from '~/data/users.json'

const AUTH_KEY = 'kathies-auth-user'
const usersList = Array.isArray(usersJson) ? (usersJson as User[]) : []

export function useAuth() {
  const user = useState<User | null>('auth-user', () => null)

  function getUsers(): User[] {
    return usersList
  }

  function loadStoredUser() {
    if (import.meta.client && typeof localStorage !== 'undefined') {
      const raw = localStorage.getItem(AUTH_KEY)
      if (raw) {
        try {
          const u = JSON.parse(raw) as User
          user.value = u
        } catch {
          user.value = null
        }
      }
    }
  }

  function login(email: string, password: string): { success: boolean; error?: string } {
    const users = getUsers()
    if (!Array.isArray(users)) {
      return { success: false, error: 'Invalid users data' }
    }
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    if (!found) {
      return { success: false, error: 'Invalid email or password' }
    }
    const { password: _p, ...rest } = found
    const safeUser = { ...found }
    user.value = safeUser
    if (import.meta.client && typeof localStorage !== 'undefined') {
      localStorage.setItem(AUTH_KEY, JSON.stringify(safeUser))
    }
    return { success: true }
  }

  function logout() {
    user.value = null
    if (import.meta.client && typeof localStorage !== 'undefined') {
      localStorage.removeItem(AUTH_KEY)
    }
  }

  const isAdmin = computed(() => user.value?.role === 'admin')

  if (import.meta.client) {
    loadStoredUser()
  }

  return { user, login, logout, isAdmin, getUsers, loadStoredUser }
}
