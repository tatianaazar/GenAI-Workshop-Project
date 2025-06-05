import { useState } from 'react'
import { useProduct } from './ProductContext.jsx'

export default function SearchProduct({ onResults }) {
  const { searchProducts } = useProduct()
  const [query, setQuery] = useState('')

  function handleSearch(e) {
    const q = e.target.value
    setQuery(q)
    onResults(searchProducts(q))
  }

  return (
    <div style={{ maxWidth: 400, margin: '1rem auto' }}>
      <input
        placeholder="Search products"
        value={query}
        onChange={handleSearch}
        type="text"
      />
    </div>
  )
}