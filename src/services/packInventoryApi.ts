import { apiRequest, fetchCurrentUser, readPersistedAuthSession, type AuthUser } from './authApi'

export type ApiPack = {
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

export type ApiUserPack = {
  id: string
  packId: string
  userId: string
  status: 'PENDING' | 'OPENED'
  openedAt?: string | null
  createdAt?: string
  purchasedAt?: string
  pack?: ApiPack
}

export type ApiOpenedCard = {
  cardId: string
  name: string
  rarity: string
  overall: number
  pace?: number
  shooting?: number
  passing?: number
  dribbling?: number
  defending?: number
  physical?: number
  position: string
  club?: string
  nation?: string
  imageUrl?: string
  clubImageUrl?: string
  nationImageUrl?: string
  sellPrice?: number
}

export type ApiOpenPackResponse = {
  userPackId: string
  openedAt: string
  cards: ApiOpenedCard[]
  newBalance?: number
}

export type ApiSellCardResponse = {
  success: boolean
  soldQuantity: number
  totalEarned: number
  newBalance: number
}

type Paginated<T> = {
  data: T[]
  total: number
  page: number
  limit: number
}

export type PackInventoryApiData = {
  user: AuthUser
  packs: ApiUserPack[]
  total: number
}

export function getPackInventoryToken() {
  return readPersistedAuthSession()?.access_token ?? null
}

export async function fetchPackInventory(page = 1, limit = 100): Promise<PackInventoryApiData | null> {
  const session = readPersistedAuthSession()
  if (!session) return null

  try {
    const [user, packs] = await Promise.all([
      fetchCurrentUser(session.access_token),
      apiRequest<Paginated<ApiUserPack>>(`/user-packs?page=${page}&limit=${limit}`, {}, session.access_token),
    ])

    return {
      user,
      packs: packs.data,
      total: packs.total,
    }
  } catch {
    return null
  }
}

export async function openUserPack(userPackId: string) {
  const token = getPackInventoryToken()
  if (!token) throw new Error('Missing auth token')

  return apiRequest<ApiOpenPackResponse>(`/user-packs/${userPackId}/open`, {
    method: 'POST',
  }, token)
}

export async function sellInventoryCard(cardId: string, quantity = 1) {
  const token = getPackInventoryToken()
  if (!token) throw new Error('Missing auth token')

  return apiRequest<ApiSellCardResponse>('/inventory/sell', {
    method: 'POST',
    body: JSON.stringify({ cardId, quantity }),
  }, token)
}
