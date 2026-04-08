import { useEffect, useState } from 'react'
import CustomTable from '../../components/table/Table'
import { CalendarCheck2, ClipboardClock, LoaderCircle, TicketCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../contexts/auth/UserContext'
import { GetLeaves, UpdateStatus } from '../../invoke/InvokeAPI'
import { SimpleSnackbar } from '../../components/toast/Toast'

const AdminDashboard = () => {
    const navigate = useNavigate()
    const { user } = useUser()
    const [leaveData, setLeaveData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState('')
    const leaveOverview = [
        {
            label: 'Total leave Request',
            value: '20'
        },
        {
            label: 'Pending Request',
            value: '5'
        },
        {
            label: 'Approved Request',
            value: '8'
        }
    ]

    const icon = [
        <CalendarCheck2 size={56} strokeWidth={2} color='#94A3B8' />,
        <ClipboardClock size={56} strokeWidth={2} color='#94A3B8' />,
        <TicketCheck size={56} strokeWidth={2} color='#94A3B8' />
    ]

    const handleChange = async (id: string, isApproved: boolean, msg: string) => {
        try {
            await UpdateStatus(`/leaves/${id}/update`, JSON.stringify({
                approve: isApproved,
                comment: msg
            }));
            fetchLeaves();
        } catch (err: any) {
            setOpen(true)
            setMsg(err.message)
            console.error(err.message);
        }
    };

    const fetchLeaves = async () => {
        setLoading(true);
        try {
            const endpoint = `/leaves?status=pending`
            const data = await GetLeaves(endpoint);
            setLeaveData(data);
        } catch (err: any) {
            setMsg(err.message)
            setOpen(true)
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchLeaves();
    }, []);


    return (
        <div className='p-3 flex flex-col gap-3 bg-light-bg'>
            <SimpleSnackbar
                open={open}
                color={'danger'}
                msg={msg}
                onClose={() => setOpen(false)}
            />
            <div className='px-2 flex items-center justify-between'>
                <div>
                    <h1 className='text-main-text text-2xl'>Welcome back! <span className='text-txt-link'>{user?.name}</span></h1>
                    <h5 className='text-sm my-2 text-txt-sub'>Review your leave request and status of pending request</h5>
                </div>
                <button onClick={() => navigate('/members')} className='text-sm p-2 px-4 bg-button-primary rounded-md hover:bg-button-primary/80'>
                    Members
                </button>
            </div>
            <div className='w-full  h-max flex flex-col lg:flex-row gap-3 flex-wrap'>
                {
                    leaveOverview.map((ele, index) => (
                        <div className={'flex  md:flex-1 relative flex-col p-2 rounded-lg gap-2 px-5 justify-between border border-white/[0.09] bg-gradient-to-br from-white/[0.07] to-transparent backdrop-blur-sm shadow-xl'} key={index}>
                            <div className='flex gap-3 items-center'>
                                <div className={'p-3 rounded-md absolute right-0 top-3 rotate-12 opacity-20'}>{icon[index]}</div>
                                <h1 className='text-lg font-medium text-main-text'>{ele.label}</h1>
                            </div>
                            <h1 className='text-2xl text-main-text'>{ele.value}</h1>
                        </div>
                    ))
                }
            </div>
            <div className='w-full flex flex-col p-3 gap-4 rounded-lg border border-white/[0.09] bg-gradient-to-br from-white/[0.07] to-transparent backdrop-blur-sm shadow-xl'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-txt-main'>New Leave Request</h1>
                </div>
                <div>
                    {loading ? <div className='w-full flex items-center justify-between'>
                        <LoaderCircle className=' animate-spin' color='white' />
                    </div> :
                        <CustomTable data={leaveData} onCancel={(e) => { }} onUpdate={(id, isApproved, msg) => handleChange(id, isApproved, msg)} role={user?.role as string} />}
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard