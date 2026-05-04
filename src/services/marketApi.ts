import { apiRequest, readPersistedAuthSession } from './authApi'

export type ApiMarketPack = {
  id: string
  name: string
  price: number
  description?: string
  imageUrl?: string
  cardCount?: number
  tierCode?: string
  subtitle?: string
  oddsTeaser?: string
}

export type ApiBuyPackResponse = {
  userPackId: string
  packName: string
  price: number
  newBalance: number
  status: 'PENDING' | 'OPENED'
}

type Paginated<T> = {
  data: T[]
  total: number
  page: number
  limit: number
}

export async function fetchMarketPacks(page = 1, limit = 100) {
  try {
    const result = await apiRequest<Paginated<ApiMarketPack>>(`/packs?page=${page}&limit=${limit}`)
    return result.data
  } catch {
    return []
  }
}

export async function buyPack(packId: string) {
  const token = readPersistedAuthSession()?.access_token
  if (!token) throw new Error('Missing auth token')

  return apiRequest<ApiBuyPackResponse>(`/packs/${packId}/buy`, {
    method: 'POST',
  }, token)
}
