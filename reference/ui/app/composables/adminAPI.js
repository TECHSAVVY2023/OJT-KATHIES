// composables/useAdminApi.js
export const useAdminApi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase

  const request = async (url, options = {}) => {
    const access = process.client ? localStorage.getItem("admin_access") : null
    const isFormData = options.isMultipart || options.body instanceof FormData

    const headers = {
      ...(access ? { Authorization: `Bearer ${access}` } : {}),
      ...(!isFormData ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    }

    const res = await fetch(`${baseURL}${url}`, {
      ...options,
      headers,
      body: isFormData
        ? options.body
        : options.body
          ? JSON.stringify(options.body)
          : undefined,
    })

    // Handle expired or invalid tokens
    if (res.status === 401) {
      console.warn("Session expired. Redirecting to login...")
      if (process.client) {
        localStorage.removeItem("admin_access")
        localStorage.removeItem("admin_refresh")
        window.location.href = "/admin/login"
      }
      throw new Error("Unauthorized")
    }

    // Unified error handling
    if (!res.ok) {
      let errorMessage = `[${options.method || "GET"}] "${url}": ${res.status}`
      try {
        const data = await res.json()
        console.error("API Error:", data)
        errorMessage += " " + JSON.stringify(data)
      } catch {
        const text = await res.text()
        console.error("API Error:", text)
        errorMessage += " " + text
      }
      throw new Error(errorMessage)
    }

    // Safe JSON parsing
    try {
      return await res.json()
    } catch {
      return null
    }
  }

  return {
    get: (url) => request(url),
    post: (url, body, isMultipart = false) =>
      request(url, { method: "POST", body, isMultipart }),
    patch: (url, body, isMultipart = false) =>
      request(url, { method: "PATCH", body, isMultipart }),
    put: (url, body, isMultipart = false) =>
      request(url, { method: "PUT", body, isMultipart }),
    del: (url) => request(url, { method: "DELETE" }),
  }
}
