import { apiRequest, fetchCurrentUser, readPersistedAuthSession, type AuthUser } from './authApi'

export type ApiPack = {
  id: string
  name: string
  price: number
  description?: string
  imageUrl?: string
}

export type ApiUserPack = {
  id: string
  status: 'PENDING' | 'OPENED'
  pack?: ApiPack
}

export type ApiInventoryCard = {
  id: string
  cardId: string
  quantity: number
  status: string
  card: {
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
  }
}

export type ApiInventorySummary = {
  totalCards: number
  totalValue: number
  byRarity: Record<string, number>
}

export type ApiTransaction = {
  id: string
  type: string
  amount: number
  description: string
  createdAt: string
}

type Paginated<T> = {
  data: T[]
  total: number
  page: number
  limit: number
}

export type HomeApiData = {
  user: AuthUser
  pendingPacks: ApiUserPack[]
  inventorySummary: ApiInventorySummary | null
  topCards: ApiInventoryCard[]
  transactions: ApiTransaction[]
  packs: ApiPack[]
}

async function optionalRequest<T>(path: string, token?: string) {
  try {
    return await apiRequest<T>(path, {}, token)
  } catch {
    return null
  }
}

export async function fetchHomeData(): Promise<HomeApiData | null> {
  const session = readPersistedAuthSession()
  if (!session) return null

  try {
    const [user, pendingPacks, inventorySummary, topCards, transactions, packs] = await Promise.all([
      fetchCurrentUser(session.access_token),
      optionalRequest<Paginated<ApiUserPack>>('/user-packs?page=1&limit=6&status=PENDING', session.access_token),
      optionalRequest<ApiInventorySummary>('/inventory/summary', session.access_token),
      optionalRequest<Paginated<ApiInventoryCard>>('/inventory?page=1&limit=3&sortBy=overall&sortOrder=desc', session.access_token),
      optionalRequest<Paginated<ApiTransaction>>('/transactions?page=1&limit=3', session.access_token),
      optionalRequest<Paginated<ApiPack>>('/packs?page=1&limit=3'),
    ])

    return {
      user,
      pendingPacks: pendingPacks?.data ?? [],
      inventorySummary,
      topCards: topCards?.data ?? [],
      transactions: transactions?.data ?? [],
      packs: packs?.data ?? [],
    }
  } catch {
    return null
  }
}
