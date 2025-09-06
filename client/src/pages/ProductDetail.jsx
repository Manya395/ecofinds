import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../lib/api'
import { getToken } from '../lib/api'

export default function ProductDetail() {
  const { id } = useParams()
  const [p, setP] = useState(null)
  const [isOwner, setIsOwner] = useState(false)
  const [edit, setEdit] = useState(false)
  const [form, setForm] = useState({ title:'', description:'', price:'', category:'', imageUrl:'' })
  const nav = useNavigate()

  async function load() {
    const r = await api.get(`/products/${id}`)
    setP(r.data)
    setForm({ title:r.data.title, description:r.data.description, price:r.data.price, category:r.data.category, imageUrl:r.data.imageUrl })
    try {
      const me = await api.get('/me')
      setIsOwner(me.data.id === r.data.sellerId)
    } catch {}
  }
  useEffect(()=>{ load() }, [id])

  async function save() {
    await api.put(`/products/${id}`, form)
    setEdit(false)
    await load()
  }

  async function addToCart() {
    if (!getToken()) return nav('/login')
    await api.post('/cart', { productId: id, quantity: 1 })
    alert('Added to cart')
  }

  if (!p) return <div>Loading...</div>

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <img src={p.imageUrl} className="w-full max-h-[360px] object-cover rounded-2xl" />
      {!edit ? (
        <div className="card p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{p.title}</h1>
            {isOwner && <button className="btn" onClick={()=>setEdit(true)}>Edit</button>}
          </div>
          <div className="text-green-700 font-bold text-xl">₹{p.price}</div>
          <div className="text-sm text-slate-500">{p.category}</div>
          <p className="text-slate-700">{p.description || 'No description'}</p>
          {!isOwner && <button className="btn btn-primary" onClick={addToCart}>Add to cart</button>}
        </div>
      ) : (
        <div className="card p-4 space-y-2">
          <input className="input" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
          <input className="input" value={form.category} onChange={e=>setForm({...form, category:e.target.value})} />
          <textarea className="input min-h-[120px]" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
          <input className="input" type="number" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} />
          <input className="input" value={form.imageUrl} onChange={e=>setForm({...form, imageUrl:e.target.value})} />
          <div className="flex gap-2">
            <button className="btn btn-primary" onClick={save}>Save</button>
            <button className="btn" onClick={()=>setEdit(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}
