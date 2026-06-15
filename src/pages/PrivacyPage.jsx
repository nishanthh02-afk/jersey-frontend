import { useNavigate } from 'react-router-dom'

function PrivacyPage() {
    const navigate = useNavigate()

    const sections = [
        { title: 'INFORMATION WE COLLECT', content: 'We collect information you provide when creating an account, placing orders, or contacting us. This includes your name, email address, phone number, delivery address, and payment details. We also collect usage data such as pages visited and products viewed.' },
        { title: 'HOW WE USE YOUR INFORMATION', content: 'We use your information to process orders, send order confirmations and shipping updates, respond to customer support queries, improve our website and services, and send promotional emails (only if you opt in).' },
        { title: 'PAYMENT SECURITY', content: 'All payments are processed through Razorpay, a PCI-DSS compliant payment gateway. Realwear does not store your card or bank details on our servers. All transactions are encrypted using SSL technology.' },
        { title: 'SHARING YOUR INFORMATION', content: 'We do not sell your personal data to third parties. We share your information only with delivery partners to fulfil your orders, and with Razorpay for payment processing. All partners are bound by confidentiality agreements.' },
        { title: 'COOKIES', content: 'We use cookies to improve your browsing experience, remember your preferences, and analyse website traffic. You can manage cookie preferences in your browser settings or via our Cookie Settings page.' },
        { title: 'YOUR RIGHTS', content: 'You have the right to access, correct, or delete your personal data at any time. To make a request, email us at privacy@realwear.com. We will respond within 7 business days.' },
        { title: 'DATA RETENTION', content: 'We retain your personal data for as long as your account is active or as needed to provide services. Order data is retained for 7 years for legal and tax compliance purposes.' },
        { title: 'CHANGES TO THIS POLICY', content: 'We may update this privacy policy from time to time. Any changes will be posted on this page with an updated effective date. Continued use of Realwear after changes constitutes acceptance of the updated policy.' },
    ]

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

            <div className="px-20 py-16 border-b border-gray-200">
                <p className="font-sans text-gray-500 text-sm tracking-widest mb-2">LEGAL</p>
                <h1 className="font-bebas text-black text-6xl tracking-wider">PRIVACY POLICY</h1>
                <p className="font-sans text-gray-500 text-base mt-2">Effective date: January 1, 2024</p>
            </div>

            <div className="px-20 py-16 max-w-4xl">
                <p className="font-sans text-gray-500 text-sm leading-relaxed mb-12">At Realwear, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information when you use our website and services.</p>
                {sections.map((section, index) => (
                    <div key={index} className="mb-10 border-b border-gray-100 pb-10">
                        <h2 className="font-bebas text-black text-2xl tracking-widest mb-3">{section.title}</h2>
                        <p className="font-sans text-gray-500 text-sm leading-relaxed">{section.content}</p>
                    </div>
                ))}
                <p className="font-sans text-gray-400 text-xs mt-8">For privacy-related queries, contact us at privacy@realwear.com</p>
            </div>

            <div className="bg-black w-full px-20 py-16 mt-8">
                <div className="border-t border-gray-800 pt-8 flex justify-between items-center">
                    <p className="text-white font-sans text-sm">© 2026 Realwear. All rights reserved.</p>
                    <div className="flex gap-6">
                        <span className="text-white text-sm font-sans hover:underline cursor-pointer" onClick={() => navigate('/terms')}>Terms & Conditions</span>
                        <span className="text-white text-sm font-sans hover:underline cursor-pointer" onClick={() => navigate('/cookies')}>Cookie Settings</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrivacyPage