import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiShoppingCart, FiUser, FiSearch, FiMenu, FiX, FiLogOut, FiPackage, FiSettings } from 'react-icons/fi'
import toast from 'react-hot-toast'

const categories = ['Mobiles', 'Electronics', 'Fashion']

export default function Navbar() {
  const { user, logout, cartCount } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/products?search=${search.trim()}`)
      setSearch('')
    }
  }

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/')
    setDropdownOpen(false)
  }

  return (
    <nav className="bg-orange-500 shadow-md sticky top-0 z-50">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="text-white font-bold text-xl shrink-0">
          🛒 Divya's Store
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
          <div className="flex bg-white rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 text-sm focus:outline-none"
            />
            <button type="submit" className="bg-orange-400 hover:bg-orange-600 px-4 text-white transition-colors">
              <FiSearch size={18} />
            </button>
          </div>
        </form>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 text-white hover:text-orange-100"
              >
                <img
                  src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                  alt={user.name}
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                <span className="text-sm font-medium">{user.name.split(' ')[0]}</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 border border-gray-100">
                  <Link to="/profile" onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <FiUser size={15} /> My Profile
                  </Link>
                  <Link to="/orders" onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <FiPackage size={15} /> My Orders
                  </Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-orange-600 hover:bg-orange-50">
                      <FiSettings size={15} /> Admin Panel
                    </Link>
                  )}
                  <hr className="my-1" />
                  <button onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 w-full text-left">
                    <FiLogOut size={15} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-white hover:text-orange-100 text-sm font-medium flex items-center gap-1">
              <FiUser size={18} /> Login
            </Link>
          )}

          <Link to="/cart" className="relative text-white hover:text-orange-100">
            <FiShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile menu btn */}
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Category nav */}
      <div className="bg-orange-600 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex gap-1">
          <Link to="/" className="text-white text-sm py-2 px-3 hover:bg-orange-700 rounded transition-colors">
            All
          </Link>
          {categories.map(cat => (
            <Link
              key={cat}
              to={`/products?category=${cat}`}
              className="text-white text-sm py-2 px-3 hover:bg-orange-700 rounded transition-colors"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-orange-200 py-2">
          {categories.map(cat => (
            <Link key={cat} to={`/products?category=${cat}`}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:bg-orange-50 text-sm">
              {cat}
            </Link>
          ))}
          <hr className="my-2" />
          {user ? (
            <>
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-50 text-sm">Profile</Link>
              <Link to="/orders" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-50 text-sm">Orders</Link>
              <Link to="/cart" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-50 text-sm">Cart ({cartCount})</Link>
              {user.role === 'admin' && <Link to="/admin" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-orange-600 hover:bg-orange-50 text-sm">Admin Panel</Link>}
              <button onClick={handleLogout} className="block px-4 py-2 text-red-500 hover:bg-red-50 text-sm w-full text-left">Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-50 text-sm">Login / Register</Link>
          )}
        </div>
      )}
    </nav>
  )
}