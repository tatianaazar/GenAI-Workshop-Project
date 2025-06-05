import { useProduct } from './ProductContext.jsx'

export default function ProductList({ products }) {
  const { addToCart, products: allProducts } = useProduct()
  const displayProducts = products === null ? allProducts : products

  if (!displayProducts.length) return <p>No products found.</p>

  return (
    <ul className="product-list">
      {displayProducts.map((p) => (
        <li key={p.id}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {p.image && (
              <img src={p.image} alt={p.name} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, border: '1px solid #eee' }} />
            )}
            <span>
              <strong>{p.name}</strong> <span style={{ color: '#888', marginLeft: 8 }}>${p.price.toFixed(2)}</span>
            </span>
          </span>
          <button onClick={() => addToCart(p.id)}>Add to Cart</button>
        </li>
      ))}
    </ul>
  )
}