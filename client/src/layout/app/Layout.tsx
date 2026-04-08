import React, { useState, useEffect, useRef } from 'react'
import type { NavMenuItem } from '../../utils/Types'
import { BadgePlus, Box, ClipboardClock, LogOut, Menu, Users, X } from 'lucide-react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useUser } from '../../contexts/auth/UserContext'

const Layout: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { user, logout } = useUser()

    // Desktop: sidebar expanded/collapsed
    const [desktopOpen, setDesktopOpen] = useState(true)
    // Mobile: sidebar visible/hidden (hidden by default)
    const [mobileOpen, setMobileOpen] = useState(false)

    const sidebarRef = useRef<HTMLDivElement>(null)

    // Close mobile sidebar when route changes
    useEffect(() => {
        setMobileOpen(false)
    }, [location.pathname])

    // Close mobile sidebar when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                mobileOpen &&
                sidebarRef.current &&
                !sidebarRef.current.contains(e.target as Node)
            ) {
                setMobileOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [mobileOpen])

    const menu: NavMenuItem[] = [
        {
            label: 'Dashboard',
            value: 'dashboard',
            link: '/dashboard',
            icon: <Box size={20} />,
            role: ['manager', 'employee']
        },
        {
            label: 'Apply Leave',
            value: 'apply-leave',
            link: '/apply',
            icon: <BadgePlus size={20} />,
            role: ['employee']
        },
        {
            label: 'History',
            value: 'history',
            link: '/history',
            icon: <ClipboardClock size={20} />,
            role: ['manager', 'employee']
        },
        {
            label: 'Members',
            value: 'members',
            link: '/members',
            icon: <Users size={20} />,
            role: ['manager']
        },
    ]

    const pageTitle = location.pathname.split('/')[1]
    const formattedTitle = pageTitle
        ? pageTitle[0].toUpperCase() + pageTitle.slice(1)
        : ''

    return (
        <div className='w-screen h-screen bg-background flex overflow-hidden'>

            {mobileOpen && (
                <div
                    className='fixed inset-0 z-20 bg-black/50 md:hidden'
                    onClick={() => setMobileOpen(false)}
                />
            )}

            <div
                ref={sidebarRef}
                className={[
                    'h-full border-r border-white/20 bg-background flex flex-col transition-all duration-300 ease-in-out z-30',

                    'fixed md:static',
                    mobileOpen ? 'translate-x-0' : '-translate-x-full',
                    'md:translate-x-0',

                    desktopOpen ? 'w-64' : 'md:w-16',
                    'w-64', 
                ].join(' ')}
            >
                <div className={`flex items-center p-2 ${desktopOpen ? 'justify-between' : 'md:justify-center justify-between'}`}>
                    <h4 className={`pl-3 text-main-text transition-all duration-300 ${desktopOpen ? 'opacity-100' : 'md:hidden opacity-100'}`}>
                        <span className='text-xl font-bold'>S</span>anyark
                    </h4>

                    <button
                        onClick={() => setDesktopOpen(!desktopOpen)}
                        className='hidden md:flex p-2 hover:bg-white/10 rounded items-center'
                    >
                        <Menu size={20} strokeWidth={1.25} color='#f8fafc' />
                    </button>

                    <button
                        onClick={() => setMobileOpen(false)}
                        className='md:hidden p-2 hover:bg-white/10 rounded flex items-center'
                    >
                        <X size={20} strokeWidth={1.25} color='#f8fafc' />
                    </button>
                </div>

                <nav className='flex flex-col p-3 gap-2 flex-1'>
                    {menu.map((ele) =>
                        ele.role.includes(user?.role as string) && (
                            <div
                                key={ele.value}
                                onClick={() => navigate(ele.link)}
                                title={!desktopOpen ? ele.label : undefined}
                                className={[
                                    'p-2 gap-2 rounded-md flex items-center cursor-pointer transition-all duration-300 ease-in-out',
                                    location.pathname.includes(ele.link)
                                        ? 'bg-select-tab text-button-primary'
                                        : 'text-sub-text hover:bg-white/5',
                                    !desktopOpen ? 'md:justify-center' : '',
                                ].join(' ')}
                            >
                                <div className='flex-shrink-0'>{ele.icon}</div>
                                <h4 className={`text-sm font-bold whitespace-nowrap transition-all duration-300 ${desktopOpen ? 'opacity-100' : 'md:hidden opacity-100'}`}>
                                    {ele.label}
                                </h4>
                            </div>
                        )
                    )}
                </nav>
            </div>

            <div className='flex-1 flex flex-col h-full overflow-hidden'>

                <div className='w-full h-16 border-b border-white/20 p-2 flex justify-between items-center flex-shrink-0'>
                    <div className='flex items-center gap-2 p-2'>
                        <button
                            onClick={() => setMobileOpen(true)}
                            className='md:hidden p-1.5 hover:bg-white/10 rounded flex items-center'
                        >
                            <Menu size={20} strokeWidth={1.25} color='#f8fafc' />
                        </button>
                        <h1 className='pl-1 text-lg font-bold text-white'>{formattedTitle}</h1>
                    </div>

                    <div className='flex items-center gap-4 h-full pr-2'>
                        <button
                            onClick={() => { logout(); navigate('/login') }}
                            className='p-2 hover:bg-red-400/20 rounded-md cursor-pointer transition-colors'
                        >
                            <LogOut size={20} strokeWidth={1.25} color='#94A3B8' />
                        </button>

                        <div className='w-0.5 min-h-9 rounded-xl bg-gray-400/50' />

                        <div className='flex items-center gap-3'>
                            <div className='md:flex flex-col items-end hidden'>
                                <h1 className='text-sm font-bold text-main-text'>{user?.name}</h1>
                                <h5 className='text-xs text-gray-500'>{user?.email}</h5>
                            </div>
                            <div className='p-2 px-3.5 rounded-md bg-red-400 h-max'>
                                <h1 className='text-lg font-medium'>{user?.name?.[0]}</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex-1 overflow-auto pb-32 bg-light-bg'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout   