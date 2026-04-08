import React, { type PropsWithChildren } from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout:React.FC<PropsWithChildren> = (props) => {
  return (
    <div className='w-screen h-screen p-3 bg-background'>
        <div className='size-full  flex flex-wrap'>
            <div className='w-3/5 h-full p-7 flex flex-col-reverse bg-[linear-gradient(to_bottom,rgba(0,0,0,0.1),rgba(0,0,0,0.8)),url(/images/backdrop.jpg)] bg-no-repeat bg-cover bg-center rounded-lg'>
                <div className='h-1/3 w-full bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40
'>
    Sanyark
                </div>
            </div>
            <div className='w-2/5 h-full '>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default AuthLayout