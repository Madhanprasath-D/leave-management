import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { LavelValue } from '../../utils/Types'
import { UserSignUp } from '../../invoke/InvokeAPI'
import { useUser } from '../../contexts/auth/UserContext'
import { EyeClosed, LoaderCircle } from 'lucide-react'

const Signup: React.FC = (props) => {
  const [showPassword, setShowpassword] = useState<boolean>(false)
  const [showCPassword, setShowCpassword] = useState<boolean>(false)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const { login } = useUser();

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


  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name) newErrors.name = "Name is required";

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Min 6 characters required";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleSignup = async () => {
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await UserSignUp(JSON.stringify(
        {
          name,
          email,
          password
        }
      ));
      const data = res.data

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      login(data.user);

      navigate("/dashboard");

    } catch (err: any) {
      setErrors({ global: err.message });
    } finally {
      setLoading(false);
    }
  };


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
              value={name} onChange={(e) => setName(e.target.value)}
              className='p-2 border-2  w-full rounded-md bg-appbg-section border-white/20 text-txt-sub focus:outline-none 
  focus:ring-2 focus:ring-blue-500 
  focus:border-transparent'
              type="text" placeholder='Enter your Name' />
          </div>

          <div >
            <h6 className='text-sm font-bold text-txt-sub mb-1'>Email address</h6>
            <input
              value={email} onChange={(e) => setEmail(e.target.value)}
              className='p-2 border-2  w-full rounded-md bg-appbg-section border-white/20 text-txt-sub focus:outline-none 
  focus:ring-2 focus:ring-blue-500 
  focus:border-transparent'
              type="text" placeholder='Enter your email address' />
          </div>
          <div >
            <h6 className='text-sm font-bold text-txt-sub mb-1'>Password</h6>
            <div className='flex items-center gap-3'>
              <input
                value={password} onChange={(e) => setPassword(e.target.value)}
                className='p-2 border-2  w-full rounded-md bg-appbg-section border-white/20 text-txt-sub focus:outline-none 
  focus:ring-2 focus:ring-blue-500 
  focus:border-transparent'
                type={!showPassword ? 'password' : 'text'} placeholder='Enter your password' />
              
              <EyeClosed color={'#94A3B8'} onClick={() => setShowpassword(!showPassword)} className=' cursor-pointer' />

            </div>
          </div>

          <div >
            <h6 className='text-sm font-bold text-txt-sub mb-1'>Confirm password</h6>
            <div className='flex items-center gap-3'>
              <input
                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                className='p-2 border-2  w-full rounded-md bg-appbg-section border-white/20 text-txt-sub focus:outline-none 
  focus:ring-2 focus:ring-blue-500 
  focus:border-transparent'
                type={!showCPassword ? 'password' : 'text'} placeholder='Enter your password' />
              
              <EyeClosed color={'#94A3B8'} onClick={() => setShowCpassword(!showCPassword)} className=' cursor-pointer' />
              
            </div>
          </div>

          <div className='w-full'>
            <button
              disabled={loading}
              onClick={() => handleSignup()}
              className='w-full bg-button-primary hover:bg-button-primary/80 p-2 py-3 rounded-lg font-medium text-white'>
              {!loading ? 'Sign Up' :
                <LoaderCircle className=' animate-spin' />}
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