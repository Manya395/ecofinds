import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { clearToken, getToken } from '../lib/api'

export default function Navbar({ profile, setProfile }) {
  const nav = useNavigate()
  const isAuthed = !!getToken()
  function logout() {
    clearToken()
    setProfile(null)
    nav('/')
  }
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-2 font-bold text-xl"
        >
          <span className="inline-block w-3 h-3 rounded-full bg-green-600"></span>
          <Link to="/" className="hover:opacity-80">EcoFinds</Link>
        </motion.div>
        <nav className="ml-auto flex items-center gap-3">
          <Link to="/" className="btn btn-ghost">Browse</Link>
          {isAuthed && <Link to="/add" className="btn btn-ghost">Add</Link>}
          {isAuthed && <Link to="/my-listings" className="btn btn-ghost">My Listings</Link>}
          {isAuthed && <Link to="/cart" className="btn btn-ghost">Cart</Link>}
          {isAuthed && <Link to="/orders" className="btn btn-ghost">Orders</Link>}
          {!isAuthed && <Link to="/login" className="btn btn-primary">Log in</Link>}
          {isAuthed && <button onClick={logout} className="btn">Log out</button>}
          {isAuthed && <Link to="/dashboard" className="rounded-full w-9 h-9 bg-slate-200 grid place-items-center">
            {profile?.username?.[0]?.toUpperCase() || 'U'}
          </Link>}
        </nav>
      </div>
    </header>
  )
}
