import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function ContactPage() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
    const [submitted, setSubmitted] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    const handleSubmit = () => {
        if (!formData.name || !formData.email || !formData.message) return
        setSubmitted(true)
    }

    return (
        <div>
            <div className="bg-black text-white text-center py-3 text-xs md:text-sm font-sans tracking-widest">
                FREE DELIVERY ON ORDERS ABOVE ₹999 &nbsp;|&nbsp; 100% AUTHENTIC JERSEYS
            </div>
            <div className="bg-white px-4 md:px-12 py-4 md:py-5 flex items-center justify-between border-b border-gray-200 sticky top-0 z-50">
                <h1 className="font-sans text-black text-2xl md:text-3xl font-semibold tracking-tight cursor-pointer" onClick={() => navigate('/home')}>
                    REAL<span className="font-barlow italic font-semibold text-3xl md:text-4xl">wear</span>
                </h1>
                <div className="hidden md:flex items-center gap-10">
                    <span className="font-sans text-black text-[1rem] font-bold hover:underline cursor-pointer tracking-wider" onClick={() => navigate('/products?category=clubs')}>CLUB KITS</span>
                    <span className="font-sans text-black text-[1rem] font-bold hover:underline cursor-pointer tracking-wider" onClick={() => navigate('/products?category=nations')}>NATION KITS</span>
                    <span className="font-sans text-black text-[1rem] font-bold hover:underline cursor-pointer tracking-wider" onClick={() => navigate('/products?category=icons')}>ICONS</span>
                    <span className="font-sans text-red-500 text-[1rem] font-bold hover:underline cursor-pointer tracking-wider" onClick={() => navigate('/products')}>SALE</span>
                </div>
                <div className="hidden md:flex items-center gap-6">
                    <svg onClick={() => navigate('/profile')} className="cursor-pointer" width="28" height="28" viewBox="0 0 32 32" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M9.22548 20H22.7744L26.4218 25.7316L25.5781 26.2684L22.2255 21H9.77443L6.42179 26.2684L5.57812 25.7316L9.22548 20Z" fill="currentColor"/><path fillRule="evenodd" clipRule="evenodd" d="M16 17C18.761 17 21 14.761 21 12C21 9.23895 18.761 7 16 7C13.2377 7 11 9.23881 11 12C11 14.7612 13.2377 17 16 17ZM16 18C19.3133 18 22 15.3133 22 12C22 8.68667 19.3133 6 16 6C12.6853 6 9.99996 8.68667 9.99996 12C9.99996 15.3133 12.6853 18 16 18Z" fill="currentColor"/></svg>
                    <svg onClick={() => navigate('/wishlist')} className="cursor-pointer" width="28" height="28" viewBox="0 0 32 32" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M6.7206 6H11.7071L16 10.2929L20.2929 6H25.2794L29.6328 13.0743L16 26.7071L2.36719 13.0743L6.7206 6ZM7.2794 7L3.63281 12.9257L16 25.2929L28.3672 12.9257L24.7206 7H20.7071L16 11.7071L11.2929 7H7.2794Z" fill="currentColor"/></svg>
                    <svg onClick={() => navigate('/cart')} className="cursor-pointer" width="28" height="28" viewBox="0 0 32 32" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M21 4H11V8H6V28H26V8H21V4ZM20 9V12H21V9H25V27H7V9H11V12H12V9H20ZM20 8V5H12V8H20Z" fill="currentColor"/></svg>
                </div>
                <div className="flex md:hidden items-center gap-4">
                    <svg onClick={() => navigate('/wishlist')} className="cursor-pointer" width="22" height="22" viewBox="0 0 32 32" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M6.7206 6H11.7071L16 10.2929L20.2929 6H25.2794L29.6328 13.0743L16 26.7071L2.36719 13.0743L6.7206 6ZM7.2794 7L3.63281 12.9257L16 25.2929L28.3672 12.9257L24.7206 7H20.7071L16 11.7071L11.2929 7H7.2794Z" fill="currentColor"/></svg>
                    <svg onClick={() => navigate('/cart')} className="cursor-pointer" width="22" height="22" viewBox="0 0 32 32" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M21 4H11V8H6V28H26V8H21V4ZM20 9V12H21V9H25V27H7V9H11V12H12V9H20ZM20 8V5H12V8H20Z" fill="currentColor"/></svg>
                    <button onClick={() => setMenuOpen(!menuOpen)} className="text-black font-bold text-xl">☰</button>
                </div>
            </div>
            {menuOpen && (
                <div className="md:hidden bg-white border-b border-gray-200 px-4 py-6 flex flex-col gap-4 z-40">
                    <span className="font-sans text-black text-sm font-bold tracking-wider cursor-pointer" onClick={() => { navigate('/products?category=clubs'); setMenuOpen(false) }}>CLUB KITS</span>
                    <span className="font-sans text-black text-sm font-bold tracking-wider cursor-pointer" onClick={() => { navigate('/products?category=nations'); setMenuOpen(false) }}>NATION KITS</span>
                    <span className="font-sans text-black text-sm font-bold tracking-wider cursor-pointer" onClick={() => { navigate('/products?category=icons'); setMenuOpen(false) }}>ICONS</span>
                    <span className="font-sans text-red-500 text-sm font-bold tracking-wider cursor-pointer" onClick={() => { navigate('/products'); setMenuOpen(false) }}>SALE</span>
                    <span className="font-sans text-black text-sm font-bold tracking-wider cursor-pointer" onClick={() => { navigate('/profile'); setMenuOpen(false) }}>PROFILE</span>
                </div>
            )}

            <div className="px-6 md:px-20 py-12 md:py-16 border-b border-gray-200">
                <p className="font-sans text-gray-500 text-sm tracking-widest mb-2">SUPPORT</p>
                <h1 className="font-bebas text-black text-4xl md:text-6xl tracking-wider">CONTACT US</h1>
                <p className="font-sans text-gray-500 text-base mt-2">We're here to help. Reach out and we'll get back to you within 24 hours.</p>
            </div>

            <div className="px-6 md:px-20 py-12 md:py-16 flex flex-col md:flex-row gap-10 md:gap-16">
                <div className="w-full md:w-1/3">
                    <h2 className="font-bebas text-black text-2xl tracking-widest mb-6">GET IN TOUCH</h2>
                    <div className="space-y-6">
                        <div>
                            <p className="font-sans text-black font-bold text-sm mb-1">EMAIL</p>
                            <p className="font-sans text-gray-500 text-sm">support@realwear.com</p>
                        </div>
                        <div>
                            <p className="font-sans text-black font-bold text-sm mb-1">HOURS</p>
                            <p className="font-sans text-gray-500 text-sm">Monday – Saturday</p>
                            <p className="font-sans text-gray-500 text-sm">10:00 AM – 6:00 PM IST</p>
                        </div>
                        <div>
                            <p className="font-sans text-black font-bold text-sm mb-1">RESPONSE TIME</p>
                            <p className="font-sans text-gray-500 text-sm">Within 24 hours on business days</p>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-2/3">
                    {submitted ? (
                        <div className="bg-gray-100 p-8 md:p-12 text-center">
                            <h2 className="font-bebas text-black text-3xl tracking-wider mb-2">MESSAGE SENT</h2>
                            <p className="font-sans text-gray-500 text-sm">We'll get back to you within 24 hours.</p>
                            <button onClick={() => setSubmitted(false)} className="mt-6 border border-black px-8 py-3 font-sans text-sm font-medium hover:bg-black hover:text-white transition-all">Send Another</button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="w-full md:w-1/2">
                                    <label className="font-sans text-black text-xs font-bold tracking-widest mb-2 block">NAME</label>
                                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                                           className="w-full border border-gray-300 px-4 py-3 font-sans text-sm outline-none focus:border-black" placeholder="Your name"/>
                                </div>
                                <div className="w-full md:w-1/2">
                                    <label className="font-sans text-black text-xs font-bold tracking-widest mb-2 block">EMAIL</label>
                                    <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                                           className="w-full border border-gray-300 px-4 py-3 font-sans text-sm outline-none focus:border-black" placeholder="Your email"/>
                                </div>
                            </div>
                            <div>
                                <label className="font-sans text-black text-xs font-bold tracking-widest mb-2 block">SUBJECT</label>
                                <input type="text" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                       className="w-full border border-gray-300 px-4 py-3 font-sans text-sm outline-none focus:border-black" placeholder="What is this about?"/>
                            </div>
                            <div>
                                <label className="font-sans text-black text-xs font-bold tracking-widest mb-2 block">MESSAGE</label>
                                <textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                                          rows={6} className="w-full border border-gray-300 px-4 py-3 font-sans text-sm outline-none focus:border-black resize-none" placeholder="Tell us how we can help..."/>
                            </div>
                            <button onClick={handleSubmit} className="bg-black text-white font-sans font-medium tracking-widest text-sm px-8 py-4 hover:bg-gray-800 w-full">
                                SEND MESSAGE
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-black w-full px-6 md:px-20 py-16 mt-16">
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
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

export default ContactPage