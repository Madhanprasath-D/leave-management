import React, { useEffect, useState } from 'react'
import CustomTable from '../../components/table/Table'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../contexts/auth/UserContext'
import { GetLeaves } from '../../invoke/InvokeAPI'
import { LoaderCircle } from 'lucide-react'

const History: React.FC = () => {
    const navigate = useNavigate()
    const { user } = useUser()
    const [leaveData, setLeaveData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchLeaves = async () => {
            setLoading(true);
            try {
                var endpoint:string
                if(user?.role == 'employee') {
                    endpoint = `/leaves/${user?.id}`
                } else {
                    endpoint = `/leaves`
                }
                const data = await GetLeaves(endpoint);
                console.log("Leaves:", data);
                setLeaveData(data.filter((ele:any)=> ele.status != 'PENDING'));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaves();
    }, []);

    return (
        <div className='p-3'>
            <div className='w-full flex flex-col p-3 rounded-lg gap-3  border border-white/[0.09] bg-gradient-to-br from-white/[0.07] to-transparent backdrop-blur-sm shadow-xl '>
                <div className='flex items-center justify-between'>
                    <h1 className='text-txt-main'>All Leave Request</h1>
                    {user?.role == 'employee' && <button
                        onClick={() => navigate('/apply')}
                        className='text-sm p-2 px-4 bg-button-primary rounded-md hover:bg-button-primary/80'>
                        Apply Leave
                    </button>}
                </div>
                <div>
                    {loading ? <div className='w-full flex items-center justify-between'>
                        <LoaderCircle className=' animate-spin' color='white'/>
                        </div> :
                        <CustomTable data={leaveData} onCancel={() => { }} onApprove={() => { }} role={user?.role as string} />}
                </div>
            </div>
        </div>
    )
}

export default History