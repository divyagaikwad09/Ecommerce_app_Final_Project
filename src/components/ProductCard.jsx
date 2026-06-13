import { Link } from 'react-router-dom'
import { FiShoppingCart, FiStar } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function ProductCard({ product }) {
  const { user, addToCart } = useAuth()

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  const handleAddToCart = async (e) => {
    e.preventDefault()
    if (!user) {
      toast.error('Please login to add to cart')
      return
    }
    if (user.role === 'admin') {
      toast.error('Admin cannot add to cart')
      return
    }
    const ok = await addToCart(product)
    if (ok) toast.success(`${product.name} added to cart!`)
  }

  return (
    <Link to={`/products/${product.id}`}   className="block bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
>
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 badge bg-green-100 text-green-700 font-semibold">
            {discount}% OFF
          </span>
        )}
        {product.stock < 5 && product.stock > 0 && (
          <span className="absolute top-2 right-2 badge bg-red-100 text-red-600">
            Only {product.stock} left
          </span>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-gray-800 font-semibold text-sm px-3 py-1 rounded-full">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{product.brand}</p>
        <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 mb-2 group-hover:text-orange-600 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center gap-0.5 bg-green-600 text-white text-xs px-1.5 py-0.5 rounded">
            <span>{product.rating}</span>
            <FiStar size={10} fill="white" />
          </div>
          <span className="text-xs text-gray-400">({product.reviews?.toLocaleString()})</span>
        </div>

        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>

        {product.offers?.length > 0 && (
          <p className="text-xs text-blue-600 mb-3 truncate">🏷️ {product.offers[0]}</p>
        )}

       <button
  onClick={handleAddToCart}
  disabled={product.stock === 0}
  className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition
  ${
    product.stock === 0
      ? "bg-gray-400 text-white"
      : "bg-yellow-500 hover:bg-yellow-600 text-black"
  }`}
>
  <FiShoppingCart size={16} />
  {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
</button>
</div>
    </Link>
  )
}