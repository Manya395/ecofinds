import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api, { setToken } from '../lib/api'
import { motion } from 'framer-motion'

export default function Login({ setProfile }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const nav = useNavigate()

  async function submit(e) {
    e.preventDefault()
    setErr('')
    try {
      const r = await api.post('/auth/login', { email, password })
      setToken(r.data.token)
      const me = await api.get('/me')
      setProfile(me.data)
      nav('/')
    } catch (e) {
      setErr(e?.response?.data?.error || 'Failed to login')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <motion.h1 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="text-2xl font-bold mb-4">Welcome back</motion.h1>
      <form onSubmit={submit} className="card p-4 space-y-3">
        <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        {err && <div className="text-red-600 text-sm">{err}</div>}
        <button className="btn btn-primary w-full">Log in</button>
        <div className="text-sm text-center text-muted">No account? <Link className="text-green-700" to="/signup">Sign up</Link></div>
      </form>
    </div>
  )
}
