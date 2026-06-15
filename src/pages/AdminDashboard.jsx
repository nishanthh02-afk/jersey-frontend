import { useNavigate } from 'react-router-dom'
import { FiUsers, FiPackage, FiShoppingBag, FiDollarSign, FiLogOut, FiSettings } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import api from '../services/api'

function AdminDashboard() {
    const navigate = useNavigate()
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalOrders: 0,
        totalProducts: 0,
        totalRevenue: 0
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchStats()
    }, [])

    const fetchStats = async () => {
        try {
            setLoading(true)
            const response = await api.get('/admin/dashboard')
            setStats({
                totalUsers: response.data.totalUsers,
                totalOrders: response.data.totalOrders,
                totalProducts: response.data.totalProducts,
                totalRevenue: response.data.totalRevenue
            })
        } catch {
            console.error('Failed to fetch stats')
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        navigate('/login')
    }

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Admin Navbar */}
            <div className="bg-black px-12 py-5 flex items-center justify-between">
                <h1 className="font-sans text-white text-2xl font-semibold tracking-tight">
                    REAL<span className="font-barlow italic font-semibold relative -top-1 text-3xl">wear</span>
                    <span className="font-sans text-gray-400 text-sm ml-4 tracking-widest">ADMIN</span>
                </h1>
                <div className="flex items-center gap-8">
                    <span className="font-sans text-gray-300 text-sm cursor-pointer hover:text-white" onClick={() => navigate('/admin')}>Dashboard</span>
                    <span className="font-sans text-gray-300 text-sm cursor-pointer hover:text-white" onClick={() => navigate('/admin/products')}>Products</span>
                    <span className="font-sans text-gray-300 text-sm cursor-pointer hover:text-white" onClick={() => navigate('/admin/orders')}>Orders</span>
                    <span className="font-sans text-gray-300 text-sm cursor-pointer hover:text-white" onClick={() => navigate('/admin/users')}>Users</span>
                    <button onClick={handleLogout} className="flex items-center gap-2 text-gray-300 hover:text-white text-sm font-sans">
                        <FiLogOut size={16} /> Logout
                    </button>
                </div>
            </div>

            {/* Page Content */}
            <div className="px-12 py-10">
                <h1 className="font-bebas text-black text-4xl tracking-wider mb-2">DASHBOARD</h1>
                <p className="font-sans text-gray-500 text-sm mb-10">Welcome back, Admin</p>

                {/* Stats Cards */}
                <div className="grid grid-cols-4 gap-6 mb-12">
                    <div className="bg-white border border-gray-200 p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-sans text-gray-500 text-xs tracking-widest">TOTAL USERS</p>
                                <p className="font-bebas text-black text-4xl mt-2">{loading ? '...' : stats.totalUsers}</p>
                            </div>
                            <FiUsers size={24} className="text-gray-400" />
                        </div>
                        <p className="font-sans text-gray-400 text-xs mt-4 cursor-pointer hover:text-black underline" onClick={() => navigate('/admin/users')}>View all users →</p>
                    </div>

                    <div className="bg-white border border-gray-200 p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-sans text-gray-500 text-xs tracking-widest">TOTAL ORDERS</p>
                                <p className="font-bebas text-black text-4xl mt-2">{loading ? '...' : stats.totalOrders}</p>
                            </div>
                            <FiPackage size={24} className="text-gray-400" />
                        </div>
                        <p className="font-sans text-gray-400 text-xs mt-4 cursor-pointer hover:text-black underline" onClick={() => navigate('/admin/orders')}>View all orders →</p>
                    </div>

                    <div className="bg-white border border-gray-200 p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-sans text-gray-500 text-xs tracking-widest">TOTAL PRODUCTS</p>
                                <p className="font-bebas text-black text-4xl mt-2">{loading ? '...' : stats.totalProducts}</p>
                            </div>
                            <FiShoppingBag size={24} className="text-gray-400" />
                        </div>
                        <p className="font-sans text-gray-400 text-xs mt-4 cursor-pointer hover:text-black underline" onClick={() => navigate('/admin/products')}>Manage products →</p>
                    </div>

                    <div className="bg-white border border-gray-200 p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-sans text-gray-500 text-xs tracking-widest">TOTAL REVENUE</p>
                                <p className="font-bebas text-black text-4xl mt-2">{loading ? '...' : `₹${stats.totalRevenue?.toLocaleString()}`}</p>
                            </div>
                            <FiDollarSign size={24} className="text-gray-400" />
                        </div>
                        <p className="font-sans text-gray-400 text-xs mt-4">From delivered orders</p>
                    </div>
                </div>

                {/* Quick Actions */}
                <h2 className="font-bebas text-black text-2xl tracking-wider mb-4">QUICK ACTIONS</h2>
                <div className="grid grid-cols-3 gap-6">
                    <div
                        onClick={() => navigate('/admin/products')}
                        className="bg-white border border-gray-200 p-6 cursor-pointer hover:border-black transition-all"
                    >
                        <FiShoppingBag size={24} className="text-black mb-3" />
                        <p className="font-bebas text-black text-xl tracking-wider">MANAGE PRODUCTS</p>
                        <p className="font-sans text-gray-500 text-xs mt-1">Add, edit or delete products</p>
                    </div>
                    <div
                        onClick={() => navigate('/admin/orders')}
                        className="bg-white border border-gray-200 p-6 cursor-pointer hover:border-black transition-all"
                    >
                        <FiPackage size={24} className="text-black mb-3" />
                        <p className="font-bebas text-black text-xl tracking-wider">MANAGE ORDERS</p>
                        <p className="font-sans text-gray-500 text-xs mt-1">View and update order status</p>
                    </div>
                    <div
                        onClick={() => navigate('/admin/users')}
                        className="bg-white border border-gray-200 p-6 cursor-pointer hover:border-black transition-all"
                    >
                        <FiUsers size={24} className="text-black mb-3" />
                        <p className="font-bebas text-black text-xl tracking-wider">MANAGE USERS</p>
                        <p className="font-sans text-gray-500 text-xs mt-1">View and manage customers</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard