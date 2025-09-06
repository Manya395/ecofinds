import { useEffect, useMemo, useState } from 'react'
import api from '../lib/api'

export default function Cart() {
  const [items, setItems] = useState([])

  async function load() {
    const r = await api.get('/cart')
    setItems(r.data)
  }
  useEffect(()=>{ load() }, [])

  function total() {
    return items.reduce((sum, it) => sum + (it?.product?.price || 0) * (it.quantity || 1), 0)
  }

  async function updateQty(id, q) {
    await api.put(`/cart/${id}`, { quantity: q })
    await load()
  }
  async function removeItem(id) {
    await api.delete(`/cart/${id}`)
    await load()
  }
  async function checkout() {
    const r = await api.post('/cart/checkout')
    alert('Order placed!')
    await load()
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      <div className="grid gap-3">
        {items.map(it => (
          <div key={it._id} className="card p-3 flex items-center gap-3">
            <img src={it?.product?.imageUrl} className="w-24 h-16 object-cover rounded-lg" />
            <div className="flex-1">
              <div className="font-semibold">{it?.product?.title}</div>
              <div className="text-green-700 font-bold">₹{it?.product?.price}</div>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn" onClick={()=>updateQty(it._id, Math.max(1,(it.quantity||1)-1))}>-</button>
              <div className="px-3">{it.quantity||1}</div>
              <button className="btn" onClick={()=>updateQty(it._id, (it.quantity||1)+1)}>+</button>
            </div>
            <button className="btn" onClick={()=>removeItem(it._id)}>Remove</button>
          </div>
        ))}
      </div>
      <div className="card p-4 flex items-center justify-between">
        <div className="text-lg">Total</div>
        <div className="text-2xl font-bold text-green-700">₹{total()}</div>
      </div>
      <button className="btn btn-primary" onClick={checkout} disabled={!items.length}>Checkout</button>
    </div>
  )
}
