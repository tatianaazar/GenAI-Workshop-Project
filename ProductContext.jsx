import { createContext, useContext, useState } from 'react'

const ProductContext = createContext()

let globalProducts = [] // Persist products across provider unmounts

export function useProduct() {
  return useContext(ProductContext)
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(globalProducts)
  const [cart, setCart] = useState([])

  function addProduct(product) {
    globalProducts = [...globalProducts, { ...product, id: Date.now() }]
    setProducts(globalProducts)
  }

  function searchProducts(query) {
    return products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    )
  }

  function addToCart(productId) {
    const product = products.find((p) => p.id === productId)
    if (product) setCart((prev) => [...prev, product])
  }

  function checkout() {
    setCart([])
    alert('Checkout successful!')
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        cart,
        addProduct,
        searchProducts,
        addToCart,
        checkout,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}
