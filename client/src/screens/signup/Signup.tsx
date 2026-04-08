import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { UserSignUp } from '../../invoke/InvokeAPI'
import { useUser } from '../../contexts/auth/UserContext'
import { Eye, EyeClosed, LoaderCircle } from 'lucide-react'

const Signup: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { login } = useUser()

    const [showPassword, setShowPassword] = useState(false)
    const [showCPassword, setShowCPassword] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [loading, setLoading] = useState(false)

    const validate = () => {
        const newErrors: { [key: string]: string } = {}
        if (!name) newErrors.name = 'Name is required'
        if (!email) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Invalid email format'
        }
        if (!password) {
            newErrors.password = 'Password is required'
        } else if (password.length < 6) {
            newErrors.password = 'Minimum 6 characters required'
        }
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSignup = async () => {
        if (!validate()) return
        setLoading(true)
        try {
            const res = await UserSignUp(JSON.stringify({ name, email, password }))
            const data = res.data
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            login(data.user)
            navigate('/dashboard')
        } catch (err: any) {
            setErrors({ global: err.message })
        } finally {
            setLoading(false)
        }
    }

    const tabs = [
        { label: 'Login', value: 'login' },
        { label: 'Sign up', value: 'sign-up' },
    ]

    return (
        <div className='w-full h-full flex items-center justify-center px-4 py-8'>

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
                    <h2 className='text-2xl font-semibold text-txt-main'>Create an account</h2>
                    <p className='text-sm text-txt-sub'>Fill in the details below to get started</p>
                </div>

                {/* Global error */}
                {errors.global && (
                    <div className='w-full bg-red-500/10 border border-red-500/30 rounded-md px-3 py-2'>
                        <p className='text-xs text-red-400'>{errors.global}</p>
                    </div>
                )}

                {/* Form */}
                <div className='w-full flex flex-col gap-4'>

                    {/* Name */}
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-semibold text-txt-sub'>Full Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type='text'
                            placeholder='Enter your name'
                            className={`p-2.5 border-2 w-full rounded-md bg-appbg-section text-txt-sub text-sm
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                transition-colors ${errors.name ? 'border-red-500/60' : 'border-white/20'}`}
                        />
                        {errors.name && <p className='text-xs text-red-400'>{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-semibold text-txt-sub'>Email address</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type='email'
                            placeholder='Enter your email address'
                            className={`p-2.5 border-2 w-full rounded-md bg-appbg-section text-txt-sub text-sm
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                transition-colors ${errors.email ? 'border-red-500/60' : 'border-white/20'}`}
                        />
                        {errors.email && <p className='text-xs text-red-400'>{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-semibold text-txt-sub'>Password</label>
                        <div className='flex items-center gap-2'>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                        {errors.password && <p className='text-xs text-red-400'>{errors.password}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-semibold text-txt-sub'>Confirm Password</label>
                        <div className='flex items-center gap-2'>
                            <input
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type={showCPassword ? 'text' : 'password'}
                                placeholder='Re-enter your password'
                                className={`p-2.5 border-2 w-full rounded-md bg-appbg-section text-txt-sub text-sm
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    transition-colors ${errors.confirmPassword ? 'border-red-500/60' : 'border-white/20'}`}
                            />
                            <button
                                type='button'
                                onClick={() => setShowCPassword(!showCPassword)}
                                className='p-1.5 text-txt-sub hover:text-txt-main transition-colors flex-shrink-0'
                            >
                                {showCPassword ? <Eye size={18} color='#94A3B8' /> : <EyeClosed size={18} color='#94A3B8' />}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className='text-xs text-red-400'>{errors.confirmPassword}</p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        disabled={loading}
                        onClick={handleSignup}
                        className='w-full bg-button-primary hover:bg-button-primary/80 disabled:opacity-60 disabled:cursor-not-allowed
                            p-3 rounded-lg font-medium text-white text-sm flex items-center justify-center
                            transition-colors mt-1'
                    >
                        {loading ? <LoaderCircle className='animate-spin' size={20} /> : 'Sign Up'}
                    </button>
                </div>

                {/* Footer */}
                <p className='text-sm text-txt-sub text-center'>
                    Already have an account?{' '}
                    <span
                        onClick={() => navigate('/login')}
                        className='text-txt-link cursor-pointer hover:underline ml-1 font-medium'
                    >
                        Login
                    </span>
                </p>

            </div>
        </div>
    )
}

export default Signup