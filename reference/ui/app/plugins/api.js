export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();
  
    // Create a reusable fetch wrapper with base URL + token handling
    const api = $fetch.create({
      baseURL: config.public.apiBase,
      onRequest({ options }) {
        const access = localStorage.getItem("admin_access");
        if (access) {
          options.headers = options.headers || {};
          options.headers.Authorization = `Bearer ${access}`;
        }
      },
      onResponseError({ response }) {
        if (response.status === 401) {
          console.warn("Session expired. Redirecting to login...");
          localStorage.removeItem("admin_access");
          navigateTo("/admin/login");
        }
      },
    });
  
    return {
      provide: { api },
    };
  });
  