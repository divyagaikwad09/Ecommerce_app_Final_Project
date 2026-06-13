import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiTrash2, FiArrowRight, FiShoppingBag } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function Cart() {
  const { user, cartTotal, removeFromCart, updateCartQty } = useAuth()
  const navigate = useNavigate()

  const cart = user?.cart || []
  const savings = cart.reduce((sum, item) => sum + (item.originalPrice || item.price) * item.qty - item.price * item.qty, 0)

  const handleRemove = async (productId) => {
    await removeFromCart(productId)
    toast.success('Item removed')
  }

  if (!user) return (
    <div className="text-center py-24">
      <span className="text-6xl block mb-4">🛒</span>
      <h2 className="text-xl font-semibold text-gray-700 mb-3">Your cart is empty</h2>
      <Link to="/login" className="btn-primary inline-block">Login to view cart</Link>
    </div>
  )

  if (cart.length === 0) return (
    <div className="text-center py-24">
      <span className="text-6xl block mb-4">🛒</span>
      <h2 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
      <p className="text-gray-500 mb-6">Add items to your cart to see them here</p>
      <Link to="/products" className="btn-primary inline-block">Start Shopping</Link>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FiShoppingBag /> My Cart ({cart.length} items)
      </h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.productId} className="card p-4 flex gap-4">
              <img src={item.image} alt={item.name}
                className="w-24 h-24 object-cover rounded-lg shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">{item.name}</h3>
                <p className="text-lg font-bold text-gray-900 mb-3">₹{(item.price * item.qty).toLocaleString()}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button onClick={() => item.qty > 1 ? updateCartQty(item.productId, item.qty - 1) : handleRemove(item.productId)}
                      className="px-3 py-1 hover:bg-gray-100 text-lg font-medium">−</button>
                    <span className="px-3 py-1 text-sm font-semibold border-x border-gray-300">{item.qty}</span>
                    <button onClick={() => updateCartQty(item.productId, item.qty + 1)}
                      className="px-3 py-1 hover:bg-gray-100 text-lg font-medium">+</button>
                  </div>
                  <button onClick={() => handleRemove(item.productId)}
                    className="text-red-400 hover:text-red-600 transition-colors flex items-center gap-1 text-sm">
                    <FiTrash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-20">
            <h2 className="text-lg font-bold text-gray-800 mb-4 pb-3 border-b">Price Details</h2>
            <div className="space-y-3 text-sm mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Price ({cart.length} items)</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>− ₹{savings.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span className="text-green-600">{cartTotal > 999 ? 'FREE' : '₹49'}</span>
              </div>
            </div>
            <div className="border-t pt-3 flex justify-between font-bold text-gray-900 text-base mb-5">
              <span>Total</span>
              <span>₹{(cartTotal + (cartTotal > 999 ? 0 : 49)).toLocaleString()}</span>
            </div>
            {savings > 0 && (
              <p className="text-green-600 text-sm mb-4 font-medium">🎉 You save ₹{savings.toLocaleString()}</p>
            )}
            <button onClick={() => navigate('/checkout')}
              className="w-full btn-primary flex items-center justify-center gap-2 py-3">
              Proceed to Checkout <FiArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}