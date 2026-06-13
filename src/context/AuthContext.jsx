import { createContext, useContext, useState, useEffect } from 'react'
import { updateUser } from '../services/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const refreshUser = async () => {
    if (!user) return
    // Re-fetch user from server to get latest cart/orders
    const { getAllUsers } = await import('../services/api')
    const users = await getAllUsers()
    const fresh = users.find(u => u.id === user.id)
    if (fresh) {
      setUser(fresh)
      localStorage.setItem('user', JSON.stringify(fresh))
    }
  }

  const addToCart = async (product, qty = 1) => {
    if (!user) return false
    const cart = user.cart || []
    const existing = cart.find(i => i.productId === product.id)
    let updatedCart
    if (existing) {
      updatedCart = cart.map(i =>
        i.productId === product.id ? { ...i, qty: i.qty + qty } : i
      )
    } else {
      updatedCart = [...cart, {
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty
      }]
    }
    const updated = await updateUser(user.id, { cart: updatedCart })
    setUser(updated)
    localStorage.setItem('user', JSON.stringify(updated))
    return true
  }

  const removeFromCart = async (productId) => {
    const updatedCart = (user.cart || []).filter(i => i.productId !== productId)
    const updated = await updateUser(user.id, { cart: updatedCart })
    setUser(updated)
    localStorage.setItem('user', JSON.stringify(updated))
  }

  const updateCartQty = async (productId, qty) => {
    const updatedCart = (user.cart || []).map(i =>
      i.productId === productId ? { ...i, qty } : i
    )
    const updated = await updateUser(user.id, { cart: updatedCart })
    setUser(updated)
    localStorage.setItem('user', JSON.stringify(updated))
  }

  const clearCart = async () => {
    const updated = await updateUser(user.id, { cart: [] })
    setUser(updated)
    localStorage.setItem('user', JSON.stringify(updated))
  }

  const cartCount = (user?.cart || []).reduce((sum, i) => sum + i.qty, 0)
  const cartTotal = (user?.cart || []).reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <AuthContext.Provider value={{
      user, login, logout, refreshUser,
      addToCart, removeFromCart, updateCartQty, clearCart,
      cartCount, cartTotal
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)