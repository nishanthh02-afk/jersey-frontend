import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FiHeart, FiShoppingCart, FiUser } from 'react-icons/fi'
import api from '../services/api'

function ProductDetailPage() {
    const navigate = useNavigate()
    const { id } = useParams()

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectedImage, setSelectedImage] = useState(0)
    const [selectedSize, setSelectedSize] = useState(null)
    const [selectedVariant, setSelectedVariant] = useState(null)
    const [wishlisted, setWishlisted] = useState(false)
    const [addingToCart, setAddingToCart] = useState(false)
    const [cartMessage, setCartMessage] = useState('')
    const [sizeError, setSizeError] = useState('')
    const [showSizeGuide, setShowSizeGuide] = useState(false)

    useEffect(() => {
        fetchProduct()
    }, [id])

    const fetchProduct = async () => {
        try {
            setLoading(true)
            const response = await api.get(`/products/${id}`)
            setProduct(response.data)
        } catch {
            console.error('Failed to fetch product')
        } finally {
            setLoading(false)
        }
    }

    const handleSizeSelect = (variant) => {
        setSelectedSize(variant.size)
        setSelectedVariant(variant)
        setSizeError('')
    }

    const handleAddToCart = async () => {
        if (!selectedVariant) {
            setSizeError('Please select a size')
            return
        }
        try {
            setAddingToCart(true)
            await api.post('/cart', {
                productVariantId: selectedVariant.id,
                quantity: 1
            })
            setCartMessage('Added to cart!')
            setTimeout(() => setCartMessage(''), 3000)
        } catch {
            setCartMessage('Failed to add to cart')
            setTimeout(() => setCartMessage(''), 3000)
        } finally {
            setAddingToCart(false)
        }
    }

    const handleWishlist = async () => {
        try {
            if (wishlisted) {
                await api.delete(`/wishlist/${product.id}`)
                setWishlisted(false)
            } else {
                await api.post('/wishlist', { productVariantId: variants[0]?.id })
                setWishlisted(true)
            }
        } catch {
            console.error('Wishlist error')
        }
    }

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="font-sans text-gray-500 text-sm tracking-widest">Loading...</p>
        </div>
    )

    if (!product) return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="font-sans text-gray-500 text-sm">Product not found</p>
        </div>
    )

    const images = product.images || []
    const sizeOrder = ['S', 'M', 'L', 'XL', 'XXL']
    const variants = (product.variants || []).sort((a, b) =>
        sizeOrder.indexOf(a.size) - sizeOrder.indexOf(b.size)
    )
    return (
        <div>
            {/* Announcement Bar */}
            <div className="bg-black text-white text-center py-3 text-sm font-sans tracking-widest">
                FREE DELIVERY ON ORDERS ABOVE ₹999 &nbsp;|&nbsp; 100% AUTHENTIC JERSEYS
            </div>

            {/* Navbar */}
            <div className="bg-white px-12 py-5 flex items-center justify-between border-b border-gray-200 sticky top-0 z-50">
                <h1 className="font-sans text-black text-3xl font-semibold tracking-tight cursor-pointer" onClick={() => navigate('/home')}>
                    REAL<span className="font-barlow italic font-semibold  text-4xl ">wear</span>
                </h1>
                <div className="flex items-center gap-10">
                    <span className="font-sans text-black text-[1rem] font-bold hover:underline hover:decoration-2 cursor-pointer tracking-wider" onClick={() => navigate('/products?category=clubs')}>CLUB KITS</span>
                    <span className="font-sans text-black text-[1rem] font-bold hover:underline hover:decoration-2 cursor-pointer tracking-wider" onClick={() => navigate('/products?category=nations')}>NATION KITS</span>
                    <span className="font-sans text-black text-[1rem] font-bold hover:underline hover:decoration-2 cursor-pointer tracking-wider" onClick={() => navigate('/products?category=icons')}>ICONS</span>
                    <span className="font-sans text-red-500 text-[1rem] hover:underline hover:decoration-2 font-bold cursor-pointer tracking-wider" onClick={() => navigate('/products')}>SALE</span>

                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 border border-gray-300 px-4 py-2 w-48">
                        <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black ">
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
            </div>

            {/* Breadcrumb */}
            <div className="px-12 py-4 flex items-center gap-2 text-sm font-sans">
                <span className="cursor-pointer hover:underline text-black" onClick={() => navigate(-1)}>← Back</span>
                <span className="text-gray-400">/</span>
                <span className="cursor-pointer hover:underline text-black" onClick={() => navigate('/products')}>All Jerseys</span>
                <span className="text-gray-400">/</span>
                <span className="text-gray-500">{product.name}</span>
            </div>

            {/* Product Detail */}
            <div className="px-12 py-8 flex gap-16">

                {/* Left — Image Gallery */}
                <div className="flex gap-4 w-3/5">
                    {/* Thumbnails */}
                    <div className="flex flex-col gap-3 w-20 flex-shrink-0">
                        {images.length > 0 ? images.map((img, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`w-20 h-20 bg-gray-100 cursor-pointer overflow-hidden border-2 ${selectedImage === index ? 'border-black' : 'border-transparent'}`}
                            >
                                <img src={img.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                        )) : (
                            <div className="w-20 h-20 bg-gray-100 border-2 border-black" />
                        )}
                    </div>

                    {/* Main Image */}
                    <div className="flex-1 bg-gray-100 relative overflow-hidden" style={{minHeight: '600px'}}>
                        {images.length > 0 ? (
                            <img
                                src={images[selectedImage]?.imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <span className="text-gray-400 font-sans text-sm">Jersey Image</span>
                            </div>
                        )}

                        {/* Prev/Next buttons */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={() => setSelectedImage(prev => prev === 0 ? images.length - 1 : prev - 1)}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100"
                                >
                                    ←
                                </button>
                                <button
                                    onClick={() => setSelectedImage(prev => prev === images.length - 1 ? 0 : prev + 1)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100"
                                >
                                    →
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Right — Product Info */}
                <div className="w-2/5 flex flex-col pt-4">
                    <p className="font-sans text-gray-500 text-sm tracking-widest uppercase">{product.league}</p>
                    <h1 className="font-sans text-black text-3xl font-bold mt-2 leading-tight uppercase">{product.name}</h1>
                    <p className="font-sans text-gray-500 text-sm mt-1">{product.brand} · {product.team}</p>

                    <p className="font-sans text-black text-3xl font-semibold mt-6">₹{product.price?.toLocaleString()}</p>
                    <p className="font-sans text-gray-400 text-xs mt-1">Inclusive of all taxes</p>

                    {/* Size Selector */}
                    {variants.length > 0 && (
                        <div className="mt-8">
                            <div className="flex justify-between items-center mb-4">
                                <p className="font-sans text-black font-medium text-sm">Select Size</p>
                                <p className="font-sans text-gray-500 text-xs underline cursor-pointer" onClick={() => setShowSizeGuide(true)}>Size Guide</p>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {variants.map((variant) => (
                                    <button
                                        key={variant.id}
                                        onClick={() => handleSizeSelect(variant)}
                                        disabled={variant.stockQuantity === 0}
                                        className={`border py-3 text-sm font-sans font-medium transition-all ${
                                            selectedSize === variant.size
                                                ? 'border-black bg-black text-white'
                                                : variant.stockQuantity === 0
                                                    ? 'border-gray-200 text-gray-300 cursor-not-allowed line-through'
                                                    : 'border-gray-300 text-black hover:border-black'
                                        }`}
                                    >
                                        {variant.size}
                                    </button>
                                ))}
                            </div>
                            {sizeError && <p className="text-red-500 text-xs mt-2">{sizeError}</p>}
                        </div>
                    )}

                    {/* Add to Cart */}
                    <button
                        onClick={handleAddToCart}
                        disabled={addingToCart}
                        className="mt-8 bg-black text-white font-sans font-medium tracking-widest text-sm py-4 w-full hover:bg-gray-800 disabled:opacity-50"
                    >
                        {addingToCart ? 'ADDING...' : 'ADD TO BAG'}
                    </button>

                    {cartMessage && (
                        <p className={`text-sm mt-2 text-center font-sans ${cartMessage.includes('Failed') ? 'text-red-500' : 'text-[#408267]'}`}>
                            {cartMessage}
                        </p>
                    )}

                    {/* Favourite */}
                    <button
                        onClick={handleWishlist}
                        className="mt-3 border border-gray-300 text-black font-sans font-medium text-sm py-4 w-full hover:border-black flex items-center justify-center gap-2"
                    >
                        Favourite
                        <FiHeart size={18} className={wishlisted ? 'text-red-500 fill-red-500' : 'text-black'} />
                    </button>

                    {/* Description */}
                    {product.description && (
                        <div className="mt-8 border-t border-gray-200 pt-6">
                            <p className="font-sans text-black text-sm leading-relaxed">{product.description}</p>
                        </div>
                    )}

                    {/* Product Details */}
                    <div className="mt-6 border-t border-gray-200 pt-6 space-y-2">
                        {product.team && <p className="font-sans text-gray-500 text-sm">Team: <span className="text-black">{product.team}</span></p>}
                        {product.league && <p className="font-sans text-gray-500 text-sm">League: <span className="text-black">{product.league}</span></p>}
                        {product.brand && <p className="font-sans text-gray-500 text-sm">Brand: <span className="text-black">{product.brand}</span></p>}
                    </div>
                </div>
            </div>

            {showSizeGuide && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={() => setShowSizeGuide(false)}>
                    <div className="bg-white p-8 w-[500px]" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-bebas text-black text-2xl tracking-wider">SIZE GUIDE</h2>
                            <button onClick={() => setShowSizeGuide(false)} className="text-gray-500 hover:text-black text-xl">✕</button>
                        </div>
                        <table className="w-full text-sm font-sans">
                            <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-2 font-medium">Size</th>
                                <th className="text-left py-2 font-medium">Chest (cm)</th>
                                <th className="text-left py-2 font-medium">Length (cm)</th>
                                <th className="text-left py-2 font-medium">Shoulder (cm)</th>
                            </tr>
                            </thead>
                            <tbody>
                            {[
                                { size: 'S', chest: '86-91', length: '68', shoulder: '42' },
                                { size: 'M', chest: '92-97', length: '71', shoulder: '44' },
                                { size: 'L', chest: '98-103', length: '74', shoulder: '46' },
                                { size: 'XL', chest: '104-109', length: '77', shoulder: '48' },
                                { size: 'XXL', chest: '110-115', length: '80', shoulder: '50' },
                            ].map((row) => (
                                <tr key={row.size} className="border-b border-gray-100">
                                    <td className="py-3 font-medium">{row.size}</td>
                                    <td className="py-3 text-gray-600">{row.chest}</td>
                                    <td className="py-3 text-gray-600">{row.length}</td>
                                    <td className="py-3 text-gray-600">{row.shoulder}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <p className="text-gray-400 text-xs mt-4">Measurements are approximate. For best fit, measure yourself and compare.</p>
                    </div>
                </div>
            )}

            {/* Green banner */}

            {/* Green banner */}
            <div className="bg-[#007CC6] w-full flex items-center justify-center px-20 py-16 mt-16">
                <div className="text-center">
                    <h2 className="font-bebas text-white text-6xl tracking-widest">PLAYER QUALITY.<br/>YOUR SIZE.</h2>
                    <p className="text-white font-sans text-base mt-4 opacity-80 tracking-wider">
                        Every jersey ships within 2-3 days. Free returns. 100% authentic — straight from the pitch to your door.
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-black w-full px-20 py-16">
                <div className="flex justify-around">
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
                    <div>
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
                <div className="border-t border-gray-800 mt-12 pt-8 flex justify-between items-center">
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

export default ProductDetailPage