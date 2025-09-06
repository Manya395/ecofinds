import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function ProductCard({ p }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="card overflow-hidden"
    >
      <Link to={`/product/${p._id}`}>
        <img src={p.imageUrl} alt={p.title} className="w-full h-40 object-cover" />
        <div className="p-3">
          <div className="font-semibold truncate">{p.title}</div>
          <div className="text-green-700 font-bold mt-1">₹{p.price}</div>
          <div className="text-xs text-slate-500 mt-1">{p.category}</div>
        </div>
      </Link>
    </motion.div>
  )
}
