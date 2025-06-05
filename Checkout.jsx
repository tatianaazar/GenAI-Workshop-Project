import { useProduct } from './ProductContext.jsx'
import { useState } from 'react'

function generateOrderNumber() {
  return 'ORD-' + Math.floor(100000 + Math.random() * 900000)
}

export default function Checkout({ onBack }) {
  const { cart, checkout } = useProduct()
  const total = cart.reduce((sum, p) => sum + p.price, 0)
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [card, setCard] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [showSummary, setShowSummary] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setOrderNumber(generateOrderNumber())
    setShowSummary(true)
  }

  function handleCancel() {
    setShowSummary(false)
    setOrderNumber('')
  }

  function handleConfirm() {
    checkout()
    setShowSummary(false)
    setOrderNumber('')
    alert('Thank you for your order!')
    if (onBack) onBack()
  }

  if (showSummary) {
    return (
      <div className="card" style={{ maxWidth: 400, margin: '2rem auto', textAlign: 'center' }}>
        <h2>Order Summary</h2>
        <div style={{ marginBottom: 12 }}><strong>Order Number:</strong> {orderNumber}</div>
        <div style={{ marginBottom: 12 }}><strong>Name:</strong> {name}</div>
        <div style={{ marginBottom: 12 }}><strong>Address:</strong> {address}</div>
        <div style={{ marginBottom: 12 }}><strong>Email:</strong> {email}</div>
        <div style={{ marginBottom: 12 }}><strong>Phone:</strong> {phone}</div>
        <div style={{ marginBottom: 12 }}><strong>Payment:</strong> Card ending in {card.slice(-4)}, Exp: {expiry}</div>
        <div style={{ marginBottom: 12 }}><strong>Items:</strong>
          <ul style={{ textAlign: 'left', margin: '0.5rem 0' }}>
            {cart.map((p, i) => (
              <li key={i}>{p.name} - ${p.price.toFixed(2)}</li>
            ))}
          </ul>
        </div>
        <div style={{ marginBottom: 16 }}><strong>Total:</strong> ${total.toFixed(2)}</div>
        <button style={{ width: '100%', marginBottom: 8 }} onClick={handleConfirm}>Confirm Order</button>
        <button type="button" className="link-btn" style={{ width: '100%' }} onClick={handleCancel}>Cancel Order</button>
      </div>
    )
  }

  return (
    <form className="card" style={{ maxWidth: 400, margin: '2rem auto' }} onSubmit={handleSubmit}>
      <h2>Checkout</h2>
      <div style={{ marginBottom: 16 }}>
        <strong>Total:</strong> ${total.toFixed(2)}
      </div>
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Shipping Address"
        value={address}
        onChange={e => setAddress(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="tel"
        placeholder="Phone Number"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        required
      />
      <h3 style={{ margin: '1.5rem 0 0.5rem 0', textAlign: 'left' }}>Payment Details</h3>
      <input
        type="text"
        placeholder="Card Number"
        value={card}
        onChange={e => setCard(e.target.value)}
        required
        maxLength={19}
      />
      <input
        type="text"
        placeholder="Expiry (MM/YY)"
        value={expiry}
        onChange={e => setExpiry(e.target.value)}
        required
        maxLength={5}
      />
      <input
        type="text"
        placeholder="CVV"
        value={cvv}
        onChange={e => setCvv(e.target.value)}
        required
        maxLength={4}
      />
      <button type="submit" style={{ width: '100%' }}>Confirm Order</button>
      <button type="button" className="link-btn" style={{ width: '100%' }} onClick={onBack}>Back to Cart</button>
    </form>
  )
}
