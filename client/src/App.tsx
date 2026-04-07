import { Route, Routes } from 'react-router-dom'
import Login from './screens/login/Login'
import AuthLayout from './layout/auth/AuthLayout'
import Signup from './screens/signup/Signup'
import Layout from './layout/app/Layout'

function App() {

  return (
    <Routes>
      <Route path='/' element={<AuthLayout/>}>
        <Route path='/login' element={<Login/>}/>
        <Route path='sign-up' element={<Signup/>}/>
      </Route>
      <Route path='/dashboard' element={<Layout/>}>
        <Route index element={<Layout/>}/>
      </Route>
    </Routes>
  )
}

export default App
