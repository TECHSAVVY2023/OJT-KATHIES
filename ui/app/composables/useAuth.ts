import { computed } from 'vue'
import type { User } from '~/types/auth'

const AUTH_KEY = 'kathies-auth-user'

export function useAuth() {
  const user = useState<User | null>('auth-user', () => null)
  const config = useRuntimeConfig()

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

  // Helper: split full name into first/last
  function splitName(fullName: string) {
    const parts = fullName.trim().split(' ').filter(Boolean)
    return {
      fname: parts[0] ?? '',
      lname: parts.slice(1).join(' ') ?? '',
    }
  }

  async function login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { data, error } = await useFetch(`${config.public.apiBase}/auth/login/`, {
        method: 'POST',
        body: { email, password },
      })

      if (error.value) {
        return { success: false, error: error.value?.message || 'Login failed' }
      }

      const userData = (data.value as any)?.user
      if (!userData) {
        return { success: false, error: 'Unexpected response from server' }
      }

      user.value = userData
      if (import.meta.client && typeof localStorage !== 'undefined') {
        localStorage.setItem(AUTH_KEY, JSON.stringify(userData))
      }

      return { success: true }
    } catch (err) {
      console.error('Login error', err)
      return { success: false, error: 'Unable to reach server. Please try again.' }
    }
  }

  async function signup(
    fullName: string,
    phone: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const { fname, lname } = splitName(fullName)
      const { data, error } = await useFetch(`${config.public.apiBase}/users/`, {
        method: 'POST',
        body: { fname, lname, phone, email, password },
      })

      if (error.value) {
        const serverData = data.value as any
        let errorMessage = error.value?.message || 'Signup failed'

        if (serverData) {
          if (typeof serverData === 'object') {
            // flatten field errors like { email: ['...'] }
            const values = Object.values(serverData).flat()
            if (values.length) errorMessage = values.join(' ')
          } else if (typeof serverData === 'string') {
            errorMessage = serverData
          }
        }

        return { success: false, error: errorMessage }
      }

      const userData = (data.value as any)
      if (!userData) {
        return { success: false, error: 'Unexpected response from server' }
      }

      // Optionally log in immediately
      user.value = userData
      if (import.meta.client && typeof localStorage !== 'undefined') {
        localStorage.setItem(AUTH_KEY, JSON.stringify(userData))
      }

      return { success: true }
    } catch (err) {
      console.error('Signup error', err)
      return { success: false, error: 'Unable to reach server. Please try again.' }
    }
  }

  async function logout(): Promise<void> {
    try {
      await useFetch(`${config.public.apiBase}/auth/logout/`, {
        method: 'POST',
      })
    } catch (error) {
      console.warn('Logout API call failed, but proceeding with local cleanup:', error)
    }
    user.value = null
    if (import.meta.client && typeof localStorage !== 'undefined') {
      localStorage.removeItem(AUTH_KEY)
    }
  }

  const isAdmin = computed(() => user.value?.role === 'admin')

  if (import.meta.client) {
    loadStoredUser()
  }

  return { user, login, signup, logout, isAdmin, loadStoredUser }
}
