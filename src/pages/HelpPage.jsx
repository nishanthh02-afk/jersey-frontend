import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function HelpPage() {
    const navigate = useNavigate()
    const [openFaq, setOpenFaq] = useState(null)
    const [menuOpen, setMenuOpen] = useState(false)

    const faqs = [
        { category: 'ORDERS', items: [
                { question: 'How do I place an order?', answer: 'Browse our collection, select your jersey, choose your size, and click "Add to Bag". Once you\'re ready, go to your cart and proceed to checkout. You can pay securely via Razorpay.' },
                { question: 'Can I modify or cancel my order?', answer: 'Orders can be cancelled within 24 hours of placing them. Once dispatched, cancellations are not possible. Contact us at support@realwear.com to request a cancellation.' },
                { question: 'How do I track my order?', answer: 'Once your order is dispatched, you will receive a tracking link via email. You can also check your order status under My Orders in your profile.' },
            ]},
        { category: 'PAYMENTS', items: [
                { question: 'What payment methods are accepted?', answer: 'We accept UPI, credit/debit cards, net banking, and wallets via Razorpay. All transactions are encrypted and secure.' },
                { question: 'Is it safe to pay on Realwear?', answer: 'Yes — all payments are processed through Razorpay, one of India\'s most trusted payment gateways. We never store your card details.' },
            ]},
        { category: 'SHIPPING', items: [
                { question: 'How long does delivery take?', answer: 'Standard delivery takes 3-5 business days. Express delivery (1-2 days) is available at checkout for select pin codes.' },
                { question: 'Is there free delivery?', answer: 'Yes — all orders above ₹999 qualify for free delivery. Orders below ₹999 have a flat ₹99 shipping fee.' },
                { question: 'Do you deliver across India?', answer: 'Yes, we deliver to all major cities and towns across India.' },
            ]},
        { category: 'RETURNS & REFUNDS', items: [
                { question: 'What is your return policy?', answer: 'We accept returns within 7 days of delivery for unused jerseys in original condition with tags intact. Sale items are non-returnable.' },
                { question: 'How do I initiate a return?', answer: 'Email us at support@realwear.com with your order number and reason for return. Our team will arrange a pickup within 48 hours.' },
                { question: 'When will I get my refund?', answer: 'Refunds are processed within 5-7 business days after we receive and inspect the returned item.' },
            ]},
        { category: 'SIZE GUIDE', items: [
                { question: 'How do I find my size?', answer: 'Check the Size Guide on any product page. We recommend measuring your chest and comparing with our size chart.' },
                { question: 'Do jerseys run true to size?', answer: 'Our jerseys follow standard international sizing. Player-fit jerseys are slim cut — if you prefer a relaxed fit, size up.' },
            ]},
    ]

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
                    <span className="font-sans text-black text-sm font-bold cursor-pointer" onClick={() => { navigate('/products?category=clubs'); setMenuOpen(false) }}>CLUB KITS</span>
                    <span className="font-sans text-black text-sm font-bold cursor-pointer" onClick={() => { navigate('/products?category=nations'); setMenuOpen(false) }}>NATION KITS</span>
                    <span className="font-sans text-black text-sm font-bold cursor-pointer" onClick={() => { navigate('/products?category=icons'); setMenuOpen(false) }}>ICONS</span>
                    <span className="font-sans text-red-500 text-sm font-bold cursor-pointer" onClick={() => { navigate('/products'); setMenuOpen(false) }}>SALE</span>
                    <span className="font-sans text-black text-sm font-bold cursor-pointer" onClick={() => { navigate('/profile'); setMenuOpen(false) }}>PROFILE</span>
                </div>
            )}

            <div className="px-6 md:px-20 py-12 md:py-16 border-b border-gray-200">
                <p className="font-sans text-gray-500 text-sm tracking-widest mb-2">SUPPORT</p>
                <h1 className="font-bebas text-black text-4xl md:text-6xl tracking-wider">HELP CENTER</h1>
                <p className="font-sans text-gray-500 text-base mt-2">Find answers to the most common questions below.</p>
            </div>

            <div className="px-6 md:px-20 py-12 md:py-16 max-w-4xl">
                {faqs.map((section, sIndex) => (
                    <div key={sIndex} className="mb-12">
                        <h2 className="font-bebas text-black text-2xl tracking-widest mb-6 border-b border-gray-200 pb-3">{section.category}</h2>
                        <div className="space-y-2">
                            {section.items.map((faq, fIndex) => {
                                const key = `${sIndex}-${fIndex}`
                                return (
                                    <div key={key} className="border border-gray-200">
                                        <button onClick={() => setOpenFaq(openFaq === key ? null : key)}
                                                className="w-full flex justify-between items-center px-4 md:px-6 py-4 text-left">
                                            <span className="font-sans text-black font-medium text-sm">{faq.question}</span>
                                            <span className="text-black text-lg ml-4">{openFaq === key ? '−' : '+'}</span>
                                        </button>
                                        {openFaq === key && (
                                            <div className="px-4 md:px-6 pb-4">
                                                <p className="font-sans text-gray-500 text-sm leading-relaxed">{faq.answer}</p>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))}
                <div className="bg-gray-100 p-6 md:p-8 mt-8">
                    <h3 className="font-bebas text-black text-2xl tracking-wider mb-2">STILL NEED HELP?</h3>
                    <p className="font-sans text-gray-500 text-sm mb-4">Our support team is available Monday–Saturday, 10am–6pm IST.</p>
                    <p className="font-sans text-black text-sm font-medium">Email: <span className="underline">support@realwear.com</span></p>
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

export default HelpPage