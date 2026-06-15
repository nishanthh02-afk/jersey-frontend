import { useNavigate } from 'react-router-dom'
import { FiLogOut, FiTrash2 } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import api from '../services/api'

function AdminUsersPage() {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [deletingId, setDeletingId] = useState(null)

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            setLoading(true)
            const response = await api.get('/admin/users')
            setUsers(response.data)
        } catch {
            console.error('Failed to fetch users')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return
        try {
            setDeletingId(userId)
            await api.delete(`/admin/users/${userId}`)
            fetchUsers()
        } catch {
            console.error('Failed to delete user')
        } finally {
            setDeletingId(null)
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
            <div className="bg-black px-12 py-5 flex items-center justify-between sticky top-0 z-50">
                <h1 className="font-sans text-white text-2xl font-semibold tracking-tight cursor-pointer" onClick={() => navigate('/admin')}>
                    REAL<span className="font-barlow italic font-semibold relative -top-1 text-3xl">wear</span>
                    <span className="font-sans text-gray-400 text-sm ml-4 tracking-widest">ADMIN</span>
                </h1>
                <div className="flex items-center gap-8">
                    <span className="font-sans text-gray-300 text-sm cursor-pointer hover:text-white" onClick={() => navigate('/admin')}>Dashboard</span>
                    <span className="font-sans text-gray-300 text-sm cursor-pointer hover:text-white" onClick={() => navigate('/admin/products')}>Products</span>
                    <span className="font-sans text-gray-300 text-sm cursor-pointer hover:text-white" onClick={() => navigate('/admin/orders')}>Orders</span>
                    <span className="font-sans text-white text-sm border-b border-white">Users</span>
                    <button onClick={handleLogout} className="flex items-center gap-2 text-gray-300 hover:text-white text-sm font-sans">
                        <FiLogOut size={16} /> Logout
                    </button>
                </div>
            </div>

            <div className="px-12 py-10">
                <h1 className="font-bebas text-black text-4xl tracking-wider mb-2">MANAGE USERS</h1>
                <p className="font-sans text-gray-500 text-sm mb-8">{users.length} total users</p>

                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <p className="font-sans text-gray-500 text-sm">Loading users...</p>
                    </div>
                ) : (
                    <div className="bg-white border border-gray-200">
                        {/* Table Header */}
                        <div className="grid grid-cols-6 gap-4 px-6 py-3 border-b border-gray-200 bg-gray-50">
                            <p className="font-sans text-gray-500 text-xs tracking-widest">ID</p>
                            <p className="font-sans text-gray-500 text-xs tracking-widest">NAME</p>
                            <p className="font-sans text-gray-500 text-xs tracking-widest">EMAIL</p>
                            <p className="font-sans text-gray-500 text-xs tracking-widest">PHONE</p>
                            <p className="font-sans text-gray-500 text-xs tracking-widest">ROLE</p>
                            <p className="font-sans text-gray-500 text-xs tracking-widest">ACTION</p>
                        </div>

                        {/* Table Rows */}
                        {users.map((user) => (
                            <div key={user.id} className="grid grid-cols-6 gap-4 px-6 py-4 border-b border-gray-100 items-center">
                                <p className="font-sans text-black text-sm">#{user.id}</p>
                                <p className="font-sans text-black text-sm font-medium">{user.name}</p>
                                <p className="font-sans text-gray-500 text-sm">{user.email}</p>
                                <p className="font-sans text-gray-500 text-sm">{user.phone}</p>
                                <span className={`font-sans text-xs font-medium px-2 py-1 w-fit rounded-full ${
                                    user.role === 'ADMIN' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'
                                }`}>
                                    {user.role}
                                </span>
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    disabled={deletingId === user.id || user.role === 'ADMIN'}
                                    className="flex items-center gap-1 text-gray-400 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-sans w-fit"
                                >
                                    <FiTrash2 size={14} />
                                    {deletingId === user.id ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminUsersPage