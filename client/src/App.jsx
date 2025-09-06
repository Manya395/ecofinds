import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Feed from './pages/Feed.jsx'
import AddProduct from './pages/AddProduct.jsx'
import MyListings from './pages/MyListings.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Cart from './pages/Cart.jsx'
import Orders from './pages/Orders.jsx'
import api, { setToken, getToken } from './lib/api.js'

function RequireAuth({ children }) {
  const nav = useNavigate()
  const token = getToken()
  useEffect(()=>{
    if (!token) nav('/login')
  }, [token])
  if (!token) return null
  return children
}

export default function App() {
  const [profile, setProfile] = useState(null)

  useEffect(()=>{
    const t = getToken()
    if (t) {
      setToken(t)
      api.get('/me').then(r=> setProfile(r.data)).catch(()=>{})
    }
  }, [])

  return (
    <div>
      <Navbar profile={profile} setProfile={setProfile} />
      <main className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/login" element={<Login setProfile={setProfile} />} />
          <Route path="/signup" element={<Signup setProfile={setProfile} />} />
          <Route path="/add" element={<RequireAuth><AddProduct /></RequireAuth>} />
          <Route path="/my-listings" element={<RequireAuth><MyListings /></RequireAuth>} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/dashboard" element={<RequireAuth><Dashboard setProfile={setProfile} /></RequireAuth>} />
          <Route path="/cart" element={<RequireAuth><Cart /></RequireAuth>} />
          <Route path="/orders" element={<RequireAuth><Orders /></RequireAuth>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <footer className="text-center text-sm py-8 text-slate-500">EcoFinds • Buy better, waste less.</footer>
      {/* Subtle entrance animation background */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        className="fixed inset-0 pointer-events-none bg-gradient-to-b from-green-100 via-transparent to-green-100"
      />
    </div>
  )
}
