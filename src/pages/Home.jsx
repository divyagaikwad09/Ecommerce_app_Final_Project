import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../services/api'
import ProductCard from '../components/ProductCard'
import { FiArrowRight, FiTruck, FiShield, FiRefreshCw, FiHeadphones } from 'react-icons/fi'

const banners = [
  { title: 'Top Deals on Mobiles', subtitle: 'Save up to 30% on latest smartphones', bg: 'from-blue-600 to-purple-700', link: '/products?category=Mobiles', emoji: '📱' },
  { title: 'Electronics Sale', subtitle: 'Laptops, TVs & more at amazing prices', bg: 'from-orange-500 to-red-600', link: '/products?category=Electronics', emoji: '💻' },
  { title: 'Fashion Week Offer', subtitle: 'Flat 40% off on clothing & footwear', bg: 'from-pink-500 to-rose-600', link: '/products?category=Fashion', emoji: '👗' },
]

const features = [
  { icon: FiTruck, title: 'Free Delivery', desc: 'On orders above ₹999', color: 'text-blue-500' },
  { icon: FiShield, title: 'Secure Payment', desc: '100% safe transactions', color: 'text-green-500' },
  { icon: FiRefreshCw, title: 'Easy Returns', desc: '10-day return policy', color: 'text-orange-500' },
  { icon: FiHeadphones, title: '24/7 Support', desc: 'Always here to help', color: 'text-purple-500' },
]

export default function Home() {
  const [products, setProducts] = useState([])
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeBanner, setActiveBanner] = useState(0)

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts()
      setProducts(data)
      setFeatured(data.slice(0, 4))
      setLoading(false)
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setActiveBanner(b => (b + 1) % banners.length), 4000)
    return () => clearInterval(timer)
  }, [])

  const categories = [
    { name: 'Mobiles', emoji: '📱', color: 'bg-blue-100 text-blue-700' },
    { name: 'Electronics', emoji: '🖥️', color: 'bg-purple-100 text-purple-700' },
    { name: 'Fashion', emoji: '👗', color: 'bg-pink-100 text-pink-700' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 pt-6">
        <div className={`bg-gradient-to-r ${banners[activeBanner].bg} rounded-2xl p-8 md:p-12 text-white relative overflow-hidden transition-all duration-500`}>
          <div className="relative z-10">
            <span className="text-6xl mb-4 block">{banners[activeBanner].emoji}</span>
            <h1 className="text-3xl md:text-5xl font-bold mb-3">{banners[activeBanner].title}</h1>
            <p className="text-lg md:text-xl opacity-90 mb-6">{banners[activeBanner].subtitle}</p>
            <Link to={banners[activeBanner].link}
              className="inline-flex items-center gap-2 bg-white text-gray-800 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors">
              Shop Now <FiArrowRight />
            </Link>
          </div>
          <div className="absolute right-0 top-0 w-64 h-full opacity-10 text-[200px] flex items-center justify-center select-none">
            {banners[activeBanner].emoji}
          </div>
          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, i) => (
              <button key={i} onClick={() => setActiveBanner(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === activeBanner ? 'bg-white w-6' : 'bg-white/50'}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map(f => (
            <div key={f.title} className="card p-4 flex items-center gap-3">
              <f.icon className={`${f.color} shrink-0`} size={24} />
              <div>
                <p className="font-semibold text-sm text-gray-800">{f.title}</p>
                <p className="text-xs text-gray-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 pb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Shop by Category</h2>
        <div className="grid grid-cols-3 gap-4">
          {categories.map(cat => (
            <Link key={cat.name} to={`/products?category=${cat.name}`}
              className={`card p-6 text-center hover:shadow-lg transition-all ${cat.color} border-0`}>
              <span className="text-4xl block mb-2">{cat.emoji}</span>
              <span className="font-semibold">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
          <Link to="/products" className="text-orange-500 hover:text-orange-600 font-medium flex items-center gap-1 text-sm">
            View All <FiArrowRight size={16} />
          </Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="bg-gray-200 h-48 w-full" />
                <div className="p-4 space-y-2">
                  <div className="bg-gray-200 h-3 rounded w-1/3" />
                  <div className="bg-gray-200 h-4 rounded w-full" />
                  <div className="bg-gray-200 h-4 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>

      {/* All Products by Category */}
      {['Mobiles', 'Electronics', 'Fashion'].map(cat => {
        const catProducts = products.filter(p => p.category === cat)
        if (catProducts.length === 0) return null
        return (
          <section key={cat} className="max-w-7xl mx-auto px-4 pb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{cat}</h2>
              <Link to={`/products?category=${cat}`} className="text-orange-500 hover:text-orange-600 font-medium flex items-center gap-1 text-sm">
                View All <FiArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {catProducts.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )
      })}
    </div>
  )
}