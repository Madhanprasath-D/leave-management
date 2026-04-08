import React, { useState } from "react";
import Badge from "../badge/Badge";
import { CircleCheck, CircleX, LoaderCircle, Stamp } from "lucide-react";
import PopUp from "../popup/PopUp";


interface TableDataInfo {
    id: string
    leave_type: string
    start_date: string
    end_date: string
    days: string
    reason: string
    status: string
    approvedby: string
    user_name: string
    user_email: string
    manager_comment: string
}
interface componentsProps {
    data: TableDataInfo[]
    role: string
    onUpdate: (e: any, isApproved: boolean, msg: string) => void
    onCancel: (e: any) => void
}

const CustomTable: React.FC<componentsProps> = (props) => {
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');

    const getDays = (from: string, to: string) => {
        const start = new Date(from);
        const end = new Date(to);

        const diffInMs = end.getTime() - start.getTime();
        return Math.ceil(diffInMs / (1000 * 60 * 60 * 24)) + 1;
    }

    return (
        <div className="shadow box-border overflow-x-auto rounded-lg">
            <table className=" md:table-fixed min-w-full md:w-full text-sm text-left text-gray-700 ">
                <thead className=" text-xs text-txt-main uppercase m-2 bg-appbg-section border border-white/20">
                    <tr>
                        <th className="px-6 py-3">Leave type</th>
                        {props.role == 'manager' && <th className="px-6 py-3">Name</th>}
                        <th className="px-6 py-3">From</th>
                        <th className="px-6 py-3">To</th>
                        <th className="px-6 py-3">Days</th>
                        <th className="px-6 py-3">Reason</th>
                        <th className="px-6 py-3">status</th>
                        <th className="px-6 py-3">Action</th>
                    </tr>
                </thead>

                <tbody className="">
                    {   props.data.length > 0 ?
                        props.data.map((ele) => (
                            <tr className=" transition bg-appbg-section border border-white/20">
                                <td className="px-6 py-4 font-medium text-txt-sub flex gap-2 items-center">
                                    <div className="size-2 rounded-full bg-red-300" />
                                    {ele.leave_type}
                                </td>
                                {props.role == 'manager' && <td className="px-6 py-4 font-medium text-txt-sub">{ele.user_name}</td>}
                                <td className="px-6 py-4 font-medium text-txt-sub">{ele.start_date.split('T')[0]}</td>
                                <td className="px-6 py-4 font-medium text-txt-sub">{ele.end_date.split('T')[0]}</td>
                                <td className="px-6 py-4 font-medium text-txt-sub">{getDays(ele.start_date, ele.end_date)}</td>
                                <td className="px-6 py-4 font-medium text-txt-sub  truncate ">{ele.reason}</td>
                                <td className="px-6 py-4">
                                    <Badge type={ele.status}>{ele.status}</Badge>
                                </td>
                                <td className="px-6 py-4">
                                    <PopUp lable="view">
                                        <div className='flex flex-col gap-3 md:w-96 w-64'>
                                            <div className='border-b border-white/20 pb-4'>
                                                <div className='flex gap-3 items-center'>
                                                    <div className='p-3 bg-blue-300 rounded-md'>
                                                        <Stamp size={20} strokeWidth={1.25} />
                                                    </div>
                                                    <div>
                                                        <h1 className='font-bold text-txt-main'>Review leave request</h1>
                                                        <h3 className='text-sm text-txt-sub '>Employee: <span>{ele.user_name}</span></h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='bg-gray-400/30 border border-gray-400 p-3 px-4 flex flex-col gap-3 rounded-md '>
                                                <div className='flex items-center justify-between'>
                                                    <h2 className=' uppercase text-sm font-medium text-txt-main'>Duration</h2>
                                                    <h2 className='text-sm text-black'>{getDays(ele.start_date, ele.end_date)} Days</h2>
                                                </div>
                                                <div className='flex items-center justify-between'>
                                                    <h2 className=' uppercase text-sm font-medium text-txt-main'>Dates</h2>
                                                    <h2 className='text-sm text-black'>{ele.start_date.split('T')[0]} - {ele.end_date.split('T')[0]}</h2>
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-2 rounded-md text-wrap'>
                                                <h1 className='text-sm text-txt-main'>Reason</h1>
                                                <textarea name="" id=""
                                                    value={ele.reason}
                                                    disabled
                                                    className='text-sm w-full h-28 border p-2 bg-appbg-section border-white/20 text-txt-sub focus:outline-none 
                                                    focus:ring-2 focus:ring-blue-500 rounded-lg 
                                                    focus:border-transparent'></textarea>
                                            </div>
                                            {ele.manager_comment || props.role == 'manager' ? <div className='flex flex-col gap-2 rounded-md text-wrap'>
                                                <h1 className='text-sm text-txt-main'>Comment</h1>
                                                <textarea name="" id=""
                                                    value={ele.manager_comment ?? msg}
                                                    onChange={(e) => setMsg(e.target.value)}
                                                    disabled={ele.status.toLocaleLowerCase() != 'pending'}
                                                    className='w-full h-28 border p-2 bg-appbg-section border-white/20 text-txt-sub focus:outline-none 
                                                    focus:ring-2 focus:ring-blue-500 rounded-lg 
                                                    focus:border-transparent'></textarea>
                                            </div> : <></>}
                                            <div className='justify-center flex gap-5'>
                                                {props.role == 'manager' ? <>
                                                    <button
                                                        onClick={() => props.onUpdate(ele.id, false, msg)}
                                                        disabled={ele.status.toLowerCase() != 'pending'}
                                                        className='p-2 px-4 rounded-md bg-red-300 hover:bg-red-300/80 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400'>
                                                        Reject
                                                    </button>
                                                    <button
                                                        onClick={() => props.onUpdate(ele.id, true, msg)}
                                                        disabled={ele.status.toLowerCase() != 'pending'}
                                                        className='p-2 px-4 rounded-md bg-button-primary hover:bg-button-primary/80 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400'>
                                                        Approve
                                                    </button>
                                                </> :
                                                    <button
                                                        disabled={ele.status.toLowerCase() != 'pending'}
                                                        onClick={() => {
                                                            setLoading(true)
                                                            props.onCancel(ele.id)
                                                            setLoading(false)
                                                        }}
                                                        className={'p-2 px-4 rounded-md bg-red-300 hover:bg-red-300/80 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400'}>
                                                        {loading ? <LoaderCircle className=' animate-spin' color='white' /> : 'Revoke'}
                                                    </button>}
                                            </div>
                                        </div>
                                    </PopUp>
                                </td>
                            </tr> 
                        )) :
                       <div className="p-3 w-full col-span-5">
                            <h2 className="text-txt-sub">No data founded</h2>
                       </div>
                    }
                </tbody>
            </table>
        </div>
    );
};

export default CustomTable;