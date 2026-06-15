import { useNavigate } from 'react-router-dom'

function AboutPage() {
    const navigate = useNavigate()

    return (
        <div>
            <div className="bg-black text-white text-center py-3 text-sm font-sans tracking-widest">
                FREE DELIVERY ON ORDERS ABOVE ₹999 &nbsp;|&nbsp; 100% AUTHENTIC JERSEYS
            </div>
            <div className="bg-white px-12 py-5 flex items-center justify-between border-b border-gray-200 sticky top-0 z-50">
                <h1 className="font-sans text-black text-3xl font-semibold tracking-tight cursor-pointer" onClick={() => navigate('/home')}>
                    REAL<span className="font-barlow italic font-semibold text-4xl">wear</span>
                </h1>
                <div className="flex items-center gap-10">
                    <span className="font-sans text-black text-[1rem] font-bold hover:underline cursor-pointer tracking-wider" onClick={() => navigate('/products?category=clubs')}>CLUB KITS</span>
                    <span className="font-sans text-black text-[1rem] font-bold hover:underline cursor-pointer tracking-wider" onClick={() => navigate('/products?category=nations')}>NATION KITS</span>
                    <span className="font-sans text-black text-[1rem] font-bold hover:underline cursor-pointer tracking-wider" onClick={() => navigate('/products?category=icons')}>ICONS</span>
                    <span className="font-sans text-red-500 text-[1rem] font-bold hover:underline cursor-pointer tracking-wider" onClick={() => navigate('/products')}>SALE</span>
                </div>
                <div className="flex items-center gap-6">
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

            <div className="bg-black w-full px-20 py-24">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="font-sans text-gray-400 text-sm tracking-widest mb-4">OUR STORY</p>
                    <h1 className="font-bebas text-white text-7xl tracking-wider leading-none">BORN FROM<br/>THE BEAUTIFUL GAME</h1>
                </div>
            </div>

            <div className="px-20 py-16 max-w-4xl mx-auto">
                <div className="space-y-12">
                    <div>
                        <h2 className="font-bebas text-black text-3xl tracking-widest mb-4">WHO WE ARE</h2>
                        <p className="font-sans text-gray-500 text-sm leading-relaxed">Realwear is an Indian jersey store founded in 2024 by fans, for fans. We started with a simple belief — every football supporter deserves access to authentic, player-quality jerseys without compromise. From our base in India, we ship jerseys from the world's greatest clubs and national teams straight to your door.</p>
                    </div>
                    <div>
                        <h2 className="font-bebas text-black text-3xl tracking-widest mb-4">OUR MISSION</h2>
                        <p className="font-sans text-gray-500 text-sm leading-relaxed">To bring the world's greatest football jerseys to Indian fans — authentic, affordable, and delivered fast. We believe wearing your club's colours is more than fashion. It's identity. It's passion. It's belonging. That's what Realwear stands for.</p>
                    </div>
                    <div>
                        <h2 className="font-bebas text-black text-3xl tracking-widest mb-4">WHAT WE OFFER</h2>
                        <p className="font-sans text-gray-500 text-sm leading-relaxed">From Premier League to La Liga, Serie A to Bundesliga, IPL to F1 — we cover every sport you love. Our catalog spans club kits, national team jerseys, iconic player editions, and F1 team merchandise. Every jersey is sourced for authenticity and quality.</p>
                    </div>
                    <div>
                        <h2 className="font-bebas text-black text-3xl tracking-widest mb-4">OUR PROMISE</h2>
                        <p className="font-sans text-gray-500 text-sm leading-relaxed">100% authentic jerseys. Secure payments. Fast delivery across India. Easy returns. And a team that cares about your experience as much as you care about your club. That's the Realwear promise.</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-8 mt-16">
                    {[
                        { number: '500+', label: 'Jerseys in Catalog' },
                        { number: '10+', label: 'Leagues Covered' },
                        { number: '2024', label: 'Founded' },
                    ].map((stat, index) => (
                        <div key={index} className="text-center border border-gray-200 py-10">
                            <p className="font-bebas text-black text-5xl tracking-wider">{stat.number}</p>
                            <p className="font-sans text-gray-500 text-sm mt-2">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-[#007CC6] w-full flex items-center justify-center px-20 py-16">
                <div className="text-center">
                    <h2 className="font-bebas text-white text-6xl tracking-widest">WEAR WHAT THE LEGENDS WEAR.</h2>
                    <button onClick={() => navigate('/products')} className="mt-6 bg-white text-black font-sans font-medium tracking-widest text-sm px-8 py-4 hover:bg-gray-200">SHOP NOW →</button>
                </div>
            </div>

            <div className="bg-black w-full px-20 py-16">
                <div className="border-t border-gray-800 pt-8 flex justify-between items-center">
                    <p className="text-white font-sans text-sm">© 2026 Realwear. All rights reserved.</p>
                    <div className="flex gap-6">
                        <span className="text-white text-sm font-sans hover:underline cursor-pointer" onClick={() => navigate('/privacy')}>Privacy Policy</span>
                        <span className="text-white text-sm font-sans hover:underline cursor-pointer" onClick={() => navigate('/terms')}>Terms & Conditions</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutPage