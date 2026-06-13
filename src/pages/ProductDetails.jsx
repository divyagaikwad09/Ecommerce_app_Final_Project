import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById } from '../services/api'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { FiShoppingCart, FiZap, FiStar, FiCheck, FiArrowLeft, FiPackage, FiRefreshCw } from 'react-icons/fi'

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, addToCart } = useAuth()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [qty, setQty] = useState(1)
  const [selectedImg, setSelectedImg] = useState(0)

  useEffect(() => {
    const fetch = async () => {
      const data = await getProductById(id)
      setProduct(data)
      setLoading(false)
    }
    fetch()
  }, [id])

  const handleAddToCart = async () => {
  if (!user) {
    toast.error("Please login first");
    navigate("/login");
    return;
  }

  if (user.role === "admin") {
    toast.error("Admin cannot add to cart");
    return;
  }

  if (qty > product.stock) {
    toast.error(
      `Only ${product.stock} items available`
    );
    return;
  }

  const ok = await addToCart(product, qty);

  if (ok) {
    toast.success("Added to Cart");
  }
};

const handleBuyNow = async () => {
  if (!user) {
    toast.error("Please login first");
    navigate("/login");
    return;
  }

  if (user.role === "admin") {
    toast.error("Admin cannot buy products");
    return;
  }

  if (qty > product.stock) {
    toast.error(
      `Only ${product.stock} items available`
    );
    return;
  }

  await addToCart(product, qty);

  navigate("/checkout");
};

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-200 rounded-xl h-96" />
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4" />
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-10 bg-gray-200 rounded w-1/3" />
        </div>
      </div>
    </div>
  )

  if (!product) return <div className="text-center py-20 text-gray-500">Product not found</div>

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-gray-500 hover:text-gray-700 mb-4 text-sm">
        <FiArrowLeft size={16} /> Back
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Images */}
        <div>
          <div className="card overflow-hidden mb-3">
            <img
              src={product.images?.[selectedImg] || product.image}
              alt={product.name}
              className="w-full h-80 object-contain p-4"
            />
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImg(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${i === selectedImg ? 'border-orange-500' : 'border-gray-200'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <p className="text-sm text-gray-400 uppercase tracking-wide mb-1">{product.brand}</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h1>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-sm">
              <span>{product.rating}</span>
              <FiStar size={12} fill="white" />
            </div>
            <span className="text-gray-500 text-sm">{product.reviews?.toLocaleString()} ratings</span>
          </div>

          <hr className="mb-4" />

          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
            {discount > 0 && (
              <>
                <span className="text-gray-400 line-through text-lg">₹{product.originalPrice.toLocaleString()}</span>
                <span className="text-green-600 font-semibold">{discount}% off</span>
              </>
            )}
          </div>

          {/* Offers */}
          {product.offers?.length > 0 && (
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-4">
              <p className="font-semibold text-gray-800 mb-2 text-sm">Available Offers</p>
              {product.offers.map((o, i) => (
                <p key={i} className="text-sm text-blue-700 flex items-start gap-2 mb-1">
                  <FiCheck size={14} className="shrink-0 mt-0.5 text-green-500" /> {o}
                </p>
              ))}
            </div>
          )}

          {/* Features */}
          {product.features?.length > 0 && (
            <div className="mb-4">
              <p className="font-semibold text-gray-800 mb-2 text-sm">Key Features</p>
              <ul className="space-y-1">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Description */}
          <p className="text-sm text-gray-600 mb-6">{product.description}</p>

          {/* Quantity */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm font-medium text-gray-700">Qty:</span>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}
                className="px-3 py-1.5 hover:bg-gray-100 text-lg font-medium">−</button>
              <span className="px-4 py-1.5 text-sm font-semibold border-x border-gray-300">{qty}</span>
              <button onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                className="px-3 py-1.5 hover:bg-gray-100 text-lg font-medium">+</button>
            </div>
            <span className="text-xs text-gray-400">{product.stock} available</span>
          </div>

          {/* CTA */}
          <div className="flex gap-3">
            <button onClick={handleAddToCart} disabled={product.stock === 0}
              className="flex-1 btn-secondary flex items-center justify-center gap-2 py-3 disabled:opacity-50">
              <FiShoppingCart size={18} /> Add to Cart
            </button>
            <button onClick={handleBuyNow} disabled={product.stock === 0}
              className="flex-1 btn-primary flex items-center justify-center gap-2 py-3 disabled:opacity-50">
              <FiZap size={18} /> Buy Now
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="flex items-center gap-2 text-xs text-gray-500 p-3 bg-gray-50 rounded-lg">
              <FiPackage className="text-orange-500" /> Free delivery available
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 p-3 bg-gray-50 rounded-lg">
              <FiRefreshCw className="text-orange-500" /> 10-day easy return
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}