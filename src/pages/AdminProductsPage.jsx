import { useNavigate } from 'react-router-dom'
import { FiLogOut, FiTrash2, FiEdit2, FiPlus, FiX } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import api from '../services/api'

function AdminProductsPage() {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [deletingId, setDeletingId] = useState(null)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [imageFile, setImageFile] = useState(null)

    const [form, setForm] = useState({
        name: '', description: '', price: '', team: '', league: '', brand: ''
    })

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const response = await api.get('/products')
            setProducts(response.data)
        } catch {
            console.error('Failed to fetch products')
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async () => {
        if (!form.name || !form.price || !form.team || !form.league || !form.brand) {
            setError('Please fill all required fields')
            return
        }
        try {
            setSaving(true)
            setError('')
            if (editingProduct) {
                await api.put(`/products/${editingProduct.id}`, { ...form, price: parseFloat(form.price) })
                if (imageFile && imageFile.length > 0) {
                    for (let i = 0; i < imageFile.length; i++) {
                        const formData = new FormData()
                        formData.append('file', imageFile[i])
                        formData.append('isPrimary', i === 0)
                        await api.post(`/images/product/${editingProduct.id}`, formData, {
                            headers: { 'Content-Type': 'multipart/form-data' }
                        })
                    }
                }
            } else {
                const res = await api.post('/products', { ...form, price: parseFloat(form.price) })
                if (imageFile && imageFile.length > 0) {
                    for (let i = 0; i < imageFile.length; i++) {
                        const formData = new FormData()
                        formData.append('file', imageFile[i])
                        formData.append('isPrimary', i === 0)
                        await api.post(`/images/product/${res.data.id}`, formData, {
                            headers: { 'Content-Type': 'multipart/form-data' }
                        })
                    }
                }
            }
            fetchProducts()
            resetForm()
        } catch {
            setError('Failed to save product')
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this product?')) return
        try {
            setDeletingId(id)
            await api.delete(`/products/${id}`)
            fetchProducts()
        } catch {
            console.error('Failed to delete product')
        } finally {
            setDeletingId(null)
        }
    }

    const handleEdit = (product) => {
        setEditingProduct(product)
        setForm({
            name: product.name,
            description: product.description || '',
            price: product.price,
            team: product.team,
            league: product.league,
            brand: product.brand
        })
        setShowForm(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const resetForm = () => {
        setForm({ name: '', description: '', price: '', team: '', league: '', brand: '' })
        setEditingProduct(null)
        setShowForm(false)
        setError('')
        setImageFile(null)
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        navigate('/login')
    }

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Admin Navbar */}
            <div className="bg-black px-12 py-5 flex items-center justify-between sticky top-0 z-50">
                <h1 className="font-sans text-white text-2xl font-semibold tracking-tight cursor-pointer" onClick={() => navigate('/admin')}>
                    REAL<span className="font-barlow italic font-semibold relative -top-1 text-3xl">wear</span>
                    <span className="font-sans text-gray-400 text-sm ml-4 tracking-widest">ADMIN</span>
                </h1>
                <div className="flex items-center gap-8">
                    <span className="font-sans text-gray-300 text-sm cursor-pointer hover:text-white" onClick={() => navigate('/admin')}>Dashboard</span>
                    <span className="font-sans text-white text-sm border-b border-white">Products</span>
                    <span className="font-sans text-gray-300 text-sm cursor-pointer hover:text-white" onClick={() => navigate('/admin/orders')}>Orders</span>
                    <span className="font-sans text-gray-300 text-sm cursor-pointer hover:text-white" onClick={() => navigate('/admin/users')}>Users</span>
                    <button onClick={handleLogout} className="flex items-center gap-2 text-gray-300 hover:text-white text-sm font-sans">
                        <FiLogOut size={16} /> Logout
                    </button>
                </div>
            </div>

            <div className="px-12 py-10">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="font-bebas text-black text-4xl tracking-wider">MANAGE PRODUCTS</h1>
                        <p className="font-sans text-gray-500 text-sm mt-1">{products.length} total products</p>
                    </div>
                    <button
                        onClick={() => { resetForm(); setShowForm(true) }}
                        className="flex items-center gap-2 bg-black text-white font-sans text-sm tracking-widest px-6 py-3 hover:bg-gray-800"
                    >
                        <FiPlus size={16} /> ADD PRODUCT
                    </button>
                </div>

                {/* Add/Edit Form */}
                {showForm && (
                    <div className="bg-white border border-gray-200 p-8 mb-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-bebas text-black text-2xl tracking-wider">
                                {editingProduct ? 'EDIT PRODUCT' : 'ADD NEW PRODUCT'}
                            </h2>
                            <button onClick={resetForm} className="text-gray-400 hover:text-black">
                                <FiX size={20} />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="font-sans text-xs text-gray-500 tracking-widest">NAME *</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full border border-gray-300 px-4 py-3 mt-1 font-sans text-sm focus:outline-none focus:border-black"
                                    placeholder="Product name"
                                />
                            </div>
                            <div>
                                <label className="font-sans text-xs text-gray-500 tracking-widest">PRICE *</label>
                                <input
                                    type="number"
                                    value={form.price}
                                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                                    className="w-full border border-gray-300 px-4 py-3 mt-1 font-sans text-sm focus:outline-none focus:border-black"
                                    placeholder="Price in ₹"
                                />
                            </div>
                            <div>
                                <label className="font-sans text-xs text-gray-500 tracking-widest">TEAM *</label>
                                <input
                                    type="text"
                                    value={form.team}
                                    onChange={(e) => setForm({ ...form, team: e.target.value })}
                                    className="w-full border border-gray-300 px-4 py-3 mt-1 font-sans text-sm focus:outline-none focus:border-black"
                                    placeholder="Team name"
                                />
                            </div>
                            <div>
                                <label className="font-sans text-xs text-gray-500 tracking-widest">LEAGUE *</label>
                                <input
                                    type="text"
                                    value={form.league}
                                    onChange={(e) => setForm({ ...form, league: e.target.value })}
                                    className="w-full border border-gray-300 px-4 py-3 mt-1 font-sans text-sm focus:outline-none focus:border-black"
                                    placeholder="League name"
                                />
                            </div>
                            <div>
                                <label className="font-sans text-xs text-gray-500 tracking-widest">BRAND *</label>
                                <input
                                    type="text"
                                    value={form.brand}
                                    onChange={(e) => setForm({ ...form, brand: e.target.value })}
                                    className="w-full border border-gray-300 px-4 py-3 mt-1 font-sans text-sm focus:outline-none focus:border-black"
                                    placeholder="Brand name"
                                />
                            </div>
                            <div>
                                <label className="font-sans text-xs text-gray-500 tracking-widest">DESCRIPTION</label>
                                <input
                                    type="text"
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    className="w-full border border-gray-300 px-4 py-3 mt-1 font-sans text-sm focus:outline-none focus:border-black"
                                    placeholder="Product description"
                                />
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="mt-4">
                            <label className="font-sans text-xs text-gray-500 tracking-widest">
                                {editingProduct ? 'UPDATE IMAGE (optional)' : 'PRODUCT IMAGE'}
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(e) => setImageFile(e.target.files)}
                                className="w-full border border-gray-300 px-4 py-3 mt-1 font-sans text-sm focus:outline-none focus:border-black"
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={handleSubmit}
                                disabled={saving}
                                className="bg-black text-white font-sans text-sm tracking-widest px-8 py-3 hover:bg-gray-800 disabled:opacity-50"
                            >
                                {saving ? 'SAVING...' : editingProduct ? 'UPDATE PRODUCT' : 'SAVE PRODUCT'}
                            </button>
                            <button
                                onClick={resetForm}
                                className="border border-black text-black font-sans text-sm tracking-widest px-8 py-3 hover:bg-black hover:text-white"
                            >
                                CANCEL
                            </button>
                        </div>
                    </div>
                )}

                {/* Products Table */}
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <p className="font-sans text-gray-500 text-sm">Loading products...</p>
                    </div>
                ) : (
                    <div className="bg-white border border-gray-200">
                        <div className="grid grid-cols-7 gap-4 px-6 py-3 border-b border-gray-200 bg-gray-50">
                            <p className="font-sans text-gray-500 text-xs tracking-widest">IMAGE</p>
                            <p className="font-sans text-gray-500 text-xs tracking-widest col-span-2">NAME</p>
                            <p className="font-sans text-gray-500 text-xs tracking-widest">LEAGUE</p>
                            <p className="font-sans text-gray-500 text-xs tracking-widest">BRAND</p>
                            <p className="font-sans text-gray-500 text-xs tracking-widest">PRICE</p>
                            <p className="font-sans text-gray-500 text-xs tracking-widest">ACTIONS</p>
                        </div>

                        {products.map((product) => (
                            <div key={product.id} className="grid grid-cols-7 gap-4 px-6 py-4 border-b border-gray-100 items-center">
                                <div className="w-12 h-12 bg-gray-100 overflow-hidden">
                                    {product.images && product.images.length > 0 ? (
                                        <img
                                            src={product.images.find(i => i.isPrimary)?.imageUrl || product.images[0].imageUrl}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <span className="text-gray-300 text-xs">No img</span>
                                        </div>
                                    )}
                                </div>
                                <p className="font-sans text-black text-sm font-medium col-span-2">{product.name}</p>
                                <p className="font-sans text-gray-500 text-sm">{product.league}</p>
                                <p className="font-sans text-gray-500 text-sm">{product.brand}</p>
                                <p className="font-sans text-black text-sm font-medium">₹{product.price?.toLocaleString()}</p>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => handleEdit(product)} className="text-gray-400 hover:text-black">
                                        <FiEdit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        disabled={deletingId === product.id}
                                        className="text-gray-400 hover:text-red-500 disabled:opacity-30"
                                    >
                                        <FiTrash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminProductsPage