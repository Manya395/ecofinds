# EcoFinds – Sustainable Second‑Hand Marketplace (Full Stack)

A hackathon-friendly full‑stack prototype with:
- React + Vite + Tailwind + Framer Motion (animations)
- Node.js + Express API
- Embedded NeDB storage (no external DB required)
- Features: Auth, profile, product CRUD, browse + filter + search, cart, checkout, orders (previous purchases).

## Prerequisites
- Node.js 18+ and npm

## Quick Start (two terminals)
### 1) Server
```bash
cd server
npm install
npm run dev   # or: npm start
```
Server runs on **http://localhost:4000**

### 2) Client
```bash
cd client
npm install
npm run dev
```
Client runs on **http://localhost:5173**

> Login/Sign-up is email+password. JWT stored in localStorage.

## Environment
- `server/.env` – set `JWT_SECRET`, `PORT` (default 4000), `CLIENT_ORIGIN` (default http://localhost:5173)
- No DB setup needed (files saved to `server/database/*.db`).

## API Overview
- `POST /api/auth/register` { email, password, username? }
- `POST /api/auth/login` { email, password }
- `GET  /api/me` (auth) – profile
- `PUT  /api/me` (auth) – { username, avatarUrl }
- `GET  /api/products` ?search=&category=
- `GET  /api/products/:id`
- `GET  /api/my/listings` (auth)
- `POST /api/products` (auth)
- `PUT  /api/products/:id` (auth, owner)
- `DELETE /api/products/:id` (auth, owner)
- `GET  /api/cart` (auth)
- `POST /api/cart` (auth) { productId, quantity }
- `PUT  /api/cart/:id` (auth) { quantity }
- `DELETE /api/cart/:id` (auth)
- `POST /api/cart/checkout` (auth) -> creates order
- `GET  /api/orders` (auth)
- `GET  /api/orders/:id` (auth)

## Notes
- Images are placeholders (URL). Add real uploads later.
- Categories are free-form strings in this prototype.
- For a demo, create two users: a seller (to add listings) and a buyer (to test cart & orders).
