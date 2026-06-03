const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function buildApiUrl(component) {
  return `${apiBaseUrl}/${component}/`
}

export function normalizeCollectionResponse(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  if (Array.isArray(payload?.items)) {
    return payload.items
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  return []
}

export async function fetchCollection(component) {
  return fetchCollectionFromUrl(buildApiUrl(component))
}

export async function fetchCollectionFromUrl(apiUrl) {
  const response = await fetch(apiUrl)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return normalizeCollectionResponse(await response.json())
}
