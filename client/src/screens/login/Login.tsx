import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useUser } from '../../contexts/auth/UserContext'
import { Eye, EyeClosed, LoaderCircle } from 'lucide-react'
import { UserLogin } from '../../invoke/InvokeAPI'
import { SimpleSnackbar } from '../../components/toast/Toast'

const Login: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { login } = useUser()
    const [open, setOpen] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
    const [loading, setLoading] = useState(false)
    const [color, setColor] = useState<'primary' | 'neutral' | 'danger' | 'success' | 'warning'>('danger')

    const validate = () => {
        const newErrors: { email?: string; password?: string } = {}
        if (!email) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Invalid email format'
        }
        if (!password) {
            newErrors.password = 'Password is required'
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleLogin = async () => {
        if (!validate()) return
        setLoading(true)
        try {
            const res = await UserLogin(JSON.stringify({ email, password }))
            const data = res.data
            const expiryTime = Date.now() + 6 * 60 * 60 * 1000; // 6 hours
            localStorage.setItem('token', data.token)
            localStorage.setItem("auth", JSON.stringify({
                user: data.user,
                expiry: expiryTime
            }));
            login(data.user)
            navigate('/dashboard')
        } catch (err: any) {
            setErrors({ email: err.message })
            setColor('danger')
            setOpen(true)
        } finally {
            setLoading(false)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleLogin()
    }

    const tabs = [
        { label: 'Login', value: 'login' },
        { label: 'Sign up', value: 'sign-up' },
    ]

    return (
        <div className='w-full h-full flex items-center justify-center px-4 py-8'>
            <SimpleSnackbar
                open={open}
                color={color}
                msg={errors.email ?? errors.password}
                onClose={() => setOpen(false)}
            />

            <div className='w-full max-w-md flex flex-col items-center gap-6 border border-white/[0.09] bg-appbg-section rounded-xl p-6 sm:p-8 backdrop-blur-sm shadow-xl'>

                {/* Tab switcher */}
                <div className='flex gap-2 items-center justify-center'>
                    {tabs.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => navigate(`/${tab.value}`)}
                            className={
                                location.pathname.includes(tab.value)
                                    ? 'text-button-primary border border-button-primary px-3 py-1 rounded-md text-sm font-medium cursor-pointer'
                                    : 'px-3 py-1 text-txt-sub text-sm cursor-pointer hover:text-txt-main transition-colors'
                            }
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Header */}
                <div className='flex flex-col items-center gap-1 text-center'>
                    <h2 className='text-2xl font-semibold text-txt-main'>Welcome back!</h2>
                    <p className='text-sm text-txt-sub'>Please enter your details to login</p>
                </div>

                {/* Form */}
                <div className='w-full flex flex-col gap-4'>

                    {/* Email */}
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-semibold text-txt-sub'>Email address</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={handleKeyDown}
                            type='email'
                            placeholder='Enter your email address'
                            className={`p-2.5 border-2 w-full rounded-md bg-appbg-section text-txt-sub text-sm
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                transition-colors ${errors.email ? 'border-red-500/60' : 'border-white/20'}`}
                        />
                        {errors.email && (
                            <p className='text-xs text-red-400 mt-0.5'>{errors.email}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-semibold text-txt-sub'>Password</label>
                        <div className='flex items-center gap-2'>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={handleKeyDown}
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Enter your password'
                                className={`p-2.5 border-2 w-full rounded-md bg-appbg-section text-txt-sub text-sm
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    transition-colors ${errors.password ? 'border-red-500/60' : 'border-white/20'}`}
                            />
                            <button
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                                className='p-1.5 text-txt-sub hover:text-txt-main transition-colors flex-shrink-0'
                            >
                                {showPassword ? <Eye size={18} color='#94A3B8' /> : <EyeClosed size={18} color='#94A3B8' />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className='text-xs text-red-400 mt-0.5'>{errors.password}</p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        disabled={loading}
                        onClick={handleLogin}
                        className='w-full bg-button-primary hover:bg-button-primary/80 disabled:opacity-60 disabled:cursor-not-allowed
                            p-3 rounded-lg font-medium text-white text-sm flex items-center justify-center
                            transition-colors mt-1'
                    >
                        {loading ? <LoaderCircle className='animate-spin' size={20} /> : 'Log In'}
                    </button>
                </div>

                {/* Footer */}
                <p className='text-sm text-txt-sub text-center'>
                    Don't have an account yet?{' '}
                    <span
                        onClick={() => navigate('/sign-up')}
                        className='text-txt-link cursor-pointer hover:underline ml-1 font-medium'
                    >
                        Sign up
                    </span>
                </p>

            </div>
        </div>
    )
}

export default Login