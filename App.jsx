import { useState } from 'react'
import { ProductProvider } from './ProductContext.jsx'
import AddProduct from './AddProduct.jsx'
import SearchProduct from './SearchProduct.jsx'
import ProductList from './ProductList.jsx'
import Cart from './Cart.jsx'
import Login from './Login.jsx'

function App() {
  const [searchResults, setSearchResults] = useState(null)
  const [page, setPage] = useState('products') // 'products', 'cart', 'add'
  const [user, setUser] = useState(null)

  if (!user) {
    return <Login onLogin={u => {
      setUser(u)
      setPage('products')
    }} />
  }

  return (
    <ProductProvider>
      <nav>
        <span style={{ marginRight: 16 }}>Welcome, {user}!</span>
        <button onClick={() => setPage('products')}>Available Products</button>
        <button onClick={() => setPage('cart')}>Your Cart</button>
        {user === 'admin' && <button onClick={() => setPage('add')}>Add Product</button>}
      </nav>
      {page === 'products' && (
        <>
          <h1>Available Products</h1>
          <SearchProduct onResults={results => setSearchResults(results && results.length ? results : null)} />
          <ProductList products={searchResults} />
        </>
      )}
      {page === 'cart' && (
        <>
          <h1>Your Cart</h1>
          <Cart />
        </>
      )}
      {page === 'add' && user === 'admin' && (
        <>
          <h1>Add Product</h1>
          <AddProduct />
        </>
      )}
    </ProductProvider>
  )
}

export default App