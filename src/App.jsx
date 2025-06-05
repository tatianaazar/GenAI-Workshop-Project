import { useState } from 'react'
import { ProductProvider } from '../ProductContext.jsx'
import AddProduct from '../AddProduct.jsx'
import SearchProduct from '../SearchProduct.jsx'
import ProductList from '../ProductList.jsx'
import Cart from '../Cart.jsx'
import Login from '../Login.jsx'
import Checkout from '../Checkout.jsx'
import './App.css'

function App() {
  const [searchResults, setSearchResults] = useState(null)
  const [page, setPage] = useState('products') // 'products', 'cart', 'add', 'checkout'
  const [user, setUser] = useState(null)
  const [showMenu, setShowMenu] = useState(false)

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
        <div style={{ position: 'absolute', right: 32, top: 24 }}>
          <button
            style={{ background: 'var(--primary-dark)', color: '#fff', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 600, cursor: 'pointer' }}
            onClick={() => setShowMenu(m => !m)}
            id="user-menu-btn"
          >
            Menu ▾
          </button>
          {showMenu && (
            <div style={{ position: 'absolute', right: 0, top: '2.5rem', background: '#fff', border: '1px solid var(--border)', borderRadius: 8, boxShadow: 'var(--shadow)', minWidth: 140, zIndex: 10 }}>
              <button
                style={{ width: '100%', background: 'none', color: 'var(--primary)', border: 'none', padding: '0.7rem 1rem', textAlign: 'left', cursor: 'pointer', borderRadius: 8 }}
                onClick={() => { setUser(null); setShowMenu(false); }}
              >
                Change User
              </button>
            </div>
          )}
        </div>
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
          <Cart onCheckout={() => setPage('checkout')} />
        </>
      )}
      {page === 'add' && user === 'admin' && (
        <>
          <h1>Add Product</h1>
          <AddProduct />
        </>
      )}
      {page === 'checkout' && (
        <Checkout onBack={() => setPage('cart')} />
      )}
    </ProductProvider>
  )
}

export default App