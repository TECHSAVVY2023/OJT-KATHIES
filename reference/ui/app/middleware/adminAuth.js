// /middleware/adminAuth.js
import { getAdminSession } from "~/composables/useAdminAuth";

export default defineNuxtRouteMiddleware(async (to) => {
  // Skip on SSR and for login route
  if (process.server || to.path === "/admin/login") return;

  try {
    const session = await getAdminSession();

    if (!session) {
      console.warn("No admin session — redirecting to /admin/login");
      return navigateTo("/admin/login", { replace: true });
    }
  } catch (err) {
    console.error("Session check failed:", err);
    return navigateTo("/admin/login", { replace: true });
  }
});
