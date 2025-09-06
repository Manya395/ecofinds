import { useEffect, useState } from 'react'
import api from '../lib/api'

export default function Orders() {
  const [orders, setOrders] = useState([])

  async function load() {
    const r = await api.get('/orders')
    setOrders(r.data)
  }
  useEffect(()=>{ load() }, [])

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Previous Purchases</h1>
      {!orders.length && <div className="text-muted">No orders yet.</div>}
      <div className="grid gap-4">
        {orders.map(o => (
          <div key={o._id} className="card p-4">
            <div className="flex items-center justify-between">
              <div className="font-semibold">Order #{o._id.slice(-6)}</div>
              <div className="text-sm text-slate-500">{new Date(o.createdAt).toLocaleString()}</div>
            </div>
            <div className="mt-3 grid gap-2">
              {o.items.map(it => (
                <div key={it._id} className="flex items-center gap-3">
                  <img src={it.product?.imageUrl} className="w-20 h-14 object-cover rounded-lg" />
                  <div className="flex-1">
                    <div className="font-medium">{it.product?.title}</div>
                    <div className="text-sm text-slate-500">{it.quantity} × ₹{it.priceAtPurchase}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
