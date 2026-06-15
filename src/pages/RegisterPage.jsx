import { useState } from "react";
import jerseyImage from '../assets/loginpage-photo.jpeg';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function RegisterPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [termsChecked, setTermsChecked] = useState(false);
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const isValidName = name.length >= 2;
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPhone = /^[0-9]{10}$/.test(phone);
    const isValidPassword = password.length >= 8;

    const handleSubmit = async () => {
        setLoading(true)
        setError('')
        try {
            await axios.post('http://localhost:8080/api/auth/register', {
                name,
                email,
                phone,
                password,
                role: 'CUSTOMER'
            })
            navigate('/login')
        } catch {
            setError('Registration failed. Email or phone may already be registered.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <div className="min-h-screen flex p-12">

                {/* left side */}
                <div className="w-1/2 flex flex-col">
                    <div className="h-[45vh] overflow-hidden">
                        <img src={jerseyImage} className="w-full h-full object-cover object-top" style={{objectPosition: '60% top'}} />
                    </div>
                    <div className="p-10 flex flex-col justify-center">
                        <h2 className="font-sans text-black text-4xl leading-tight font-bold">
                            JOIN REALWEAR TO UNLOCK <br/> EXCLUSIVE ACCESS
                        </h2>
                        <p className="text-black text-sm mt-4 font-sans">
                            Join Realwear for free and enjoy immediate access to premium benefits:
                        </p>
                        <ul className="mt-6 space-y-3">
                            <li className="flex items-center gap-3 text-black text-sm font-sans">
                                <span>✓</span> Player Quality Jerseys — Same kits worn on the pitch
                            </li>
                            <li className="flex items-center gap-3 text-black text-sm font-sans">
                                <span>✓</span> Fast Delivery — Get your kit in 2-3 days
                            </li>
                            <li className="flex items-center gap-3 text-black text-sm font-sans">
                                <span>✓</span> Exclusive Member Drops — First access to new arrivals
                            </li>
                            <li className="flex items-center gap-3 text-black text-sm font-sans">
                                <span>✓</span> 100% Authentic — Official licensed merchandise
                            </li>
                            <li className="flex items-center gap-3 text-black text-sm font-sans">
                                <span>✓</span> Welcome Discount — 10% off your first order
                            </li>
                            <li className="flex items-center gap-3 text-black text-sm font-sans">
                                <span>✓</span> Free Returns — No questions asked
                            </li>
                        </ul>
                        <p className="text-black text-sm mt-6 font-sans">
                            Shop the world's best football kits. From Premier League to La Liga — every jersey, every club, delivered fast.
                        </p>
                    </div>
                </div>

                {/* right side - register form */}
                <div className="w-1/2 bg-white px-16 pt-16 pb-16 flex flex-col justify-start">
                    <h1 className="font-sans text-black text-4xl font-semibold tracking-tight">REAL<span className="font-barlow italic font-semibold relative -top-[0.2] text-5xl">wear</span></h1>
                    <h2 className="text-black font-sans text-4xl mt-6 font-bold">CREATE ACCOUNT</h2>
                    <p className="text-black mt-6 font-sans text-sm">Join Realwear and enjoy exclusive access to premium football kits.</p>

                    {/* Name */}
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="FULL NAME *"
                        className={`w-full bg-transparent border py-4 pl-4 text-black placeholder-gray-500 mt-6 focus:placeholder-transparent focus:outline-none ${
                            isValidName ? "border-black border-b-4 border-b-green-500" : "border-black border-b-4 border-b-red-500"
                        }`}
                    />

                    {/* Email */}
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="EMAIL ADDRESS *"
                        className={`w-full bg-transparent border py-4 pl-4 text-black placeholder-gray-500 mt-6 focus:placeholder-transparent focus:outline-none ${
                            isValidEmail ? "border-black border-b-4 border-b-green-500" : "border-black border-b-4 border-b-red-500"
                        }`}
                    />

                    {/* Phone */}
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="PHONE NUMBER *"
                        className={`w-full bg-transparent border py-4 pl-4 text-black placeholder-gray-500 mt-6 focus:placeholder-transparent focus:outline-none ${
                            isValidPhone ? "border-black border-b-4 border-b-green-500" : "border-black border-b-4 border-b-red-500"
                        }`}
                    />

                    {/* Password */}
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="PASSWORD *"
                        className={`w-full bg-transparent border py-4 pl-4 text-black placeholder-gray-500 mt-6 focus:placeholder-transparent focus:outline-none ${
                            isValidPassword ? "border-green-500 border-b-4" : "border-red-500 border-b-4"
                        }`}
                    />
                    {!isValidPassword && password.length > 0 && (
                        <p className="text-red-500 text-xs mt-1">Minimum 8 characters required</p>
                    )}

                    {/* Terms checkbox */}
                    <div className="flex items-start gap-3 w-full mt-6">
                        <div
                            onClick={() => setTermsChecked(!termsChecked)}
                            className={`w-5 h-5 border-2 cursor-pointer flex-shrink-0 flex items-center justify-center
                                ${termsChecked ? 'bg-black border-black' : 'bg-white border-black'}`}
                        >
                            {termsChecked && (
                                <svg viewBox="0 0 12 10" className="w-3 h-3">
                                    <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
                                </svg>
                            )}
                        </div>
                        <p className="text-black text-sm">
                            I have read and accepted the <span className="underline cursor-pointer">Terms & Conditions</span> and <span className="underline cursor-pointer">Privacy Policy</span> *
                        </p>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={!isValidName || !isValidEmail || !isValidPhone || !isValidPassword || !termsChecked || loading}
                        className="mt-8 bg-black text-white font-sans tracking-widest text-lg font-medium px-8 py-4 flex items-center gap-3 w-fit disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800"
                    >
                        {loading ? 'LOADING...' : 'CREATE ACCOUNT'} <span>→</span>
                    </button>

                    {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

                    <p className="text-black text-sm mt-4">
                        Already have an account? <span className="underline cursor-pointer font-medium hover:text-gray-500 font-sans" onClick={() => navigate('/login')}>Log in</span>
                    </p>
                </div>
            </div>

            {/* Green banner */}
            <div className="bg-[#007CC6] w-full flex items-center justify-evenly px-20 py-12">
                <h2 className="font-bebas text-white text-4xl tracking-widest">
                    BECOME A MEMBER AND EARN REWARDS WITH REALWEAR
                </h2>
                <button className="border-2 border-white text-black bg-white font-sans font-medium tracking-widest text-lg px-8 py-4 flex items-center gap-3 hover:bg-black hover:text-white">
                    SIGN UP FOR FREE <span>→</span>
                </button>
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

export default RegisterPage;