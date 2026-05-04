import { apiRequest, fetchCurrentUser, readPersistedAuthSession, type AuthUser } from './authApi'

export type ApiInventoryCard = {
  id: string
  cardId: string
  userId?: string
  quantity: number
  status: 'IN_INVENTORY' | 'LISTED' | 'SOLD' | 'BURNED' | string
  name?: string
  rarity?: string
  overall?: number
  position?: string
  imageUrl?: string
  pace?: number
  shooting?: number
  passing?: number
  dribbling?: number
  defending?: number
  physical?: number
  club?: string
  nation?: string
  clubImageUrl?: string
  nationImageUrl?: string
  sellPrice?: number
  card?: {
    id: string
    name: string
    rarity: string
    overall: number
    position: string
    imageUrl?: string
    pace?: number
    shooting?: number
    passing?: number
    dribbling?: number
    defending?: number
    physical?: number
    club?: string
    nation?: string
    clubImageUrl?: string
    nationImageUrl?: string
    sellPrice?: number
  }
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

export type CardInventoryApiData = {
  user: AuthUser
  cards: ApiInventoryCard[]
  total: number
}

function getToken() {
  return readPersistedAuthSession()?.access_token ?? null
}

export async function fetchCardInventory(page = 1, limit = 100): Promise<CardInventoryApiData | null> {
  const token = getToken()
  if (!token) return null

  try {
    const [user, cards] = await Promise.all([
      fetchCurrentUser(token),
      apiRequest<Paginated<ApiInventoryCard>>(`/inventory?page=${page}&limit=${limit}&sortBy=overall&sortOrder=desc`, {}, token),
    ])

    return {
      user,
      cards: cards.data,
      total: cards.total,
    }
  } catch {
    return null
  }
}

export async function fetchInventoryCard(id: string) {
  const token = getToken()
  if (!token) throw new Error('Missing auth token')

  return apiRequest<ApiInventoryCard>(`/inventory/${id}`, {}, token)
}

export async function sellInventoryCard(cardId: string, quantity = 1) {
  const token = getToken()
  if (!token) throw new Error('Missing auth token')

  return apiRequest<ApiSellCardResponse>('/inventory/sell', {
    method: 'POST',
    body: JSON.stringify({ cardId, quantity }),
  }, token)
}
