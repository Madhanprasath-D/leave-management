import React, { useState } from 'react'
import type { NavMenuItem } from '../../utils/Types'
import { BadgePlus, Box, ClipboardClock, LogOut, Menu, Users } from 'lucide-react'
import { Outlet, useNavigate } from 'react-router-dom'

const Layout: React.FC = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(true)

    const menu: NavMenuItem[] = [
        {
            label: 'Dashboard',
            value: 'dashboard',
            link: '/dashboard',
            icon: <Box size={20} />,
            role: ['ADMIN', 'USER']
        },
        {
            label: 'Apply Leave',
            value: 'apply-leave',
            link: '/apply',
            icon: <BadgePlus size={20} />,
            role: ['ADMIN', 'USER']
        },
        {
            label: 'History',
            value: 'history',
            link: '/history',
            icon: <ClipboardClock size={20} />,
            role: ['ADMIN', 'USER']
        },
        {
            label: 'Request',
            value: 'request',
            link: '/request',
            icon: <Users size={20} />,
            role: ['ADMIN']
        },{
            label: 'Members',
            value: 'members',
            link: '/members',
            icon: <Users size={20} />,
            role: ['ADMIN']
        },
    ]

    const userDetails = {
        name: 'Madhanprasath',
        email: 'madhanprasath786@gmail.com',
        role: "ADMIN"
    }
    return (
        <div className='w-screen h-screen bg-background flex'>
            <div
                className={`${open ? "w-64" : "w-16"
                    } h-full  transition-all duration-500 ease-in-out border-r border-white/20`}
            >
                <div className='flex items-center justify-between p-2'>
                    {open ? <h4 className='pl-5 text-main-text'><span className='text-xl font-bold'>S</span>anyark</h4> : ''}
                    <button
                        onClick={() => setOpen(!open)}
                        className=" p-2 hover:bg-red-300 rounded flex items-center"
                    >
                        <Menu size={20} strokeWidth={1.25} color='#f8fafc'/>
                    </button>
                </div>
                <div className='flex flex-col p-3 gap-3 '>
                    {
                        menu.map((ele) => (
                            ele.role.includes(userDetails.role) && <div
                                onClick={() => navigate(ele.link)}
                                className={`${location.pathname.includes(ele.link) ? 'bg-select-tab text-button-primary' : 'text-sub-text'} p-2 gap-2 rounded-md flex items-center cursor-pointer  transition-all duration-500 ease-in-out`}>
                                <div>{ele.icon}</div>
                                {open && <h4 className='text-sm font-bold'>{ele.label}</h4>}
                            </div>
                        ))
                    }
                </div>

            </div>
            <div id="content" className='w-full h-full overflow-hidden bg-transparent'>
                <div className='w-full h-16 border-b border-white/20 shadow-white p-2 flex justify-between items-center'>
                    <div className='p-2'>
                        <h1 className='pl-3 text-lg font-bold text-white'>{location.pathname.split('/')[1][0].toUpperCase() + location.pathname.split('/')[1].slice(1)}</h1>
                    </div>
                    <div className='flex items-center gap-5 h-full'>
                        <div className='p-2 hover:bg-red-400 rounded-md cursor-pointer'>
                            <LogOut size={20} strokeWidth={1.25} color='#94A3B8'/>
                        </div>
                        <div className='w-0.5 min-h-9 rounded-xl bg-gray-400' />
                        <div className='flex items-center gap-2'>
                            <div className='flex flex-col items-end'>
                                <h1 className='text-sm font-bold text-main-text'>{userDetails.name}</h1>
                                <h5 className='text-sm text-gray-500'>{userDetails.email}</h5>
                            </div>
                            <div className='p-2 px-3 rounded-md bg-red-400'>
                                <h1>{userDetails.name[0]}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='h-full overflow-auto pb-32 bg-light-bg '>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout