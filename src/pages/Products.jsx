import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getProducts } from '../services/api'
import ProductCard from '../components/ProductCard'
import { FiFilter, FiX } from 'react-icons/fi'

const categories = ['All', 'Mobiles', 'Electronics', 'Fashion']
const sortOptions = [
  { label: 'Relevance', value: '' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Rating', value: 'rating_desc' },
]

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState('')
  const [showFilter, setShowFilter] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 200000])

  const category = searchParams.get('category') || 'All'
  const search = searchParams.get('search') || ''

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      const params = {}
      if (category && category !== 'All') params.category = category
      if (search) params.search = search
      if (sort) {
        const [field, order] = sort.split('_')
        params._sort = field
        params._order = order
      }
      const data = await getProducts(params)
      const filtered = data.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
      setProducts(filtered)
      setLoading(false)
    }
    fetchProducts()
  }, [category, search, sort, priceRange])

  const setCategory = (cat) => {
    if (cat === 'All') setSearchParams({})
    else setSearchParams({ category: cat })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Filters */}
        <aside className={`${showFilter ? 'block' : 'hidden'} md:block w-full md:w-56 shrink-0`}>
          <div className="card p-4 sticky top-20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800">Filters</h3>
              <button className="md:hidden text-gray-500" onClick={() => setShowFilter(false)}><FiX /></button>
            </div>

            {/* Category */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Category</p>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors mb-1 ${
                    (cat === 'All' && !searchParams.get('category')) || cat === category
                      ? 'bg-orange-500 text-white font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Max Price</p>
              <input
                type="range"
                min={0}
                max={200000}
                step={1000}
                value={priceRange[1]}
                onChange={e => setPriceRange([0, Number(e.target.value)])}
                className="w-full accent-orange-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹0</span>
                <span className="font-semibold text-orange-500">₹{priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                {search ? `Results for "${search}"` : category !== 'All' ? category : 'All Products'}
              </h1>
              <p className="text-sm text-gray-500">{products.length} products found</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="md:hidden flex items-center gap-1 btn-secondary text-sm py-1.5 px-3"
                onClick={() => setShowFilter(!showFilter)}>
                <FiFilter size={14} /> Filter
              </button>
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="input-field w-auto text-sm"
              >
                {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="bg-gray-200 h-48" />
                  <div className="p-4 space-y-2">
                    <div className="bg-gray-200 h-3 rounded w-1/3" />
                    <div className="bg-gray-200 h-4 rounded" />
                    <div className="bg-gray-200 h-4 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <span className="text-6xl block mb-4">🔍</span>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-500">Try a different search or category</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}