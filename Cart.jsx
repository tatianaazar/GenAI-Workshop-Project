import { useProduct } from './ProductContext.jsx'

export default function Cart({ onCheckout }) {
  const { cart } = useProduct()
  const total = cart.reduce((sum, p) => sum + p.price, 0)

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((p, i) => (
              <li key={i}>
                <span>
                  <strong>{p.name}</strong> <span style={{ color: '#888', marginLeft: 8 }}>${p.price.toFixed(2)}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="total">Total: ${total.toFixed(2)}</p>
          <button onClick={onCheckout}>Proceed to Checkout</button>
        </>
      )}
    </div>
  )
}