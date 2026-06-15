import { useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import nationsHero from '../assets/nationskit.png'
import clubskit from '../assets/clubkitfinal.png'
import heroVideo2 from '../assets/hero-video2.mp4'
import heroVideo1 from '../assets/hero-video1.mp4'
import heroVideo0 from '../assets/hero-video0.mp4'
import heroVideo3 from '../assets/hero-video3.mp4'
import heroVideo4 from '../assets/hero-video4.mp4'
import heroVideo5 from '../assets/hero-video5.mp4'
import juventuss from '../assets/cr7juventus.mp4'
import sportingp from '../assets/sporting.mp4'
import allVid from '../assets/allvid.mp4'
import api from '../services/api'

function HomePage() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('ALL')
    const [activeNationTab, setActiveNationTab] = useState('ALL')
    const [activeClubTab, setActiveClubTab] = useState('ALL')
    const [activeIplTab, setActiveIplTab] = useState('ALL')
    const [activeIconTab, setActiveIconTab] = useState('ALL')
    const [activeF1Tab, setActiveF1Tab] = useState('ALL')
    const [products, setProducts] = useState([])

    const scrollRef = useRef(null)
    const nationScrollRef = useRef(null)
    const clubScrollRef = useRef(null)
    const iplScrollRef = useRef(null)
    const iconScrollRef = useRef(null)
    const f1ScrollRef = useRef(null)

    const videos = [heroVideo5, heroVideo2 ,heroVideo3, heroVideo1, juventuss, sportingp]
    const [currentVideo, setCurrentVideo] = useState(0)
    const videoRef = useRef(null)

    const handleVideoEnd = () => {
        setCurrentVideo(prev => (prev + 1) % videos.length)
    }

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load()
            videoRef.current.play()
        }
    }, [currentVideo])

    const scrollRight = (ref) => ref.current.scrollBy({ left: 300, behavior: 'smooth' })
    const scrollLeft = (ref) => ref.current.scrollBy({ left: -300, behavior: 'smooth' })

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products')
                setProducts(response.data)
            } catch {
                console.error('Failed to fetch products')
            }
        }
        fetchProducts()
    }, [])

    const newArrivals = products
    const nationalKits = products.filter(p => p.league === 'International')
    const clubKits = products.filter(p => ['Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1'].includes(p.league))
    const iplKits = products.filter(p => p.league === 'IPL')
    const f1Kits = products.filter(p => p.league === 'F1')
    const iconKits = products.filter(p => p.league === 'Icons')

    const ProductSection = ({ title, products, scrollRef, activeTab, setActiveTab, tabs, tabKey, shopAllLink }) => {

        const [wishlisted, setWishlisted] = useState({})

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

        const filteredProducts = activeTab === 'ALL'
            ? products
            : products.filter(p =>
                p[tabKey]?.toLowerCase() === activeTab.toLowerCase() ||
                p.league?.toLowerCase() === activeTab.toLowerCase()
            )

        return (
            <div className="px-12 py-10">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="font-bebas text-black text-4xl tracking-wider">{title}</h2>
                    <span className="font-sans text-black text-sm underline cursor-pointer hover:text-gray-500" onClick={() => navigate(shopAllLink || '/products')}>Shop all</span>
                </div>
                <div className="flex gap-3 mb-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`border px-5 py-2 text-sm font-sans font-medium ${
                                activeTab === tab ? 'bg-black text-white border-black' : 'border-black text-black hover:bg-black hover:text-white'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="relative">
                    <div ref={scrollRef} className="flex gap-6 overflow-x-auto scrollbar-hide">
                        {filteredProducts.map((product, index) => (
                            <div key={product.id || index} className="group flex-shrink-0 w-72 border-[1px] border-transparent hover:border-black pb-4">
                                <div className="bg-gray-100 h-72 relative overflow-hidden">
                                    {product.images && product.images.length > 0 ? (
                                        <img
                                            src={product.images.find(img => img.isPrimary)?.imageUrl || product.images[0].imageUrl}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                                        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16 7.56504L13.4349 5H6.70822L1.20312 13.9458L16 28.7426L30.7969 13.9458L25.2918 5H18.565L16 7.56504Z" fill={wishlisted[product.id] ? 'black' : 'none'} stroke="black" strokeWidth="1"/>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M7.82582 7H12.6065L16 10.3935L19.3935 7H24.1742L28.2656 13.6486L16 25.9142L3.73438 13.6486L7.82582 7ZM8.94341 9L6.26562 13.3514L16 23.0858L25.7344 13.3514L23.0566 9H20.2219L16 13.2219L11.7781 9H8.94341Z" fill={wishlisted[product.id] ? '#ECEFF1' : 'black'}/>
                                        </svg>
                                    </button>
                                </div>
                                <div className="mt-6 ml-4">
                                    <p className="font-sans text-black font-extrabold text-[0.9rem]">{product.name}</p>
                                    <p className="font-sans text-gray-500 text-sm">{product[tabKey] || product.league}</p>
                                    <p className="font-sans text-black font-medium text-sm mt-1">₹{product.price?.toLocaleString()}</p>
                                    <p onClick={() => navigate(`/products/${product.id}`)} className="font-sans text-black text-[0.9rem] underline cursor-pointer inline-block hover:bg-black hover:text-white hover:decoration-white mt-4">Shop Now</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => scrollLeft(scrollRef)} className="absolute left-0 top-1/3 bg-white border border-gray-300 p-3 shadow-md hover:bg-black hover:text-white z-10">←</button>
                    <button onClick={() => scrollRight(scrollRef)} className="absolute right-0 top-1/3 bg-white border border-gray-300 p-3 shadow-md hover:bg-black hover:text-white z-10">→</button>
                </div>
            </div>
        )
    }

    return (
        <div>
            {/* Announcement Bar */}
            <div className="bg-black text-white text-center py-3 text-sm font-sans tracking-widest">
                FREE DELIVERY ON ORDERS ABOVE ₹999  &nbsp;|&nbsp; 100% AUTHENTIC JERSEYS
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

            {/* Hero Section */}
            <div className="relative bg-black h-[85vh] flex items-end overflow-hidden">
                <video
                    ref={videoRef}
                    onEnded={handleVideoEnd}
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src={videos[currentVideo]} type="video/mp4" />
                </video>
                <div className="absolute inset-0 " />
                <div className="relative z-20 p-16 pb-20">
                   {/*<p className="text-white font-sans text-sm tracking-widest mb-4 opacity-70">NEW COLLECTION 2026</p>*/}
                   {/* <h2 className="font-bebas text-white text-8xl leading-none tracking-wide">THE PITCH<br/>IS YOURS</h2>*/}
                   {/* <p className="text-white font-sans text-base mt-4 opacity-70 max-w-md">*/}
                   {/*     Wear what the legends wear. Official player quality jerseys from the world's greatest clubs.*/}
                   {/* </p>*/}
                    <div className="flex gap-4 mt-8">
                        <button onClick={() => navigate('/products')} className="bg-white text-black font-sans font-medium tracking-widest text-sm px-8 py-4 hover:bg-gray-200">
                            SHOP NOW →
                        </button>
                        <button onClick={() => navigate('/products?category=clubs')} className="border border-white text-white font-sans font-medium tracking-widest text-sm px-8 py-4 hover:bg-white hover:text-black">
                            EXPLORE CLUBS
                        </button>
                    </div>
                </div>
            </div>

            {/* New Arrivals */}
            <ProductSection
                title="NEW ARRIVALS"
                products={newArrivals}
                scrollRef={scrollRef}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabs={[]}
                tabKey="league"
                shopAllLink="/products"
            />

            {/* Two column promo */}
            <div className="flex px-12 gap-6 pb-16">
                <div className="w-1/2 cursor-pointer border-[1px] border-transparent hover:border-black pb-3" onClick={() => navigate('/products?category=clubs')}>
                    <div className="h-96 relative overflow-hidden" style={{ backgroundImage: `url(${clubskit})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    </div>
                    <div className="mt-4 ml-4">
                        <h3 className="font-bebas text-black text-4xl tracking-wider">CLUB KITS</h3>
                        <p className="font-sans text-black text-sm ">Rep your favourite club</p>
                        <p className="font-sans text-black font-extrabold underline cursor-pointer mt-4 inline-block hover:bg-black hover:text-white hover:decoration-white">SHOP NOW</p>

                    </div>
                </div>
                <div className="w-1/2 cursor-pointer border-[1px] border-transparent hover:border-black " onClick={() => navigate('/products?league=International')}>
                    <div className="h-96 relative overflow-hidden" style={{ backgroundImage: `url(${nationsHero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    </div>
                    <div className="mt-4 ml-4">
                        <h3 className="font-bebas text-black text-4xl tracking-wider">NATION KITS</h3>
                        <p className="font-sans text-black text-sm ">Wear your national pride</p>
                        <p className="font-sans text-black font-extrabold underline cursor-pointer mt-4 inline-block hover:bg-black hover:text-white hover:decoration-white">SHOP NOW</p>
                    </div>
                </div>
            </div>

            {/* National Kits */}
            <ProductSection
                title="NATIONAL KITS"
                products={nationalKits}
                scrollRef={nationScrollRef}
                activeTab={activeNationTab}
                setActiveTab={setActiveNationTab}
                tabs={['ALL', 'BRAZIL', 'FRANCE', 'ARGENTINA', 'GERMANY', 'SPAIN', 'ENGLAND', 'PORTUGAL', 'NETHERLANDS']}
                tabKey="team"
                shopAllLink="/products?league=International"
            />

            {/* Club Kits */}
            <ProductSection
                title="CLUB KITS"
                products={clubKits}
                scrollRef={clubScrollRef}
                activeTab={activeClubTab}
                setActiveTab={setActiveClubTab}
                tabs={['ALL', 'Real Madrid', 'Barcelona', 'Manchester City', 'Manchester United', 'Liverpool', 'Chelsea', 'Arsenal', 'AC Milan', 'Juventus', 'PSG', 'Bayern Munich', 'Borussia Dortmund']}
                tabKey="team"
                shopAllLink="/products?category=clubs"
            />

            {/* Icons Kit */}
            <ProductSection
                title="ICONS KIT"
                products={iconKits}
                scrollRef={iconScrollRef}
                activeTab={activeIconTab}
                setActiveTab={setActiveIconTab}
                tabs={[]}
                tabKey="team"
                shopAllLink="/products?league=Icons"
            />

            {/* F1 Kits */}
            <ProductSection
                title="F1 TEAM KITS"
                products={f1Kits}
                scrollRef={f1ScrollRef}
                activeTab={activeF1Tab}
                setActiveTab={setActiveF1Tab}
                tabs={['ALL', 'Red Bull Racing', 'Ferrari', 'Mercedes', 'McLaren', 'Aston Martin', 'Haas']}
                tabKey="team"
                shopAllLink="/products?league=F1"
            />

            {/* IPL Kits */}
            <ProductSection
                title="IPL KITS"
                products={iplKits}
                scrollRef={iplScrollRef}
                activeTab={activeIplTab}
                setActiveTab={setActiveIplTab}
                tabs={['ALL', 'Mumbai Indians', 'Chennai Super Kings', 'RCB']}
                tabKey="team"
                shopAllLink="/products?league=IPL"
            />

            {/* About Section */}
            <div className="bg-black w-full px-20 py-16">
                <div className="max-w-4xl mx-auto">
                    <h2 className="font-bebas text-white text-5xl tracking-widest mb-8 text-center">
                        REALWEAR JERSEY STORE FOR AUTHENTIC KITS, PASSION & STYLE — SINCE 2024
                    </h2>
                    <p className="text-white font-sans text-sm leading-relaxed mb-6 text-justify">
                        Football keeps us united. Keeps you passionate. Brings us together. Through the beautiful game, we have the power to connect millions — through stories of legendary clubs, iconic players, and the jerseys that define generations.
                    </p>
                    <p className="text-white font-sans text-sm leading-relaxed mb-6 text-justify">
                        Find authentic player-quality jerseys crafted with performance fabrics to help you represent your team with pride. Whether you're a die-hard supporter, a casual fan, or a collector — our jersey store is your home. We're here to help you wear your passion, stand out in the stands, and feel closer to the game you love.
                    </p>
                    <p className="text-white font-sans text-sm leading-relaxed mb-6 text-justify">
                        Explore our online store for the latest kits from the world's greatest clubs and national teams. From the Premier League to La Liga, Serie A to the Champions League — Realwear brings you closer to the game. Whether you support Real Madrid, Barcelona, Manchester United, or your national team, our store ensures that wherever you are, you can access authentic jerseys delivered straight to your door.
                    </p>
                    <p className="text-white font-sans text-sm leading-relaxed mb-6 text-justify">
                        Realwear is more than just a jersey store — it's a space for football lovers to celebrate the sport and express their identity. Every jersey in our store is sourced for authenticity, quality, and attention to detail — helping you wear your colours with confidence. We partner with the best suppliers in the industry to bring you kits that match player quality.
                    </p>
                    <p className="text-white font-sans text-sm leading-relaxed text-justify">
                        Wherever football takes you — to the stadium, the street, or the training ground — Realwear has you covered. From iconic legends to modern superstars, from club kits to national pride, from IPL jerseys to timeless Icons — our store celebrates every dimension of the beautiful game. Wear what the legends wear. Wherever your passion takes you, Realwear is with you — every step of the way.
                    </p>
                </div>
            </div>

            {/* Green banner */}
            <div className="bg-[#007CC6] w-full flex items-center justify-center px-20 py-16">
                <div className="text-center">
                    <h2 className="font-bebas text-white text-6xl tracking-widest">
                        THE BEAUTIFUL GAME.<br/>WEAR IT.
                    </h2>
                    <p className="text-white font-sans text-base mt-4 opacity-80 tracking-wider">
                        From the terraces to the pitch — Realwear brings you closer to the game you love.
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

export default HomePage