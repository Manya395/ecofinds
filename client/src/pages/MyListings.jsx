import { useEffect, useState } from 'react'
import api from '../lib/api'
import { Link } from 'react-router-dom'

export default function MyListings() {
  const [list, setList] = useState([])

  async function load() {
    const r = await api.get('/my/listings')
    setList(r.data)
  }
  useEffect(()=>{ load() }, [])

  async function del(id) {
    if (!confirm('Delete this listing?')) return
    await api.delete(`/products/${id}`)
    await load()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Listings</h1>
        <Link to="/add" className="btn btn-primary">+ Add</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map(p => (
          <div key={p._id} className="card overflow-hidden">
            <Link to={`/product/${p._id}`}><img src={p.imageUrl} className="w-full h-40 object-cover" /></Link>
            <div className="p-3 space-y-1">
              <div className="font-semibold">{p.title}</div>
              <div className="text-green-700 font-bold">₹{p.price}</div>
              <div className="text-xs text-slate-500">{p.category}</div>
              <div className="flex gap-2 pt-2">
                <Link className="btn btn-ghost" to={`/product/${p._id}`}>Edit</Link>
                <button className="btn" onClick={()=>del(p._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
