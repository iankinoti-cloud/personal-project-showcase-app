import { createContext, useContext, useState, useCallback } from 'react'
import useFetch from '../hooks/useFetch'

const API = 'http://localhost:3001'

const ProductsContext = createContext(null)

export function ProductsProvider({ children }) {
  const [refreshKey, setRefreshKey] = useState(0)

  const refresh = useCallback(() => setRefreshKey((k) => k + 1), [])

  const {
    data: products,
    loading,
    error,
  } = useFetch(`${API}/products`, [refreshKey])

  // CREATE
  const createProduct = useCallback(async (productData) => {
    const res = await fetch(`${API}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    })
    if (!res.ok) throw new Error('Failed to create product')
    const created = await res.json()
    refresh()
    return created
  }, [refresh])

  // UPDATE (PATCH)
  const updateProduct = useCallback(async (id, patch) => {
    const res = await fetch(`${API}/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    })
    if (!res.ok) throw new Error('Failed to update product')
    const updated = await res.json()
    refresh()
    return updated
  }, [refresh])

  // DELETE
  const deleteProduct = useCallback(async (id) => {
    const res = await fetch(`${API}/products/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Failed to delete product')
    refresh()
  }, [refresh])

  return (
    <ProductsContext.Provider
      value={{ products, loading, error, createProduct, updateProduct, deleteProduct, refresh }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const ctx = useContext(ProductsContext)
  if (!ctx) throw new Error('useProducts must be used inside ProductsProvider')
  return ctx
}

export default ProductsContext
