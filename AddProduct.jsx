import { useState } from 'react'
import { useProduct } from './ProductContext.jsx'

export default function AddProduct() {
  const { addProduct } = useProduct()
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)

  function handleImageChange(e) {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    } else {
      setImage(null)
      setPreview(null)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!name || !price) return
    let imageUrl = ''
    if (image) {
      imageUrl = preview // For demo: use object URL. In real app, upload to server or cloud.
    }
    addProduct({ name, price: parseFloat(price), image: imageUrl })
    setName('')
    setPrice('')
    setImage(null)
    setPreview(null)
  }

  return (
    <form onSubmit={handleSubmit} className="card" style={{ maxWidth: 420, margin: '2rem auto', boxShadow: '0 4px 24px rgba(79,70,229,0.08)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24, color: 'var(--primary)' }}>Add New Product</h2>
      <div style={{ marginBottom: 18 }}>
        <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Product Name</label>
        <input
          placeholder="Product name"
          value={name}
          onChange={e => setName(e.target.value)}
          type="text"
        />
      </div>
      <div style={{ marginBottom: 18 }}>
        <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Price</label>
        <input
          placeholder="Price"
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
          min="0"
          step="0.01"
        />
      </div>
      <div style={{ marginBottom: 18 }}>
        <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Product Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginBottom: preview ? 12 : 0 }}
        />
        {preview && (
          <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: 140, marginTop: 8, borderRadius: 10, border: '1px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }} />
        )}
      </div>
      <button type="submit" style={{ width: '100%', marginTop: 10, fontSize: '1.1rem', letterSpacing: 0.5 }}>Add Product</button>
    </form>
  )
}