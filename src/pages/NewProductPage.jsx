import { useNavigate } from 'react-router-dom'
import { useProducts } from '../context/ProductsContext'
import ProductForm from '../components/ProductForm/ProductForm'
import './NewProductPage.css'

function NewProductPage() {
  const { createProduct } = useProducts()
  const navigate = useNavigate()

  const handleSubmit = async (payload) => {
    const newProduct = await createProduct({
      ...payload,
      createdAt: new Date().toISOString().split('T')[0],
    })
    navigate(`/products/${newProduct.id}`)
  }

  return (
    <div className="new-product-page">
      <div className="new-product-header">
        <h1 className="page-title">Add New Product</h1>
        <p className="page-subtitle">Fill in the details below to add a new item to the PixelGear catalogue.</p>
      </div>
      <div className="new-product-card">
        <ProductForm onSubmit={handleSubmit} submitLabel="Create Product" />
      </div>
    </div>
  )
}

export default NewProductPage
