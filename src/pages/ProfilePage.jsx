import { useNavigate } from 'react-router-dom'
import { FiHeart, FiShoppingCart, FiUser, FiPackage, FiMapPin, FiLogOut, FiEdit } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import api from '../services/api'

function ProfilePage() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchProfile()
    }, [])

    const fetchProfile = async () => {
        try {
            setLoading(true)
            const response = await api.get('/users/me')
            setUser(response.data)
        } catch {
            console.error('Failed to fetch profile')
            navigate('/login')
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        navigate('/login')
    }

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="font-sans text-gray-500 text-sm tracking-widest">Loading...</p>
        </div>
    )

    return (
        <div>
            {/* Announcement Bar */}
            <div className="bg-black text-white text-center py-3 text-xs md:text-sm font-sans tracking-widest">
                FREE DELIVERY ON ORDERS ABOVE ₹999 &nbsp;|&nbsp; 100% AUTHENTIC JERSEYS
            </div>

            {/* Navbar */}
            <div className="bg-white px-4 md:px-12 py-4 md:py-5 flex items-center justify-between border-b border-gray-200 sticky top-0 z-50">
                <h1 className="font-sans text-black text-2xl md:text-3xl font-semibold tracking-tight cursor-pointer" onClick={() => navigate('/home')}>
                    REAL<span className="font-barlow italic font-semibold text-3xl md:text-4xl">wear</span>
                </h1>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-10">
                    <span className="font-sans text-black text-[1rem] font-bold hover:underline hover:decoration-2 cursor-pointer tracking-wider" onClick={() => navigate('/products?category=clubs')}>CLUB KITS</span>
                    <span className="font-sans text-black text-[1rem] font-bold hover:underline hover:decoration-2 cursor-pointer tracking-wider" onClick={() => navigate('/products?category=nations')}>NATION KITS</span>
                    <span className="font-sans text-black text-[1rem] font-bold hover:underline hover:decoration-2 cursor-pointer tracking-wider" onClick={() => navigate('/products?category=icons')}>ICONS</span>
                    <span className="font-sans text-red-500 text-[1rem] hover:underline hover:decoration-2 font-bold cursor-pointer tracking-wider" onClick={() => navigate('/products')}>SALE</span>
                </div>

                {/* Desktop Icons */}
                <div className="hidden md:flex items-center gap-6">
                    <div className="flex items-center gap-2 border border-gray-300 px-4 py-2 w-48">
                        <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black">
                            <path fillRule="evenodd" clipRule="evenodd" d="M14.0909 6C9.62242 6 6 9.62242 6 14.0909C6 18.5594 9.62242 22.1818 14.0909 22.1818C16.3253 22.1818 18.3473 21.2768 19.812 19.812C21.2768 18.3473 22.1818 16.3253 22.1818 14.0909C22.1818 9.62242 18.5594 6 14.0909 6ZM5 14.0909C5 9.07014 9.07014 5 14.0909 5C19.1117 5 23.1818 9.07014 23.1818 14.0909C23.1818 16.4212 22.3045 18.5474 20.863 20.1559L27.3536 26.6464L26.6464 27.3536L20.1559 20.863C18.5474 22.3045 16.4212 23.1818 14.0909 23.1818C9.07014 23.1818 5 19.1117 5 14.0909Z" fill="currentColor"/>
                        </svg>
                        <input
                            type="text"
                            placeholder="Search"
                            className="outline-none text-sm w-full font-sans placeholder-black"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && e.target.value.trim()) {
                                    navigate(`/products?search=${e.target.value.trim()}`)
                                }
                            }}
                        />
                    </div>
                    <svg onClick={() => navigate('/profile')} className="cursor-pointer" width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.22548 20H22.7744L26.4218 25.7316L25.5781 26.2684L22.2255 21H9.77443L6.42179 26.2684L5.57812 25.7316L9.22548 20Z" fill="currentColor"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M16 17C18.761 17 21 14.761 21 12C21 9.23895 18.761 7 16 7C13.2377 7 11 9.23881 11 12C11 14.7612 13.2377 17 16 17ZM16 18C19.3133 18 22 15.3133 22 12C22 8.68667 19.3133 6 16 6C12.6853 6 9.99996 8.68667 9.99996 12C9.99996 15.3133 12.6853 18 16 18Z" fill="currentColor"/>
                    </svg>
                    <svg onClick={() => navigate('/wishlist')} className="cursor-pointer" width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.7206 6H11.7071L16 10.2929L20.2929 6H25.2794L29.6328 13.0743L16 26.7071L2.36719 13.0743L6.7206 6ZM7.2794 7L3.63281 12.9257L16 25.2929L28.3672 12.9257L24.7206 7H20.7071L16 11.7071L11.2929 7H7.2794Z" fill="currentColor"/>
                    </svg>
                    <svg onClick={() => navigate('/cart')} className="cursor-pointer" width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M21 4H11V8H6V28H26V8H21V4ZM20 9V12H21V9H25V27H7V9H11V12H12V9H20ZM20 8V5H12V8H20Z" fill="currentColor"/>
                    </svg>
                </div>

                {/* Mobile Icons */}
                <div className="flex md:hidden items-center gap-4">
                    <svg onClick={() => navigate('/wishlist')} className="cursor-pointer" width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.7206 6H11.7071L16 10.2929L20.2929 6H25.2794L29.6328 13.0743L16 26.7071L2.36719 13.0743L6.7206 6ZM7.2794 7L3.63281 12.9257L16 25.2929L28.3672 12.9257L24.7206 7H20.7071L16 11.7071L11.2929 7H7.2794Z" fill="currentColor"/>
                    </svg>
                    <svg onClick={() => navigate('/cart')} className="cursor-pointer" width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M21 4H11V8H6V28H26V8H21V4ZM20 9V12H21V9H25V27H7V9H11V12H12V9H20ZM20 8V5H12V8H20Z" fill="currentColor"/>
                    </svg>
                    <button onClick={() => navigate('/home')} className="text-black font-bold text-xl">☰</button>
                </div>
            </div>

            {/* Page Header */}
            <div className="px-4 md:px-12 py-6 md:py-8 border-b border-gray-200">
                <h1 className="font-bebas text-black text-4xl md:text-5xl tracking-wide">MY ACCOUNT</h1>
            </div>

            <div className="px-4 md:px-12 py-6 md:py-10 flex flex-col md:flex-row gap-6 md:gap-12 min-h-screen">

                {/* Left Sidebar */}
                <div className="w-full md:w-64 flex-shrink-0">
                    <div className="border border-gray-200 p-6">
                        <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
                            <FiUser size={28} className="text-white" />
                        </div>
                        <p className="font-sans text-black font-bold text-lg">{user?.name}</p>
                        <p className="font-sans text-gray-500 text-sm mt-1">{user?.email}</p>

                        <div className="mt-8 space-y-1">
                            <div onClick={() => navigate('/orders')} className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-gray-50 rounded">
                                <FiPackage size={16} className="text-gray-500" />
                                <span className="font-sans text-black text-sm">My Orders</span>
                            </div>
                            <div onClick={() => navigate('/wishlist')} className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-gray-50 rounded">
                                <FiHeart size={16} className="text-gray-500" />
                                <span className="font-sans text-black text-sm">Wishlist</span>
                            </div>
                            <div onClick={() => navigate('/addresses')} className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-gray-50 rounded">
                                <FiMapPin size={16} className="text-gray-500" />
                                <span className="font-sans text-black text-sm">Addresses</span>
                            </div>
                            <div onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-red-50 rounded mt-4">
                                <FiLogOut size={16} className="text-red-500" />
                                <span className="font-sans text-red-500 text-sm">Logout</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Content */}
                <div className="flex-1">
                    {/* Personal Info */}
                    <div className="border border-gray-200 p-6 md:p-8 mb-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-bebas text-black text-2xl tracking-wider">PERSONAL INFORMATION</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="font-sans text-gray-500 text-xs tracking-widest mb-1">FULL NAME</p>
                                <p className="font-sans text-black text-sm font-medium">{user?.name}</p>
                            </div>
                            <div>
                                <p className="font-sans text-gray-500 text-xs tracking-widest mb-1">EMAIL ADDRESS</p>
                                <p className="font-sans text-black text-sm font-medium">{user?.email}</p>
                            </div>
                            <div>
                                <p className="font-sans text-gray-500 text-xs tracking-widest mb-1">PHONE NUMBER</p>
                                <p className="font-sans text-black text-sm font-medium">{user?.phone}</p>
                            </div>
                            <div>
                                <p className="font-sans text-gray-500 text-xs tracking-widest mb-1">MEMBER SINCE</p>
                                <p className="font-sans text-black text-sm font-medium">
                                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div onClick={() => navigate('/orders')} className="border border-gray-200 p-6 cursor-pointer hover:border-black transition-all">
                            <FiPackage size={24} className="text-black mb-3" />
                            <p className="font-bebas text-black text-xl tracking-wider">MY ORDERS</p>
                            <p className="font-sans text-gray-500 text-xs mt-1">Track and manage orders</p>
                        </div>
                        <div onClick={() => navigate('/wishlist')} className="border border-gray-200 p-6 cursor-pointer hover:border-black transition-all">
                            <FiHeart size={24} className="text-black mb-3" />
                            <p className="font-bebas text-black text-xl tracking-wider">WISHLIST</p>
                            <p className="font-sans text-gray-500 text-xs mt-1">Your saved jerseys</p>
                        </div>
                        <div onClick={() => navigate('/addresses')} className="border border-gray-200 p-6 cursor-pointer hover:border-black transition-all">
                            <FiMapPin size={24} className="text-black mb-3" />
                            <p className="font-bebas text-black text-xl tracking-wider">ADDRESSES</p>
                            <p className="font-sans text-gray-500 text-xs mt-1">Manage delivery addresses</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Green banner */}
            <div className="bg-[#007CC6] w-full flex items-center justify-center px-6 md:px-20 py-16">
                <div className="text-center">
                    <h2 className="font-bebas text-white text-4xl md:text-6xl tracking-widest">YOUR ACCOUNT.<br/>YOUR GAME.</h2>
                    <p className="text-white font-sans text-base mt-4 opacity-80 tracking-wider">
                        Manage your orders, wishlist and addresses — all in one place.
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-black w-full px-6 md:px-20 py-16">
                <div className="grid grid-cols-2 md:flex md:justify-around gap-8">
                    <div>
                        <h3 className="text-white font-sans font-bold text-[1.1rem] mb-4">JERSEYS</h3>
                        <ul className="space-y-3">
                            <li className="text-white text-sm hover:underline cursor-pointer font-sans" onClick={() => navigate('/products?category=clubs')}>Club Jerseys</li>
                            <li className="text-white text-sm hover:underline cursor-pointer font-sans" onClick={() => navigate('/products?category=nations')}>National Team Jerseys</li>
                            <li className="text-white text-sm hover:underline cursor-pointer font-sans" onClick={() => navigate('/products')}>Sale</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-sans font-bold text-[1.1rem] mb-4">LEAGUES</h3>
                        <ul className="space-y-3">
                            <li className="text-white text-sm hover:underline cursor-pointer font-sans" onClick={() => navigate('/products?league=Premier League')}>Premier League</li>
                            <li className="text-white text-sm hover:underline cursor-pointer font-sans" onClick={() => navigate('/products?league=La Liga')}>La Liga</li>
                            <li className="text-white text-sm hover:underline cursor-pointer font-sans" onClick={() => navigate('/products?league=Serie A')}>Serie A</li>
                            <li className="text-white text-sm hover:underline cursor-pointer font-sans" onClick={() => navigate('/products?league=Bundesliga')}>Bundesliga</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-sans font-bold text-[1.1rem] mb-4">SUPPORT</h3>
                        <ul className="space-y-3">
                            <li className="text-white text-sm hover:underline cursor-pointer font-sans" onClick={() => navigate('/help')}>Help</li>
                            <li className="text-white text-sm hover:underline cursor-pointer font-sans" onClick={() => navigate('/shipping')}>Shipping</li>
                            <li className="text-white text-sm hover:underline cursor-pointer font-sans" onClick={() => navigate('/contact')}>Contact Us</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-sans font-bold text-[1.1rem] mb-4">COMPANY INFO</h3>
                        <ul className="space-y-3">
                            <li className="text-white text-sm hover:underline cursor-pointer font-sans" onClick={() => navigate('/about')}>About Us</li>
                            <li className="text-white text-sm hover:underline cursor-pointer font-sans" onClick={() => navigate('/careers')}>Careers</li>
                            <li className="text-white text-sm hover:underline cursor-pointer font-sans" onClick={() => navigate('/privacy')}>Privacy Policy</li>
                            <li className="text-white text-sm hover:underline cursor-pointer font-sans" onClick={() => navigate('/terms')}>Terms & Conditions</li>
                        </ul>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="text-white font-sans font-bold text-[1.1rem] mb-4">FOLLOW US</h3>
                        <div className="flex gap-4">
                            <a href="https://instagram.com" target="_blank" className="text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                            <a href="https://twitter.com" target="_blank" className="text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white font-sans text-sm">© 2026 Realwear. All rights reserved.</p>
                    <div className="flex gap-6">
                        <span className="text-white text-sm font-sans hover:underline cursor-pointer" onClick={() => navigate('/privacy')}>Privacy Policy</span>
                        <span className="text-white text-sm font-sans hover:underline cursor-pointer" onClick={() => navigate('/terms')}>Terms & Conditions</span>
                        <span className="text-white text-sm font-sans hover:underline cursor-pointer" onClick={() => navigate('/cookies')}>Cookie Settings</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage