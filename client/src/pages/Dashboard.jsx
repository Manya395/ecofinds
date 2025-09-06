import { useEffect, useState } from 'react'
import api from '../lib/api'

export default function Dashboard({ setProfile }) {
  const [me, setMe] = useState(null)
  const [form, setForm] = useState({ username:'', avatarUrl:'' })

  async function load() {
    const r = await api.get('/me')
    setMe(r.data)
    setForm({ username: r.data.username || '', avatarUrl: r.data.avatarUrl || '' })
  }
  useEffect(()=>{ load() }, [])

  async function save() {
    const r = await api.put('/me', form)
    setProfile(r.data)
    alert('Saved')
  }

  if (!me) return null

  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Your Dashboard</h1>
      <div className="card p-4 space-y-2">
        <div className="flex items-center gap-3">
          <img src={form.avatarUrl || 'https://via.placeholder.com/80?text=U'} className="w-16 h-16 rounded-full object-cover" />
          <div>
            <div className="font-semibold">{me.email}</div>
            <div className="text-sm text-slate-500">User ID: {me.id}</div>
          </div>
        </div>
        <input className="input" placeholder="Username" value={form.username} onChange={e=>setForm({...form, username:e.target.value})} />
        <input className="input" placeholder="Avatar URL" value={form.avatarUrl} onChange={e=>setForm({...form, avatarUrl:e.target.value})} />
        <button className="btn btn-primary" onClick={save}>Save Changes</button>
      </div>
    </div>
  )
}
