import { Route, Routes } from 'react-router-dom'
import Login from './screens/login/Login'
import AuthLayout from './layout/auth/AuthLayout'
import Signup from './screens/signup/Signup'
import Layout from './layout/app/Layout'
import Dashboard from './screens/dashboard/Dashboard'
import Apply from './screens/apply/Apply'
import History from './screens/history/History'

function App() {

  return (
    <Routes>
      <Route path='/' element={<AuthLayout/>}>
        <Route path='/login' element={<Login/>}/>
        <Route path='sign-up' element={<Signup/>}/>
      </Route>
      <Route path='/' element={<Layout/>}>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/apply' element={<Apply/>}/>
        <Route path='/history' element={<History/>}/>
        <Route path='/request' element={<Dashboard/>}/>
      </Route>
    </Routes>
  )
}

export default App
