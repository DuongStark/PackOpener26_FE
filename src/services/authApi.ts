const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'

type AuthUser = {
  id: string
  email: string
  username: string
  role: 'USER' | 'ADMIN'
  balance: number
}

export type AuthSession = {
  access_token: string
  user: AuthUser
}

type AuthErrorBody = {
  message?: string | string[]
  errors?: Array<string | { message?: string }>
}

type LoginResponse = {
  access_token: string
  tokenType?: string
  expiresIn?: string
}

type RegisterResponse = AuthUser

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  const parts = token.split('.')
  if (parts.length < 2) return null

  try {
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=')
    const json = window.atob(padded)
    return JSON.parse(json) as Record<string, unknown>
  } catch {
    return null
  }
}

function asAuthSession(login: LoginResponse, fallbackUser?: RegisterResponse): AuthSession {
  const payload = decodeJwtPayload(login.access_token)
  const user: AuthUser = {
    id:
      (typeof payload?.sub === 'string' ? payload.sub : undefined) ??
      fallbackUser?.id ??
      '',
    email:
      (typeof payload?.email === 'string' ? payload.email : undefined) ??
      fallbackUser?.email ??
      '',
    username:
      (typeof payload?.username === 'string' ? payload.username : undefined) ??
      fallbackUser?.username ??
      'user',
    role:
      payload?.role === 'ADMIN' || payload?.role === 'USER'
        ? payload.role
        : (fallbackUser?.role ?? 'USER'),
    balance: fallbackUser?.balance ?? 0,
  }

  return {
    access_token: login.access_token,
    user,
  }
}

async function parseAuthError(response: Response) {
  let body: AuthErrorBody | undefined

  try {
    body = await response.json()
  } catch {
    return 'Không thể xử lý phản hồi từ máy chủ.'
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

  return `Yêu cầu thất bại (${response.status}).`
}

async function postAuth<T>(path: '/auth/login' | '/auth/register', body: Record<string, string>) {
  let response: Response

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
  } catch {
    throw new Error('Không kết nối được API. Kiểm tra server tại http://localhost:3000 hoặc VITE_API_BASE_URL.')
  }

  if (!response.ok) {
    throw new Error(await parseAuthError(response))
  }

  return response.json() as Promise<T>
}

export async function loginWithPassword(payload: { email: string; password: string }) {
  const login = await postAuth<LoginResponse>('/auth/login', payload)
  return asAuthSession(login)
}

export async function registerWithPassword(payload: { email: string; password: string; username: string }) {
  const createdUser = await postAuth<RegisterResponse>('/auth/register', payload)
  const login = await postAuth<LoginResponse>('/auth/login', {
    email: payload.email,
    password: payload.password,
  })
  return asAuthSession(login, createdUser)
}

export function persistAuthSession(session: AuthSession, remember: boolean) {
  const storage = remember ? window.localStorage : window.sessionStorage
  const fallbackStorage = remember ? window.sessionStorage : window.localStorage
  const expiresAt = remember ? Date.now() + 30 * 24 * 60 * 60 * 1000 : null

  fallbackStorage.removeItem('packopener.auth')
  storage.setItem('packopener.auth', JSON.stringify({ ...session, expiresAt }))
}
