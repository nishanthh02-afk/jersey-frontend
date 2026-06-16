import { useNavigate, useSearchParams } from 'react-router-dom'
import { FiSearch, FiHeart, FiShoppingCart, FiUser, FiSliders } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import api from '../services/api'

function ProductsPage() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const leagueFromUrl = searchParams.get('league') || 'ALL'

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchKeyword, setSearchKeyword] = useState('')
    const [selectedLeague, setSelectedLeague] = useState(leagueFromUrl)
    const [selectedBrand, setSelectedBrand] = useState('ALL')
    const [sortBy, setSortBy] = useState('DEFAULT')
    const [showFilters, setShowFilters] = useState(false)
    const [wishlisted, setWishlisted] = useState({})
    const [menuOpen, setMenuOpen] = useState(false)
    const categoryFromUrl = searchParams.get('category') || ''
    const keyword = searchKeyword.toLowerCase().replace(/\s+/g, '')

    useEffect(() => { fetchProducts() }, [])
    useEffect(() => { setSelectedLeague(leagueFromUrl) }, [leagueFromUrl])
    useEffect(() => {
        if (categoryFromUrl === '') {
            setSelectedLeague(leagueFromUrl)
        }
    }, [leagueFromUrl, categoryFromUrl])

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await api.get('/wishlist')
                const items = response.data.items || []
                const wishlistMap = {}
                items.forEach(item => {
                    wishlistMap[item.productId] = item.id
                })
                setWishlisted(wishlistMap)
            } catch {
                console.error('Failed to fetch wishlist')
            }
        }
        fetchWishlist()
    }, [])

    const searchFromUrl = searchParams.get('search') || ''

    useEffect(() => {
        if (searchFromUrl) setSearchKeyword(searchFromUrl)
    }, [searchFromUrl])

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

    const toggleWishlist = async (e, product) => {
        e.stopPropagation()
        try {
            if (wishlisted[product.id]) {
                await api.delete(`/wishlist/${wishlisted[product.id]}`)
                setWishlisted(prev => ({ ...prev, [product.id]: null }))
            } else {
                const variantId = product.variants?.[0]?.id
                if (!variantId) {
                    navigate(`/products/${product.id}`)
                    return
                }
                const response = await api.post('/wishlist', { productVariantId: variantId })
                const newItem = response.data.items?.find(i => i.productId === product.id)
                setWishlisted(prev => ({ ...prev, [product.id]: newItem?.id }))
            }
        } catch {
            console.error('Wishlist error')
        }
    }

    const clubLeagues = ['Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1', 'Champions League']

    const filteredProducts = products.filter(product => {
        const matchesCategory = searchKeyword.trim() !== '' ? true :
            categoryFromUrl === 'clubs' ? (selectedLeague === 'ALL' ? clubLeagues.includes(product.league) : product.league === selectedLeague) :
                categoryFromUrl === 'nations' ? (selectedLeague === 'ALL' ? product.league === 'International' : product.team === selectedLeague) :
                    categoryFromUrl === 'icons' ? product.league === 'Icons' :
                        selectedLeague === 'ALL' ? true :
                            product.league === selectedLeague

        const matchesSearch =
            product.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            product.name.toLowerCase().replace(/\s+/g, '').includes(keyword) ||
            product.team?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            product.brand?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            product.league?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            product.league?.toLowerCase().replace(/\s+/g, '').includes(keyword)
        const matchesBrand = selectedBrand === 'ALL' || product.brand === selectedBrand
        return matchesCategory && matchesSearch && matchesBrand
    })

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === 'PRICE_LOW') return a.price - b.price
        if (sortBy === 'PRICE_HIGH') return b.price - a.price
        if (sortBy === 'NAME') return a.name.localeCompare(b.name)
        return 0
    })

    const leagues = ['ALL', ...new Set(products.map(p => p.league).filter(Boolean))]
    const brands = ['ALL', ...new Set(products.map(p => p.brand).filter(Boolean))]

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
                    <div className="flex items-center gap-2 border border-gray-300 px-3 py-2">
                        <input
                            type="text"
                            placeholder="Search"
                            className="outline-none text-sm w-full font-sans"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && e.target.value.trim()) {
                                    navigate(`/products?search=${e.target.value.trim()}`)
                                    setMenuOpen(false)
                                }
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Results count + Filter button */}
            <div className="px-4 md:px-12 py-4 md:py-6 flex items-center justify-between">
                <p className="font-sans text-black text-sm font-medium">{sortedProducts.length} results</p>
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 border border-black px-4 md:px-6 py-2 md:py-2.5 font-sans text-sm font-medium hover:bg-black hover:text-white transition-all"
                >
                    Filter & Sort <FiSliders size={14} />
                </button>
            </div>

            {/* Filter Panel */}
            {showFilters && categoryFromUrl !== 'icons' && (
                <div className="px-4 md:px-12 py-6 border-t border-b border-gray-200 bg-gray-50 flex flex-col md:flex-wrap md:flex-row gap-8 md:gap-12 mb-6">
                    {/* Search */}
                    <div>
                        <h4 className="font-sans font-bold text-black text-xs tracking-widest mb-3">SEARCH</h4>
                        <div className="flex items-center gap-2 border border-gray-300 bg-white px-3 py-2 w-full md:w-52">
                            <FiSearch className="text-gray-400" size={12} />
                            <input
                                type="text"
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                                placeholder="Search jerseys..."
                                className="outline-none text-sm w-full font-sans"
                            />
                        </div>
                    </div>

                    {/* League / Nation filter */}
                    {categoryFromUrl === 'nations' ? (
                        <div>
                            <h4 className="font-sans font-bold text-black text-xs tracking-widest mb-3">NATION</h4>
                            <div className="flex flex-wrap gap-2 max-w-full md:max-w-sm">
                                {['ALL', 'Brazil', 'Argentina', 'France', 'Germany', 'Spain', 'England', 'Portugal', 'Italy', 'Netherlands', 'Belgium', 'Croatia', 'Morocco', 'Japan', 'USA', 'India', 'Mexico', 'Colombia', 'Uruguay', 'Senegal', 'Australia', 'South Korea'].map(nation => (
                                    <button
                                        key={nation}
                                        onClick={() => setSelectedLeague(nation === 'ALL' ? 'ALL' : nation)}
                                        className={`border px-3 py-1.5 text-xs font-sans transition-all ${
                                            (nation === 'ALL' && selectedLeague === 'ALL') || selectedLeague === nation
                                                ? 'bg-black text-white border-black'
                                                : 'border-gray-300 bg-white text-black hover:border-black'
                                        }`}
                                    >
                                        {nation}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h4 className="font-sans font-bold text-black text-xs tracking-widest mb-3">LEAGUE</h4>
                            <div className="flex flex-wrap gap-2 max-w-full md:max-w-sm">
                                {leagues.map(league => (
                                    <button
                                        key={league}
                                        onClick={() => setSelectedLeague(league)}
                                        className={`border px-3 py-1.5 text-xs font-sans transition-all ${
                                            selectedLeague === league
                                                ? 'bg-black text-white border-black'
                                                : 'border-gray-300 bg-white text-black hover:border-black'
                                        }`}
                                    >
                                        {league}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Brand */}
                    <div>
                        <h4 className="font-sans font-bold text-black text-xs tracking-widest mb-3">BRAND</h4>
                        <div className="flex flex-wrap gap-2 max-w-full md:max-w-xs">
                            {brands.map(brand => (
                                <button
                                    key={brand}
                                    onClick={() => setSelectedBrand(brand)}
                                    className={`border px-3 py-1.5 text-xs font-sans transition-all ${
                                        selectedBrand === brand
                                            ? 'bg-black text-white border-black'
                                            : 'border-gray-300 bg-white text-black hover:border-black'
                                    }`}
                                >
                                    {brand}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sort */}
                    <div>
                        <h4 className="font-sans font-bold text-black text-xs tracking-widest mb-3">SORT BY</h4>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { value: 'DEFAULT', label: 'Default' },
                                { value: 'PRICE_LOW', label: 'Price: Low to High' },
                                { value: 'PRICE_HIGH', label: 'Price: High to Low' },
                                { value: 'NAME', label: 'Name A-Z' },
                            ].map(option => (
                                <button
                                    key={option.value}
                                    onClick={() => setSortBy(option.value)}
                                    className={`border px-3 py-1.5 text-xs font-sans transition-all ${
                                        sortBy === option.value
                                            ? 'bg-black text-white border-black'
                                            : 'border-gray-300 bg-white text-black hover:border-black'
                                    }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Clear */}
                    <div className="flex items-end">
                        <button
                            onClick={() => {
                                setSearchKeyword('')
                                setSelectedLeague('ALL')
                                setSelectedBrand('ALL')
                                setSortBy('DEFAULT')
                            }}
                            className="text-sm font-sans underline text-gray-500 hover:text-black"
                        >
                            Clear all
                        </button>
                    </div>
                </div>
            )}

            {/* Products Grid */}
            <div className="px-4 md:px-12 pb-16">
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <p className="font-sans text-gray-500 text-sm tracking-widest">Loading jerseys...</p>
                    </div>
                ) : sortedProducts.length === 0 ? (
                    <div className="flex items-center justify-center h-64">
                        <p className="font-sans text-gray-500 text-sm">No jerseys found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-3 md:gap-x-4 gap-y-8 md:gap-y-10">
                        {sortedProducts.map((product) => (
                            <div key={product.id} className="group cursor-pointer border-[1px] border-transparent hover:border-black pb-4">
                                <div
                                    className="bg-gray-100 h-48 md:h-80 relative overflow-hidden"
                                    onClick={() => navigate(`/products/${product.id}`)}
                                >
                                    {product.images && product.images.length > 0 ? (
                                        <img
                                            src={product.images.find(img => img.isPrimary)?.imageUrl || product.images[0].imageUrl}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <span className="text-gray-400 font-sans text-sm">Jersey Image</span>
                                        </div>
                                    )}
                                    <button
                                        onClick={(e) => toggleWishlist(e, product)}
                                        className="absolute top-3 right-3"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16 7.56504L13.4349 5H6.70822L1.20312 13.9458L16 28.7426L30.7969 13.9458L25.2918 5H18.565L16 7.56504Z" fill={wishlisted[product.id] ? 'black' : 'none'} stroke="black" strokeWidth="1"/>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M7.82582 7H12.6065L16 10.3935L19.3935 7H24.1742L28.2656 13.6486L16 25.9142L3.73438 13.6486L7.82582 7ZM8.94341 9L6.26562 13.3514L16 23.0858L25.7344 13.3514L23.0566 9H20.2219L16 13.2219L11.7781 9H8.94341Z" fill={wishlisted[product.id] ? '#ECEFF1' : 'black'}/>
                                        </svg>
                                    </button>
                                </div>
                                <div className="mt-3 ml-2 md:mt-6 md:ml-4" onClick={() => navigate(`/products/${product.id}`)}>
                                    <p className="font-sans text-black font-extrabold text-[0.75rem] md:text-[0.9rem]">{product.name}</p>
                                    <p className="font-sans text-gray-500 text-xs md:text-sm">{product.league}</p>
                                    <p className="font-sans text-black font-medium text-xs md:text-sm mt-1">₹{product.price?.toLocaleString()}</p>
                                    <p className="font-sans text-black text-[0.75rem] md:text-[0.9rem] underline cursor-pointer inline-block hover:bg-black hover:text-white hover:decoration-white mt-2 md:mt-4">Shop Now</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Green banner */}
            <div className="bg-[#007CC6] w-full flex items-center justify-center px-6 md:px-20 py-16">
                <div className="text-center">
                    <h2 className="font-bebas text-white text-4xl md:text-6xl tracking-widest">THE BEAUTIFUL GAME.<br/>WEAR IT.</h2>
                    <p className="text-white font-sans text-base mt-4 opacity-80 tracking-wider">
                        From the terraces to the pitch — Realwear brings you closer to the game you love.
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

export default ProductsPage