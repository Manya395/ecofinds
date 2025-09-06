import { useEffect, useMemo, useState } from 'react'
import api from '../lib/api'
import ProductCard from '../components/ProductCard'

const CATEGORIES = ['All','Electronics','Fashion','Home','Books','Sports','Other']

export default function Feed() {
  const [list, setList] = useState([])
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All')

  async function load() {
    const r = await api.get('/products', { params: { search, category: cat==='All'?'':cat } })
    setList(r.data)
  }
  useEffect(()=>{ load() }, [])

  async function applyFilters(e) {
    e?.preventDefault()
    await load()
  }

  return (
    <div className="space-y-4">
      <form onSubmit={applyFilters} className="card p-3 flex gap-2 items-center">
        <input className="input" placeholder="Search products..." value={search} onChange={e=>setSearch(e.target.value)} />
        <select className="select max-w-xs" value={cat} onChange={e=>setCat(e.target.value)}>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button className="btn btn-primary">Apply</button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {list.map(p => <ProductCard key={p._id} p={p} />)}
      </div>
    </div>
  )
}
