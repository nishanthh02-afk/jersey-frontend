import { useNavigate } from 'react-router-dom'
import { FiHeart, FiShoppingCart, FiUser, FiCheck } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import api from '../services/api'

function CheckoutPage() {
    const navigate = useNavigate()
    const [cart, setCart] = useState(null)
    const [addresses, setAddresses] = useState([])
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [loading, setLoading] = useState(true)
    const [placing, setPlacing] = useState(false)
    const [error, setError] = useState('')
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            setLoading(true)
            const [cartRes, addressRes] = await Promise.all([
                api.get('/cart'),
                api.get('/addresses')
            ])
            setCart(cartRes.data)
            setAddresses(addressRes.data)
            const defaultAddress = addressRes.data.find(a => a.isDefault)
            if (defaultAddress) setSelectedAddress(defaultAddress.id)
            else if (addressRes.data.length > 0) setSelectedAddress(addressRes.data[0].id)
        } catch {
            console.error('Failed to fetch data')
        } finally {
            setLoading(false)
        }
    }

    const cartItems = cart?.items || []
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const delivery = subtotal >= 999 ? 0 : 99
    const total = subtotal + delivery

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            setError('Please select a delivery address')
            return
        }
        if (cartItems.length === 0) {
            setError('Your cart is empty')
            return
        }

        try {
            setPlacing(true)
            setError('')

            const orderItems = cartItems.map(item => ({
                productVariantId: item.productVariantId,
                quantity: item.quantity
            }))

            const orderRes = await api.post('/orders', {
                addressId: selectedAddress,
                items: orderItems
            })

            const order = orderRes.data

            const paymentRes = await api.post('/payments/create', {
                orderId: order.id
            })

            const options = {
                key: 'rzp_test_SydiD1cNlI0kb2',
                amount: paymentRes.data.amount * 100,
                currency: 'INR',
                name: 'Realwear',
                description: `Order #${order.id}`,
                order_id: paymentRes.data.razorpayOrderId,
                handler: async (response) => {
                    try {
                        await api.post('/payments/verify', {
                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature
                        })
                        navigate('/orders')
                    } catch {
                        setError('Payment verification failed')
                    }
                },
                prefill: { name: '', email: '' },
                theme: { color: '#000000' }
            }

            const razorpay = new window.Razorpay(options)
            razorpay.open()

        } catch (err) {
            console.error('Checkout error:', err)
            setError('Failed to place order. Please try again.')
        } finally {
            setPlacing(false)
        }
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
                    <button onClick={() => setMenuOpen(!menuOpen)} className="text-black font-bold text-xl">☰</button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white border-b border-gray-200 px-4 py-6 flex flex-col gap-4 z-40">
                    <span className="font-sans text-black text-sm font-bold tracking-wider cursor-pointer" onClick={() => { navigate('/products?category=clubs'); setMenuOpen(false) }}>CLUB KITS</span>
                    <span className="font-sans text-black text-sm font-bold tracking-wider cursor-pointer" onClick={() => { navigate('/products?category=nations'); setMenuOpen(false) }}>NATION KITS</span>
                    <span className="font-sans text-black text-sm font-bold tracking-wider cursor-pointer" onClick={() => { navigate('/products?category=icons'); setMenuOpen(false) }}>ICONS</span>
                    <span className="font-sans text-red-500 text-sm font-bold tracking-wider cursor-pointer" onClick={() => { navigate('/products'); setMenuOpen(false) }}>SALE</span>
                    <span className="font-sans text-black text-sm font-bold tracking-wider cursor-pointer" onClick={() => { navigate('/profile'); setMenuOpen(false) }}>PROFILE</span>
                </div>
            )}

            {/* Page Header */}
            <div className="px-4 md:px-12 py-6 md:py-8 border-b border-gray-200">
                <p className="font-sans text-gray-500 text-sm cursor-pointer hover:underline" onClick={() => navigate('/cart')}>← Back to Bag</p>
                <h1 className="font-bebas text-black text-4xl md:text-5xl tracking-wide mt-1">CHECKOUT</h1>
            </div>

            <div className="px-4 md:px-12 py-6 md:py-10 flex flex-col md:flex-row gap-8 md:gap-16 min-h-screen">

                {/* Left — Address + Items */}
                <div className="flex-1">

                    {/* Delivery Address */}
                    <div className="mb-8">
                        <h2 className="font-bebas text-black text-2xl tracking-wider mb-4">DELIVERY ADDRESS</h2>
                        {addresses.length === 0 ? (
                            <div className="border border-gray-200 p-6">
                                <p className="font-sans text-gray-500 text-sm">No addresses saved.</p>
                                <button
                                    onClick={() => navigate('/addresses')}
                                    className="mt-3 bg-black text-white font-sans text-xs tracking-widest px-6 py-2 hover:bg-gray-800"
                                >
                                    ADD ADDRESS
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {addresses.map((address) => (
                                    <div
                                        key={address.id}
                                        onClick={() => setSelectedAddress(address.id)}
                                        className={`border p-4 cursor-pointer ${selectedAddress === address.id ? 'border-gray-500' : 'border-gray-200 hover:border-gray-400'}`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-sans text-black text-sm font-medium">{address.doorNumber}, {address.street}</p>
                                                <p className="font-sans text-gray-500 text-sm mt-0.5">{address.city}, {address.state}</p>
                                                <p className="font-sans text-gray-500 text-sm">{address.pincode}, {address.country}</p>
                                                {address.isDefault && (
                                                    <span className="font-sans text-xs text-[#408267] mt-1 block">Default</span>
                                                )}
                                            </div>
                                            {selectedAddress === address.id && (
                                                <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                                                    <FiCheck size={12} className="text-white" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <button
                            onClick={() => navigate('/addresses')}
                            className="mt-3 text-black font-sans text-xs underline hover:text-gray-500"
                        >
                            + Add new address
                        </button>
                    </div>

                    {/* Order Items */}
                    <div>
                        <h2 className="font-bebas text-black text-2xl tracking-wider mb-4">ORDER ITEMS</h2>
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-4 border border-gray-200 p-3 md:p-4">
                                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 flex-shrink-0 overflow-hidden">
                                        {item.imageUrl ? (
                                            <img src={item.imageUrl} alt={item.productName} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <span className="text-gray-400 text-xs">No Image</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-sans text-black font-medium text-sm">{item.productName}</p>
                                        <p className="font-sans text-gray-500 text-xs mt-0.5">Size: {item.size} · Qty: {item.quantity}</p>
                                        <p className="font-sans text-black font-medium text-sm mt-1">₹{(item.price * item.quantity)?.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right — Order Summary */}
                <div className="w-full md:w-80 flex-shrink-0">
                    <div className="border border-gray-200 p-6 md:sticky md:top-24">
                        <h2 className="font-bebas text-black text-2xl tracking-wider mb-6">ORDER SUMMARY</h2>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <p className="font-sans text-gray-500 text-sm">Subtotal ({cartItems.length} items)</p>
                                <p className="font-sans text-black text-sm font-medium">₹{subtotal?.toLocaleString()}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-sans text-gray-500 text-sm">Delivery</p>
                                <p className="font-sans text-[#408267] text-sm font-medium">{delivery === 0 ? 'FREE' : `₹${delivery}`}</p>
                            </div>
                            <div className="border-t border-gray-200 pt-3 flex justify-between">
                                <p className="font-sans text-black text-sm font-bold">Total</p>
                                <p className="font-sans text-black text-sm font-bold">₹{total?.toLocaleString()}</p>
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-xs mt-3">{error}</p>}

                        <button
                            onClick={handlePlaceOrder}
                            disabled={placing || cartItems.length === 0}
                            className="mt-6 w-full bg-black text-white font-sans font-medium tracking-widest text-sm py-4 hover:bg-gray-800 disabled:opacity-50"
                        >
                            {placing ? 'PROCESSING...' : `PAY ₹${total?.toLocaleString()}`}
                        </button>

                        <p className="font-sans text-gray-400 text-xs text-center mt-3">
                            Secured by Razorpay
                        </p>
                    </div>
                </div>
            </div>

            {/* Green banner */}
            <div className="bg-[#007CC6] w-full flex items-center justify-center px-6 md:px-20 py-16">
                <div className="text-center">
                    <h2 className="font-bebas text-white text-4xl md:text-6xl tracking-widest">SECURE CHECKOUT.<br/>FAST DELIVERY.</h2>
                    <p className="text-white font-sans text-base mt-4 opacity-80 tracking-wider">
                        100% secure payments via Razorpay. Your jersey ships in 2-3 days.
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

export default CheckoutPage