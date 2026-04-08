import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { LavelValue } from '../../utils/Types'

const Signup: React.FC = (props) => {
  const [showPassword, setShowpassword] = useState<boolean>(false)
  const navigate = useNavigate()

  const menu: LavelValue[] = [
    {
      label: "Login",
      value: 'login'
    },
    {
      label: "Sign up",
      value: "sign-up"
    }
  ]


  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='w-2/3 flex flex-col items-center justify-center gap-5  border border-white/[0.09] bg-appbg-section rounded-lg p-4 backdrop-blur-sm shadow-xl'>
        <div className='flex gap-2 items-center justify-center'>
          {menu.map((ele) => (
            <div
              onClick={() => navigate(`/${ele.value}`)}
              className={location.pathname.includes(ele.value) ? ' text-button-primary border border-button-primary px-2 py-0.5 rounded-md cursor-pointer' : 'px-2 py-0.5 text-txt-sub cursor-pointer'}>
              <div className=''></div>
              <h5>{ele.label}</h5>
            </div>
          ))}
        </div>
        <div className='flex flex-col items-center justify-center mt-2 gap-2'>
          <h2 className='text-2xl font-medium text-txt-main'>Welcome back!</h2>
          <h6 className='text-txt-sub font-medium'>Please enter your details to login</h6>
        </div>
        <div className='w-full flex flex-col gap-5'>
          <div >
            <h6 className='text-sm font-bold  mb-1 text-txt-sub'>Name</h6>
            <input
            className='p-2 border-2  w-full rounded-md bg-appbg-section border-white/20 text-txt-sub focus:outline-none 
  focus:ring-2 focus:ring-blue-500 
  focus:border-transparent'
              type="text" placeholder='Enter your Name' />
          </div>

          <div >
            <h6 className='text-sm font-bold text-txt-sub mb-1'>Email address</h6>
            <input
            className='p-2 border-2  w-full rounded-md bg-appbg-section border-white/20 text-txt-sub focus:outline-none 
  focus:ring-2 focus:ring-blue-500 
  focus:border-transparent'
              type="text" placeholder='Enter your email address' />
          </div>
          <div >
            <h6 className='text-sm font-bold text-txt-sub mb-1'>Password</h6>
            <div className='flex items-center gap-3'>
              <input
              className='p-2 border-2  w-full rounded-md bg-appbg-section border-white/20 text-txt-sub focus:outline-none 
  focus:ring-2 focus:ring-blue-500 
  focus:border-transparent'
                type={!showPassword ? 'password' : 'text'} placeholder='Enter your password' />
              <div className='size-4 bg-emerald-300'
                onClick={() => setShowpassword(!showPassword)}
              ></div>
            </div>
          </div>

          <div >
            <h6 className='text-sm font-bold text-txt-sub mb-1'>Confirm password</h6>
            <div className='flex items-center gap-3'>
              <input
              className='p-2 border-2  w-full rounded-md bg-appbg-section border-white/20 text-txt-sub focus:outline-none 
  focus:ring-2 focus:ring-blue-500 
  focus:border-transparent'
                type={!showPassword ? 'password' : 'text'} placeholder='Enter your password' />
              <div className='size-4 bg-emerald-300'
                onClick={() => setShowpassword(!showPassword)}
              ></div>
            </div>
          </div>

          <div className='w-full'>
            <button className='w-full bg-button-primary hover:bg-button/80 p-2 py-3 rounded-lg font-medium text-white'>
              Sign up
            </button>
          </div>
        </div>
        <div>
          <h5 className='text-txt-sub'>Already have an account<span className='text-txt-link cursor-pointer hover:text-txt-link:80 ml-1 font-medium' onClick={() => navigate('/login')}>Login</span></h5>
        </div>
      </div>
    </div>
  )
}

export default Signup




// transition duration-300 ease focus:outline-none focus:border-red-500 hover:border-red-300 shadow-sm focus:shadow