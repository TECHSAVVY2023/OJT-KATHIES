export default defineNuxtRouteMiddleware((to) => {
  if (!to.path.startsWith('/admin')) return
  const { user, isAdmin, loadStoredUser } = useAuth()
  if (import.meta.client) loadStoredUser()
  if (!user.value || !isAdmin.value) {
    return navigateTo('/signin?redirect=' + encodeURIComponent(to.fullPath))
  }
})
