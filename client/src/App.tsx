import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './screens/login/Login'
import AuthLayout from './layout/auth/AuthLayout'
import Signup from './screens/signup/Signup'
import Layout from './layout/app/Layout'
import Dashboard from './screens/dashboard/Dashboard'
import Apply from './screens/apply/Apply'
import History from './screens/history/History'
import Members from './screens/members/Members'
import ProtectedRoute from './contexts/route/ProtectedRoute'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
      </Route>

      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/history" element={<History />} />
        <Route path="/members" element={<Members />} />
      </Route>
    </Routes>
  )
}

export default App
