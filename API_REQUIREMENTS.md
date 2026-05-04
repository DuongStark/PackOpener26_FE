# Frontend API Usage & Backend Requirements

Tài liệu này mô tả toàn bộ màn hiện có trong FE, màn nào đang gọi API nào, phần nào vẫn đang mock/fallback, và backend cần thêm/sửa API gì để FE bỏ mock hoàn toàn.

Base URL FE đang dùng:

```env
VITE_API_BASE_URL=http://localhost:3000
```

Nếu không set `VITE_API_BASE_URL`, FE mặc định gọi:

```txt
http://localhost:3000
```

Auth token được lưu tại:

```txt
localStorage/sessionStorage key: packopener.auth
```

Header API private:

```http
Authorization: Bearer <access_token>
```

## 1. Tổng Quan Theo Màn

| Màn | Route | API thật đang dùng | Còn mock/fallback |
| --- | --- | --- | --- |
| Landing | `/` | Chưa dùng API | Toàn bộ landing content/card/packs là static/mock |
| Login | `/login` | `POST /auth/login` | Không mock auth |
| Register | `/register` | `POST /auth/register` | Không mock auth |
| Home | `/home` | `GET /me`, `GET /user-packs`, `GET /inventory/summary`, `GET /inventory`, `GET /transactions`, `GET /packs` | Fallback card stats, pack metadata, activity/packs/cards nếu API lỗi hoặc thiếu field |
| Pack Inventory | `/packs` | `GET /me`, `GET /user-packs`, `POST /user-packs/:id/open`, `POST /inventory/sell` | Fallback pack theme/cardCount/odds, open pack cards, sellPrice/card assets |
| Card Inventory | `/cards` | `GET /me`, `GET /inventory`, `GET /inventory/:id`, `POST /inventory/sell` | Fallback card stats, club/nation assets, sellPrice |
| Market | `/market` | `GET /packs`, `POST /packs/:id/buy` | Fallback pack theme/cardCount/tier/odds; open-now mode chưa thật |

## 2. Shared Auth & Session

### File FE

```txt
src/services/authApi.ts
```

### API đang dùng

#### `POST /auth/login`

Mục đích: đăng nhập user.

Request:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response FE đang expect:

```json
{
  "access_token": "jwt-token",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "username123",
    "role": "USER",
    "balance": 10000
  }
}
```

Trạng thái: đủ dùng.

#### `POST /auth/register`

Mục đích: tạo account mới và đăng nhập ngay.

Request:

```json
{
  "email": "user@example.com",
  "password": "password123",
  "username": "username123"
}
```

Response FE đang expect:

```json
{
  "access_token": "jwt-token",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "username123",
    "role": "USER",
    "balance": 10000
  }
}
```

Trạng thái: đủ dùng.

#### `GET /me`

Mục đích: sync user hiện tại và balance mới nhất.

Response FE đang expect:

```json
{
  "id": "uuid",
  "email": "user@example.com",
  "username": "username123",
  "role": "USER",
  "balance": 10000,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

Trạng thái: đủ dùng.

## 3. Landing Page

### Route

```txt
/
```

### File FE

```txt
src/pages/LandingPage.tsx
```

### API đang dùng

Chưa dùng API.

### Mock/static đang dùng

- Hero cards.
- Featured packs.
- Rarity showcase.
- FAQ.
- Social proof ticker.
- CTA/footer.

### Backend cần thêm/sửa

Chưa bắt buộc. Nếu muốn landing dynamic sau này, có thể thêm:

```http
GET /public/landing
```

Response đề xuất:

```json
{
  "featuredPacks": [
    {
      "id": "uuid",
      "name": "Ultimate Pack",
      "price": 7500,
      "description": "Highest tier prestige odds",
      "cardCount": 10,
      "imageUrl": "https://..."
    }
  ],
  "featuredCards": [
    {
      "id": "uuid",
      "name": "K. Mbappe",
      "rarity": "DIAMOND_RARE",
      "overall": 91,
      "position": "ST",
      "imageUrl": "https://..."
    }
  ],
  "stats": {
    "packTypes": 16,
    "totalCards": 18000,
    "starterCoins": 300
  }
}
```

Ưu tiên: thấp.

## 4. Login Page

### Route

```txt
/login
```

### File FE

```txt
src/pages/LoginPage.tsx
src/components/organisms/AuthOrganisms.tsx
src/services/authApi.ts
```

### API đang dùng

```http
POST /auth/login
```

### Flow hiện tại

1. User nhập email/password.
2. FE validate cơ bản.
3. Gọi `POST /auth/login`.
4. Lưu `{ access_token, user, expiresAt }`.
5. Redirect sang `/home`.

### Mock/fallback

Không mock auth. Nếu API lỗi, form hiển thị error message.

### Backend cần thêm/sửa

Không cần thêm cho login cơ bản.

Khuyến nghị chuẩn hóa error response:

```json
{
  "statusCode": 401,
  "message": "Email hoặc mật khẩu không đúng"
}
```

## 5. Register Page

### Route

```txt
/register
```

### File FE

```txt
src/pages/RegisterPage.tsx
src/components/organisms/AuthOrganisms.tsx
src/services/authApi.ts
```

### API đang dùng

```http
POST /auth/register
```

### Flow hiện tại

1. User nhập email/username/password/confirm password.
2. FE validate:
   - Email có `@`.
   - Username 6-20 ký tự, có chữ và số.
   - Password tối thiểu 6 ký tự.
   - Confirm password khớp.
3. Gọi `POST /auth/register`.
4. Lưu `{ access_token, user, expiresAt }`.
5. Redirect sang `/home`.

### Mock/fallback

Không mock auth.

### Backend cần thêm/sửa

Không cần thêm cho register cơ bản.

Khuyến nghị backend giữ validation giống FE:

```json
{
  "email": "valid email",
  "username": "6-20 chars, letters and numbers",
  "password": "min 6 chars"
}
```

## 6. Home Page

### Route

```txt
/home
```

### File FE

```txt
src/pages/HomePage.tsx
src/services/homeApi.ts
src/services/authApi.ts
```

### API đang dùng

#### `GET /me`

Mục đích:

- Lấy username.
- Lấy balance.

#### `GET /user-packs?page=1&limit=6&status=PENDING`

Mục đích:

- Đếm pack đang chờ mở.
- Hiển thị pending packs ở Home.

Response FE đang dùng:

```json
{
  "data": [
    {
      "id": "uuid",
      "status": "PENDING",
      "pack": {
        "id": "uuid",
        "name": "Starter Pack",
        "price": 300,
        "description": "Entry chance for Silver+"
      }
    }
  ],
  "total": 2,
  "page": 1,
  "limit": 6
}
```

#### `GET /inventory/summary`

Mục đích:

- Lấy tổng số card.
- Đếm card hiếm: FE đang tính từ `byRarity`, cộng `DIAMOND_*` và `GOLD_EPIC`.

Response FE đang dùng:

```json
{
  "totalCards": 100,
  "totalValue": 50000,
  "byRarity": {
    "DIAMOND_RARE": 2,
    "DIAMOND_COMMON": 3,
    "GOLD_EPIC": 5
  }
}
```

#### `GET /inventory?page=1&limit=3&sortBy=overall&sortOrder=desc`

Mục đích:

- Lấy top 3 card mạnh nhất cho khu `Top Pulls`.

#### `GET /transactions?page=1&limit=3`

Mục đích:

- Hiển thị hoạt động gần đây.

#### `GET /packs?page=1&limit=3`

Mục đích:

- Hiển thị featured packs ở Home.

### Mock/fallback đang dùng

Nếu API lỗi hoặc không có token:

- Username fallback: `HLV`.
- Balance fallback: `300`.
- Pending packs fallback từ `PACK_THEMES`.
- Featured packs fallback từ `PACK_THEMES`.
- Top pulls fallback từ hardcoded players.
- Activity fallback từ hardcoded activity list.

Nếu API có data nhưng thiếu field:

- Card thiếu stats: fallback stats mock.
- Card thiếu `clubImageUrl`, `nationImageUrl`: fallback ảnh mock.
- Pack thiếu `cardCount`, `tierCode`, `subtitle`, `oddsTeaser`: fallback từ `PACK_THEMES`.

### Backend cần thêm/sửa cho Home

#### 6.1. Bổ sung field card trong `GET /inventory`

Hiện response cơ bản trong `API.md` chưa đủ để render card frame.

Cần response:

```json
{
  "id": "uuid-inventory-item",
  "cardId": "uuid-card",
  "quantity": 1,
  "status": "IN_INVENTORY",
  "card": {
    "id": "uuid-card",
    "name": "K. Mbappe",
    "rarity": "DIAMOND_RARE",
    "overall": 91,
    "position": "ST",
    "pace": 97,
    "shooting": 90,
    "passing": 81,
    "dribbling": 92,
    "defending": 37,
    "physical": 76,
    "club": "RMA",
    "nation": "France",
    "imageUrl": "https://...",
    "clubImageUrl": "https://...",
    "nationImageUrl": "https://...",
    "sellPrice": 2500
  }
}
```

#### 6.2. Bổ sung field pack trong `GET /packs`

Cần response:

```json
{
  "id": "uuid-pack",
  "name": "Premium Gold",
  "price": 1900,
  "description": "More cards, rich Gold odds",
  "imageUrl": "https://...",
  "cardCount": 7,
  "tierCode": "PG-08",
  "subtitle": "Value Series",
  "oddsTeaser": "More cards, rich Gold odds",
  "rarityFocus": ["GOLD_RARE", "GOLD_EPIC"]
}
```

#### 6.3. Khuyến nghị thêm API gộp cho Home

Đề xuất:

```http
GET /home/dashboard?topCardsLimit=3&recentLimit=3&featuredPacksLimit=3
```

Mục đích:

- Giảm 5 request Home xuống 1 request.
- Tránh lệch dữ liệu giữa balance, inventory, transactions.

Response đề xuất:

```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "username123",
    "role": "USER",
    "balance": 10000
  },
  "pendingPacks": [
    {
      "id": "uuid-user-pack",
      "status": "PENDING",
      "pack": {
        "id": "uuid-pack",
        "name": "Starter Pack",
        "price": 300,
        "cardCount": 5,
        "description": "Entry chance for Silver+"
      }
    }
  ],
  "inventorySummary": {
    "totalCards": 100,
    "totalValue": 50000,
    "byRarity": {
      "DIAMOND_RARE": 2,
      "GOLD_EPIC": 5
    }
  },
  "topCards": [
    {
      "id": "uuid-inventory-item",
      "quantity": 1,
      "card": {
        "id": "uuid-card",
        "name": "K. Mbappe",
        "rarity": "DIAMOND_RARE",
        "overall": 91,
        "position": "ST",
        "pace": 97,
        "shooting": 90,
        "passing": 81,
        "dribbling": 92,
        "defending": 37,
        "physical": 76,
        "club": "RMA",
        "nation": "France",
        "imageUrl": "https://...",
        "clubImageUrl": "https://...",
        "nationImageUrl": "https://..."
      }
    }
  ],
  "recentTransactions": [
    {
      "id": "uuid-transaction",
      "type": "BUY_PACK",
      "amount": -500,
      "description": "Bought Premium Pack",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "featuredPacks": [
    {
      "id": "uuid-pack",
      "name": "Premium Gold",
      "price": 1200,
      "description": "More cards, rich Gold odds",
      "cardCount": 7,
      "tierCode": "PG-08",
      "imageUrl": "https://..."
    }
  ]
}
```

## 7. Pack Inventory Page

### Route

```txt
/packs
```

### File FE

```txt
src/pages/PackInventoryPage.tsx
src/services/packInventoryApi.ts
```

### API đang dùng

#### `GET /me`

Mục đích:

- Sync balance.
- Lấy username.

#### `GET /user-packs?page=1&limit=100`

Mục đích:

- Render toàn bộ pack user sở hữu.
- Tính số pending/opened.

#### `POST /user-packs/:id/open`

Mục đích:

- Mở user pack.
- Lấy danh sách card mở ra.
- Cập nhật balance nếu backend trả `newBalance`.

#### `POST /inventory/sell`

Mục đích:

- Bán card sau khi mở pack.
- Cập nhật balance theo `newBalance`.

Request hiện tại:

```json
{
  "cardId": "uuid-card",
  "quantity": 1
}
```

### Mock/fallback đang dùng

Nếu `GET /user-packs` lỗi hoặc không có token:

- FE tạo 48 mock packs từ `PACK_THEMES`.

Nếu pack API thiếu field:

- `pack.name`: fallback theme name.
- `pack.description/oddsTeaser`: fallback theme odds.
- `pack.cardCount`: fallback theme cardCount.
- `createdAt/purchasedAt`: fallback `"Vua mua"`.
- Pack artwork/theme: fallback `PACK_THEMES`.

Nếu `POST /user-packs/:id/open` lỗi:

- FE tự build cards mock từ `cardSeeds`.

Nếu card response thiếu field:

- `pace/shooting/passing/dribbling/defending/physical`: fallback mock stats.
- `clubImageUrl/nationImageUrl`: fallback mock images.
- `sellPrice`: FE tự estimate.

Nếu `POST /inventory/sell` lỗi:

- FE vẫn cho local fallback để UI không vỡ, tự cộng coin local.

### Backend cần thêm/sửa cho Pack Inventory

#### 7.1. Sửa `GET /user-packs`

Hiện cần thêm metadata pack và thời gian mua.

Response cần:

```json
{
  "data": [
    {
      "id": "uuid-user-pack",
      "packId": "uuid-pack",
      "userId": "uuid-user",
      "status": "PENDING",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "purchasedAt": "2024-01-01T00:00:00.000Z",
      "openedAt": null,
      "pack": {
        "id": "uuid-pack",
        "name": "Premium Gold",
        "price": 1900,
        "description": "More cards, rich Gold odds",
        "imageUrl": "https://...",
        "cardCount": 7,
        "tierCode": "PG-08",
        "subtitle": "Value Series",
        "oddsTeaser": "More cards, rich Gold odds"
      }
    }
  ],
  "total": 10,
  "page": 1,
  "limit": 100
}
```

#### 7.2. Sửa `POST /user-packs/:id/open`

Hiện cần đủ card field để render reveal card.

Response cần:

```json
{
  "userPackId": "uuid-user-pack",
  "openedAt": "2024-01-01T00:00:00.000Z",
  "newBalance": 9500,
  "cards": [
    {
      "cardId": "uuid-card",
      "name": "Lionel Messi",
      "rarity": "GOLD_EPIC",
      "overall": 93,
      "pace": 85,
      "shooting": 92,
      "passing": 91,
      "dribbling": 95,
      "defending": 45,
      "physical": 76,
      "position": "ST",
      "club": "Inter Miami",
      "nation": "Argentina",
      "imageUrl": "https://...",
      "clubImageUrl": "https://...",
      "nationImageUrl": "https://...",
      "sellPrice": 1000
    }
  ]
}
```

#### 7.3. Thêm bulk sell API

Đề xuất:

```http
POST /inventory/sell-bulk
```

Mục đích:

- Nút `Bán hết` trong pack opening hiện phải gọi nhiều lần `POST /inventory/sell`.
- Bulk API giúp transaction atomic, tránh lệch balance nếu 1 request fail.

Request:

```json
{
  "items": [
    {
      "cardId": "uuid-card-1",
      "quantity": 1
    },
    {
      "cardId": "uuid-card-2",
      "quantity": 1
    }
  ]
}
```

Response:

```json
{
  "success": true,
  "soldItems": [
    {
      "cardId": "uuid-card-1",
      "soldQuantity": 1,
      "earned": 1000
    },
    {
      "cardId": "uuid-card-2",
      "soldQuantity": 1,
      "earned": 800
    }
  ],
  "totalEarned": 1800,
  "newBalance": 11300
}
```

## 8. Card Inventory Page

### Route

```txt
/cards
```

### File FE

```txt
src/pages/CardInventoryPage.tsx
src/services/cardInventoryApi.ts
```

### API đang dùng

#### `GET /me`

Mục đích:

- Sync username và balance.

#### `GET /inventory?page=1&limit=100&sortBy=overall&sortOrder=desc`

Mục đích:

- Render grid card inventory.
- Tính selected value.
- Hiển thị duplicate count từ `quantity`.

#### `GET /inventory/:id`

Mục đích:

- Khi user mở detail card, FE fetch detail rồi update card trong list.

#### `POST /inventory/sell`

Mục đích:

- Bán 1 card.
- Bán bản trùng.
- Bán card đã chọn.

Request hiện tại:

```json
{
  "cardId": "uuid-card",
  "quantity": 1
}
```

### Mock/fallback đang dùng

Nếu `GET /inventory` lỗi hoặc không có token:

- FE dùng `buildCards()` tạo 72 card mock.

Nếu card API thiếu field:

- Stats fallback từ `cardSeeds`.
- `clubCode`, `clubImageUrl`, `nationImageUrl`, `imageUrl` fallback mock.
- `sellPrice` FE tự estimate.

Nếu `POST /inventory/sell` lỗi:

- FE fallback local để UI không vỡ: tự giảm quantity/xóa card và cộng coin local.

### Backend cần thêm/sửa cho Card Inventory

#### 8.1. Sửa `GET /inventory` và `GET /inventory/:id`

Response cần đầy đủ:

```json
{
  "id": "uuid-inventory-item",
  "cardId": "uuid-card",
  "userId": "uuid-user",
  "quantity": 2,
  "status": "IN_INVENTORY",
  "card": {
    "id": "uuid-card",
    "name": "K. Mbappe",
    "rarity": "DIAMOND_RARE",
    "overall": 91,
    "position": "ST",
    "pace": 97,
    "shooting": 90,
    "passing": 81,
    "dribbling": 92,
    "defending": 37,
    "physical": 76,
    "club": "RMA",
    "nation": "France",
    "imageUrl": "https://...",
    "clubImageUrl": "https://...",
    "nationImageUrl": "https://...",
    "sellPrice": 2500
  }
}
```

#### 8.2. Thêm API bán theo inventory id

Hiện `POST /inventory/sell` nhận `cardId`, nhưng FE đang thao tác theo `inventory.id`. Nếu cùng user có nhiều inventory row cho cùng `cardId`, bán theo `cardId` có thể mơ hồ.

Đề xuất:

```http
POST /inventory/:id/sell
```

Request:

```json
{
  "quantity": 1
}
```

Response:

```json
{
  "success": true,
  "inventoryId": "uuid-inventory-item",
  "cardId": "uuid-card",
  "soldQuantity": 1,
  "remainingQuantity": 1,
  "totalEarned": 2500,
  "newBalance": 12500
}
```

#### 8.3. Thêm bulk sell theo inventory id

Đề xuất:

```http
POST /inventory/sell-bulk
```

Request:

```json
{
  "items": [
    {
      "inventoryId": "uuid-inventory-item-1",
      "quantity": 1
    },
    {
      "inventoryId": "uuid-inventory-item-2",
      "quantity": 1
    }
  ]
}
```

Response:

```json
{
  "success": true,
  "soldItems": [
    {
      "inventoryId": "uuid-inventory-item-1",
      "cardId": "uuid-card-1",
      "soldQuantity": 1,
      "remainingQuantity": 0,
      "earned": 1000
    }
  ],
  "totalEarned": 1000,
  "newBalance": 11000
}
```

## 9. Market Page

### Route

```txt
/market
```

### File FE

```txt
src/pages/MarketPage.tsx
src/services/marketApi.ts
```

### API đang dùng

#### `GET /packs?page=1&limit=100`

Mục đích:

- Render catalog market.
- Render featured pack.
- Render drawer chi tiết pack.

#### `POST /packs/:id/buy`

Mục đích:

- Mua pack.
- Cập nhật balance theo `newBalance`.

### Mock/fallback đang dùng

Nếu `GET /packs` lỗi hoặc trả rỗng:

- FE dùng `PACK_THEMES` local.

Nếu pack API thiếu field:

- Artwork/theme fallback từ `PACK_THEMES`.
- `cardCount`, `tierCode`, `subtitle`, `oddsTeaser` fallback từ `PACK_THEMES`.

Nếu `POST /packs/:id/buy` lỗi:

- FE hiển thị receipt error.

### Backend cần thêm/sửa cho Market

#### 9.1. Sửa `GET /packs`

Response nên có đủ metadata:

```json
{
  "data": [
    {
      "id": "uuid-pack",
      "name": "Ultimate Pack",
      "price": 7500,
      "description": "Highest tier prestige odds",
      "imageUrl": "https://...",
      "cardCount": 10,
      "tierCode": "UT-16",
      "subtitle": "Legendary Series",
      "oddsTeaser": "Highest tier prestige odds",
      "rarityFocus": ["DIAMOND_COMMON", "DIAMOND_RARE"],
      "isFeatured": true,
      "isLimited": true
    }
  ],
  "total": 16,
  "page": 1,
  "limit": 100
}
```

#### 9.2. Sửa `POST /packs/:id/buy` để hỗ trợ purchase mode

UI hiện có 2 lựa chọn:

- `open-now`
- `send-inventory`

Backend hiện không nhận mode. FE tạm gọi buy rồi báo pack vào kho.

Đề xuất request:

```json
{
  "mode": "SEND_INVENTORY"
}
```

hoặc:

```json
{
  "mode": "OPEN_NOW"
}
```

Response khi `SEND_INVENTORY`:

```json
{
  "userPackId": "uuid-user-pack",
  "packName": "Premium Pack",
  "price": 500,
  "newBalance": 9500,
  "status": "PENDING"
}
```

Response khi `OPEN_NOW`:

```json
{
  "userPackId": "uuid-user-pack",
  "packName": "Premium Pack",
  "price": 500,
  "newBalance": 9500,
  "status": "OPENED",
  "openedAt": "2024-01-01T00:00:00.000Z",
  "cards": [
    {
      "cardId": "uuid-card",
      "name": "Lionel Messi",
      "rarity": "GOLD_EPIC",
      "overall": 93,
      "pace": 85,
      "shooting": 92,
      "passing": 91,
      "dribbling": 95,
      "defending": 45,
      "physical": 76,
      "position": "ST",
      "club": "Inter Miami",
      "nation": "Argentina",
      "imageUrl": "https://...",
      "clubImageUrl": "https://...",
      "nationImageUrl": "https://...",
      "sellPrice": 1000
    }
  ]
}
```

## 10. Public Card/Pack Pages Chưa Có UI Riêng

API trong `API.md` có:

```http
GET /cards
GET /cards/:id
GET /packs/:id
```

Hiện FE chưa có màn public riêng cho card database hoặc pack detail public. Các endpoint này chưa được dùng trực tiếp ngoài fallback mapping market/home.

Nếu muốn thêm page sau:

- `/cards/public` hoặc `/database/cards`
- `/packs/:id`

thì có thể dùng trực tiếp API public trên.

## 11. Danh Sách API Cần Ưu Tiên Backend

### P0 - Cần để bỏ mock ở luồng chính

1. Bổ sung full card fields cho:
   - `GET /inventory`
   - `GET /inventory/:id`
   - `POST /user-packs/:id/open`

2. Bổ sung full pack fields cho:
   - `GET /packs`
   - `GET /user-packs`

3. Sửa hoặc thêm sell theo inventory item:
   - `POST /inventory/:id/sell`

### P1 - Cần để transaction ổn định

4. Thêm bulk sell:
   - `POST /inventory/sell-bulk`

5. Sửa buy pack nhận mode:
   - `POST /packs/:id/buy`
   - body `{ "mode": "SEND_INVENTORY" | "OPEN_NOW" }`

### P2 - Tối ưu số request

6. Thêm dashboard API:
   - `GET /home/dashboard`

7. Thêm landing public API nếu muốn CMS/dynamic landing:
   - `GET /public/landing`

## 12. Ghi Chú Kỹ Thuật FE

### Fallback policy hiện tại

FE cố tình fallback mock để:

- Không trắng màn khi backend chưa chạy.
- Không crash nếu API thiếu field.
- Giữ layout đúng trong khi backend hoàn thiện.

Khi backend trả đủ field theo tài liệu này, có thể xóa dần:

- `cardSeeds` trong `HomePage.tsx`, `PackInventoryPage.tsx`, `CardInventoryPage.tsx`.
- Mapping fallback image/stats.
- `PACK_THEMES` fallback cho API pack nếu backend trả đủ theme/artwork metadata hoặc `imageUrl` pack thật.

### Rủi ro hiện tại

1. `POST /inventory/sell` nhận `cardId`, không nhận `inventoryId`.
   - Có thể sai nếu user có nhiều inventory item cùng card.

2. `Bán hết` đang phải gọi nhiều request sell.
   - Có thể lệch balance nếu một vài request fail.

3. `open-now` ở Market chưa mở thật.
   - Backend chưa nhận mode và chưa trả cards trong buy response.

4. Pack artwork vẫn là theme local.
   - Nếu backend có ảnh pack thật, FE cần thống nhất dùng `imageUrl` hoặc backend trả theme tokens.
