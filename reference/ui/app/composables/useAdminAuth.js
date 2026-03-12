export const getAdminSession = async () => {
  if (process.server) return null;

  const access = localStorage.getItem("admin_access");
  if (!access) return null;

  try {
    const { $api } = useNuxtApp();
    const me = await $api("/admin-api/me/", {
      headers: { Authorization: `Bearer ${access}` },
    });
    return me;
  } catch (error) {
    console.warn("Session invalid or expired:", error);
    localStorage.removeItem("admin_access");
    localStorage.removeItem("admin_refresh");
    return null;
  }
};

export const adminLogin = async (username, password) => {
  if (process.server) return null;

  try {
    const { $api } = useNuxtApp();
    const res = await $api("/admin-api/login/", {
      method: "POST",
      body: { username, password },
    });

    // Store tokens securely in localStorage
    localStorage.setItem("admin_access", res.access);
    localStorage.setItem("admin_refresh", res.refresh);

    // Return the user info for further use
    return res.user;
  } catch (error) {
    console.error("Admin login failed:", error);
    throw error;
  }
};

export const adminLogout = async () => {
  if (process.server) return;

  try {
    const { $api } = useNuxtApp();
    await $api("/admin-api/logout/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("admin_access")}`,
      },
    });
  } catch (error) {
    console.warn("Logout error (ignored):", error);
  } finally {
    // Always clear tokens
    localStorage.removeItem("admin_access");
    localStorage.removeItem("admin_refresh");
  }
};
