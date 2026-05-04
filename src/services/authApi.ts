const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

export type AuthUser = {
  id: string
  email: string
  username: string
  role: 'USER' | 'ADMIN'
  balance: number
  createdAt?: string
}

export type AuthSession = {
  access_token: string
  user: AuthUser
}

type AuthErrorBody = {
  message?: string | string[]
  errors?: Array<string | { message?: string }>
}

async function parseAuthError(response: Response) {
  let body: AuthErrorBody | undefined

  try {
    body = await response.json()
  } catch {
    return 'Khong the xu ly phan hoi tu may chu.'
  }

  if (Array.isArray(body?.message)) {
    return body.message.join(' ')
  }

  if (typeof body?.message === 'string') {
    return body.message
  }

  if (Array.isArray(body?.errors) && body.errors.length > 0) {
    return body.errors
      .map((error) => (typeof error === 'string' ? error : error.message))
      .filter(Boolean)
      .join(' ')
  }

  return `Yeu cau that bai (${response.status}).`
}

export async function apiRequest<T>(path: string, options: RequestInit = {}, token?: string) {
  let response: Response

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    })
  } catch {
    throw new Error('Khong ket noi duoc API. Kiem tra server tai http://localhost:3000 hoac VITE_API_BASE_URL.')
  }

  if (!response.ok) {
    throw new Error(await parseAuthError(response))
  }

  return response.json() as Promise<T>
}

async function postAuth(path: '/auth/login' | '/auth/register', body: Record<string, string>) {
  return apiRequest<AuthSession>(path, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export async function loginWithPassword(payload: { email: string; password: string }) {
  return postAuth('/auth/login', payload)
}

export async function registerWithPassword(payload: { email: string; password: string; username: string }) {
  return postAuth('/auth/register', payload)
}

export function persistAuthSession(session: AuthSession, remember: boolean) {
  const storage = remember ? window.localStorage : window.sessionStorage
  const fallbackStorage = remember ? window.sessionStorage : window.localStorage
  const expiresAt = remember ? Date.now() + 30 * 24 * 60 * 60 * 1000 : null

  fallbackStorage.removeItem('packopener.auth')
  storage.setItem('packopener.auth', JSON.stringify({ ...session, expiresAt }))
}

export function readPersistedAuthSession(): AuthSession | null {
  const raw = window.localStorage.getItem('packopener.auth') ?? window.sessionStorage.getItem('packopener.auth')

  if (!raw) return null

  try {
    const session = JSON.parse(raw) as AuthSession & { expiresAt?: number | null }

    if (session.expiresAt && session.expiresAt < Date.now()) {
      window.localStorage.removeItem('packopener.auth')
      window.sessionStorage.removeItem('packopener.auth')
      return null
    }

    return session
  } catch {
    return null
  }
}

export async function fetchCurrentUser(token: string) {
  return apiRequest<AuthUser>('/me', {}, token)
}
