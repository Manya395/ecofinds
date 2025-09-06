import { useState } from 'react'
import api from '../lib/api'
import { useNavigate } from 'react-router-dom'

const CATEGORIES = ['Electronics','Fashion','Home','Books','Sports','Other']

export default function AddProduct() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [err, setErr] = useState('')
  const nav = useNavigate()

  async function submit(e) {
    e.preventDefault()
    setErr('')
    try {
      const r = await api.post('/products', { title, category, description, price, imageUrl })
      nav(`/product/${r.data._id}`)
    } catch (e) {
      setErr(e?.response?.data?.error || 'Failed to add product')
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={submit} className="card p-4 space-y-3">
        <input className="input" placeholder="Product Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <select className="select" value={category} onChange={e=>setCategory(e.target.value)}>
          {CATEGORIES.map(c=> <option key={c} value={c}>{c}</option>)}
        </select>
        <textarea className="input min-h-[120px]" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
        <input className="input" placeholder="Price" type="number" value={price} onChange={e=>setPrice(e.target.value)} />
        <input className="input" placeholder="Image URL (optional)" value={imageUrl} onChange={e=>setImageUrl(e.target.value)} />
        {err && <div className="text-red-600 text-sm">{err}</div>}
        <button className="btn btn-primary w-full">Submit Listing</button>
      </form>
    </div>
  )
}
