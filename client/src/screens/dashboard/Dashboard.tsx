import React from 'react'
import { useUser } from '../../contexts/auth/UserContext'
import UserDashboard from './UserDashboard'
import AdminDashboard from './AdminDashboard'

const Dashboard: React.FC = () => {
    const {user} = useUser()
    return (
        <>
            {
                user?.role == "manager" ? 
                <AdminDashboard/> : 
                <UserDashboard/>
            }
        </>
    )
}


export default Dashboard

