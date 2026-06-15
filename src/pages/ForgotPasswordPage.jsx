import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../services/api'


function ForgotPasswordPage() {
    const navigate = useNavigate()
    const [step, setStep] = useState(1) // 1=email, 2=otp+newpassword
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSendOtp = async () => {
        if (!email) { setError('Please enter your email'); return }
        try {
            setLoading(true)
            setError('')
            await api.post('/auth/forgot-password', { email })
            setSuccess('OTP sent to your email')
            setStep(2)
        } catch {
            setError('No account found with this email')
        } finally {
            setLoading(false)
        }
    }

    const handleResetPassword = async () => {
        if (!otp || !newPassword) { setError('Please fill all fields'); return }
        if (newPassword.length < 8) { setError('Password must be at least 8 characters'); return }
        try {
            setLoading(true)
            setError('')
            await api.post('/auth/reset-password', { email, otp, newPassword })
            setSuccess('Password reset successfully!')
            setTimeout(() => navigate('/login'), 2000)
        } catch {
            setError('Invalid or expired OTP')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex">

            {/* Left side */}
            <div className="w-1/2 bg-black flex flex-col items-center justify-center p-16">
                <h1 className="font-sans text-white text-3xl font-semibold tracking-tight cursor-pointer" onClick={() => navigate('/home')}>
                    REAL<span className="font-barlow italic font-semibold relative -top-1 text-4xl">wear</span>
                </h1>
                <div className="mt-16 text-center">
                    <h2 className="font-bebas text-white text-5xl tracking-wider leading-tight">
                        RESET YOUR<br/>PASSWORD
                    </h2>
                    <p className="text-gray-400 font-sans text-sm mt-6 max-w-xs leading-relaxed">
                        Enter your email address and we'll send you a 6-digit OTP to reset your password.
                    </p>
                </div>
            </div>

            {/* Right side */}
            <div className="w-1/2 bg-white px-16 flex flex-col justify-center">
                <h2 className="font-sans text-black text-3xl font-bold">
                    {step === 1 ? 'FORGOT PASSWORD' : 'ENTER OTP'}
                </h2>
                <p className="font-sans text-gray-500 text-sm mt-2">
                    {step === 1
                        ? 'Enter your registered email address'
                        : `OTP sent to ${email}`
                    }
                </p>

                {success && (
                    <p className="text-[#408267] text-sm mt-4 font-sans">{success}</p>
                )}

                {step === 1 ? (
                    <>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="EMAIL ADDRESS *"
                            className="w-full bg-transparent border border-black border-b-4 border-b-gray-300 py-4 pl-4 text-black placeholder-gray-500 mt-8 focus:placeholder-transparent focus:outline-none focus:border-b-black"
                        />
                        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                        <button
                            onClick={handleSendOtp}
                            disabled={loading}
                            className="mt-8 bg-black text-white font-sans tracking-widest text-sm font-medium px-8 py-4 w-full hover:bg-gray-800 disabled:opacity-50"
                        >
                            {loading ? 'SENDING...' : 'SEND OTP →'}
                        </button>
                    </>
                ) : (
                    <>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="ENTER OTP *"
                            maxLength={6}
                            className="w-full bg-transparent border border-black border-b-4 border-b-gray-300 py-4 pl-4 text-black placeholder-gray-500 mt-8 focus:placeholder-transparent focus:outline-none focus:border-b-black tracking-widest text-lg"
                        />
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            maxLength={8}
                            placeholder="NEW PASSWORD *"
                            className="w-full bg-transparent border border-black border-b-4 border-b-gray-300 py-4 pl-4 text-black placeholder-gray-500 mt-4 focus:placeholder-transparent focus:outline-none focus:border-b-black"
                        />
                        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                        <button
                            onClick={handleResetPassword}
                            disabled={loading}
                            className="mt-8 bg-black text-white font-sans tracking-widest text-sm font-medium px-8 py-4 w-full hover:bg-gray-800 disabled:opacity-50"
                        >
                            {loading ? 'RESETTING...' : 'RESET PASSWORD →'}
                        </button>
                        <p
                            onClick={() => { setStep(1); setError(''); setSuccess('') }}
                            className="font-sans text-gray-500 text-sm mt-4 underline cursor-pointer hover:text-black"
                        >
                            ← Back to email
                        </p>
                    </>
                )}

                <p className="font-sans text-black text-sm mt-8">
                    Remember your password?{' '}
                    <span
                        onClick={() => navigate('/login')}
                        className="underline cursor-pointer font-medium hover:text-gray-500"
                    >
                        Log in
                    </span>
                </p>
            </div>
        </div>
    )
}

export default ForgotPasswordPage