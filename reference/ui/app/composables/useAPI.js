import { getApiUrl } from '~/utils/api'

export function useApi(endpoint) {
  const apiUrl = getApiUrl(endpoint)
  const { data, error, pending, refresh } = useFetch(apiUrl)
  return { data, error, pending, refresh }
}
