// api.js
export const useApiBase = () => {
  const config = useRuntimeConfig();
  return config.public.apiBase.replace(/\/+$/, "");
};

export const BASE_ASSETS_URL =
  "https://fpstorage.sgp1.cdn.digitaloceanspaces.com/www.kathieskitchen.com";

export const getApiUrl = (endpoint) => {
  const BASE = useApiBase();
  const clean = endpoint.replace(/^\/+/, "");
  const [path, query] = clean.split("?", 2);
  const normalizedPath = path.endsWith("/") ? path : `${path}/`;
  return query ? `${BASE}/${normalizedPath}?${query}` : `${BASE}/${normalizedPath}`;
};

export const fetchFromApi = async (endpoint, opts = {}) => {
  const url = getApiUrl(endpoint);
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(opts.headers || {}),
    },
    ...opts,
  });
  if (!res.ok) throw new Error(`Fetch failed ${res.status} ${res.statusText} @ ${url}`);
  return res.json();
};

export const buildUrl = (path, query = {}) => {
  const BASE = useApiBase();
  const clean = String(path).replace(/^\/+|\/+$/g, "");
  const baseUrl = `${BASE}/${clean}/`;
  const qs = new URLSearchParams(query).toString();
  return qs ? `${baseUrl}?${qs}` : baseUrl;
};
