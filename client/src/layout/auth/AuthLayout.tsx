import React, { type PropsWithChildren } from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout:React.FC<PropsWithChildren> = (props) => {
  return (
    <div className='w-screen min-h-screen p-3 bg-background flex items-center justify-center '>
        <div className='size-full flex flex-wrap'>
            <div className='w-full h-full '>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default AuthLayout