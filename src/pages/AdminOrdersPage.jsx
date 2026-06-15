import { useNavigate } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import api from '../services/api'

function AdminOrdersPage() {
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [updatingId, setUpdatingId] = useState(null)

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        try {
            setLoading(true)
            const response = await api.get('/admin/orders')
            setOrders(response.data)
        } catch {
            console.error('Failed to fetch orders')
        } finally {
            setLoading(false)
        }
    }

    const updateStatus = async (orderId, status) => {
        try {
            setUpdatingId(orderId)
            await api.put(`/admin/orders/${orderId}/status?status=${status}`)
            fetchOrders()
        } catch {
            console.error('Failed to update status')
        } finally {
            setUpdatingId(null)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        navigate('/login')
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'PENDING': return 'text-yellow-600 bg-yellow-50'
            case 'CONFIRMED': return 'text-blue-600 bg-blue-50'
            case 'SHIPPED': return 'text-purple-600 bg-purple-50'
            case 'DELIVERED': return 'text-green-600 bg-green-50'
            case 'CANCELLED': return 'text-red-600 bg-red-50'
            default: return 'text-gray-600 bg-gray-50'
        }
    }

    const statusOptions = ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED']

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
                    <span className="font-sans text-gray-300 text-sm cursor-pointer hover:text-white" onClick={() => navigate('/admin/products')}>Products</span>
                    <span className="font-sans text-gray-300 text-sm cursor-pointer hover:text-white text-white border-b border-white">Orders</span>
                    <span className="font-sans text-gray-300 text-sm cursor-pointer hover:text-white" onClick={() => navigate('/admin/users')}>Users</span>
                    <button onClick={handleLogout} className="flex items-center gap-2 text-gray-300 hover:text-white text-sm font-sans">
                        <FiLogOut size={16} /> Logout
                    </button>
                </div>
            </div>

            <div className="px-12 py-10">
                <h1 className="font-bebas text-black text-4xl tracking-wider mb-2">MANAGE ORDERS</h1>
                <p className="font-sans text-gray-500 text-sm mb-8">{orders.length} total orders</p>

                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <p className="font-sans text-gray-500 text-sm">Loading orders...</p>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="flex items-center justify-center h-64">
                        <p className="font-sans text-gray-500 text-sm">No orders yet</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white border border-gray-200 p-6">
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-12">
                                        <div>
                                            <p className="font-sans text-gray-500 text-xs tracking-widest">ORDER ID</p>
                                            <p className="font-sans text-black font-bold text-sm mt-0.5">#{order.id}</p>
                                        </div>
                                        <div>
                                            <p className="font-sans text-gray-500 text-xs tracking-widest">CUSTOMER</p>
                                            <p className="font-sans text-black text-sm mt-0.5">{order.customerName}</p>
                                        </div>
                                        <div>
                                            <p className="font-sans text-gray-500 text-xs tracking-widest">TOTAL</p>
                                            <p className="font-sans text-black font-bold text-sm mt-0.5">₹{order.totalAmount?.toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p className="font-sans text-gray-500 text-xs tracking-widest">DATE</p>
                                            <p className="font-sans text-black text-sm mt-0.5">
                                                {new Date(order.createdAt).toLocaleDateString('en-IN')}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="font-sans text-gray-500 text-xs tracking-widest mb-1">STATUS</p>
                                            <span className={`font-sans text-xs font-medium px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Update Status */}
                                    <div className="flex items-center gap-3">
                                        <select
                                            value={order.status}
                                            onChange={(e) => updateStatus(order.id, e.target.value)}
                                            disabled={updatingId === order.id}
                                            className="border border-gray-300 font-sans text-sm px-3 py-2 focus:outline-none focus:border-black disabled:opacity-50"
                                        >
                                            {statusOptions.map(s => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Order Items */}
                                {order.items && order.items.length > 0 && (
                                    <div className="border-t border-gray-100 mt-4 pt-4">
                                        <p className="font-sans text-gray-500 text-xs tracking-widest mb-2">ITEMS</p>
                                        <div className="space-y-1">
                                            {order.items.map((item, index) => (
                                                <p key={index} className="font-sans text-black text-sm">
                                                    {item.productName} — Size: {item.size} × {item.quantity} — ₹{item.totalPrice?.toLocaleString()}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminOrdersPage