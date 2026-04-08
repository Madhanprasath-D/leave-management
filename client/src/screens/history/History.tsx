import React from 'react'
import CustomTable from '../../components/table/Table'
import jsondata from '../../data/sample.json'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../contexts/auth/UserContext'

const History: React.FC = () => {
    const navigate = useNavigate()
    const {user} = useUser()
    const userDetails = {
        name: 'Madhanprasath',
        email: 'madhanprasath786@gmail.com',
        role: "ADMIN"
    }

    return (
        <div className='p-3'>
            <div className='w-full flex flex-col p-3 rounded-lg gap-3  border border-white/[0.09] bg-gradient-to-br from-white/[0.07] to-transparent backdrop-blur-sm shadow-xl '>
                <div className='flex items-center justify-between'>
                    <h1 className='text-txt-main'>All Leave Request</h1>
                    {user?.role == 'employee' && <button 
                    onClick={()=> navigate('/apply')}
                    className='text-sm p-2 px-4 bg-button-primary rounded-md hover:bg-button-primary/80'>
                        Apply Leave
                    </button>}
                </div>
                <div>
                    <CustomTable data={jsondata['leave']} onCancel={()=> {}} onApprove={()=>{}} role={userDetails.role}/>
                </div>
            </div>
        </div>
    )
}

export default History