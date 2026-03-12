import { getAdminSession } from '~/composables/useAdminAuth'
import { useRouter } from 'vue-router'

export const useAdminGuard = () => {
  const router = useRouter()
  const admin = ref(null)

  const verifyAdmin = async () => {
    try {
      admin.value = await getAdminSession()
      if (!admin.value) {
        router.push('/admin/login')
      }
    } catch (err) {
      console.error('Admin check failed:', err)
      router.push('/admin/login')
    }
  }

  onMounted(verifyAdmin)

  return { admin }
}
