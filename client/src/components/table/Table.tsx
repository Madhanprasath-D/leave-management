import React from "react";
import Badge from "../badge/Badge";
import { CircleCheck, CircleX, Stamp } from "lucide-react";
import PopUp from "../popup/PopUp";


interface TableDataInfo {
    id: string
    leaveType: string
    from: string
    to: string
    days: string
    reason: string
    status: string
    approvedby: string
}
interface componentsProps {
    data: TableDataInfo[]
    role: string
    onApprove?: (e) => void
    onCancel: (e) => void
}

const CustomTable: React.FC<componentsProps> = (props) => {
    return (
        <div className="shadow overflow-hidden rounded-lg">
            <table className="min-w-full text-sm text-left text-gray-700 ">
                <thead className=" text-xs text-txt-main uppercase m-2 bg-appbg-section border border-white/20">
                    <tr>
                        <th className="px-6 py-3">Leave type</th>
                        <th className="px-6 py-3">From</th>
                        <th className="px-6 py-3">To</th>
                        <th className="px-6 py-3">Days</th>
                        <th className="px-6 py-3">status</th>
                        <th className="px-6 py-3">{props.role == 'ADMIN' ? 'Name' : 'approvedby'}</th>
                        <th className="px-6 py-3">Action</th>
                    </tr>
                </thead>

                <tbody className="">
                    {
                        props.data.map((ele) => (
                            <tr className=" transition bg-appbg-section border border-white/20">
                                <td className="px-6 py-4 font-medium text-txt-sub flex gap-2 items-center">
                                    <div className="size-2 rounded-full bg-red-300" />
                                    {ele.leaveType}
                                </td>
                                <td className="px-6 py-4 font-medium text-txt-sub">{ele.from}</td>
                                <td className="px-6 py-4 font-medium text-txt-sub">{ele.to}</td>
                                <td className="px-6 py-4 font-medium text-txt-sub">{ele.days}</td>
                                <td className="px-6 py-4">
                                    <Badge type={ele.status}>{ele.status}</Badge>
                                </td>
                                <td className="px-6 py-4 font-medium text-txt-sub">{ele.approvedby}</td>
                                <td className="px-6 py-4">
                                    <PopUp lable="view">
                                        <div className='flex flex-col gap-3 relative'>
                                            <div className='border-b border-white/20 pb-4'>
                                                <div className='flex gap-3 items-center'>
                                                    <div className='p-3 bg-blue-300 rounded-md'>
                                                        <Stamp size={20} strokeWidth={1.25} />
                                                    </div>
                                                    <div>
                                                        <h1 className='font-bold text-txt-main'>Review leave request</h1>
                                                        <h3 className='text-sm text-txt-sub '>Employee: <span>{ele.approvedby}</span></h3>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='bg-gray-400/30 border border-gray-400 p-3 px-4 flex flex-col gap-3 rounded-md '>
                                                <div className='flex items-center justify-between'>
                                                    <h2 className=' uppercase text-sm font-medium text-txt-main'>Duration</h2>
                                                    <h2 className='text-sm text-black'>{ele.days} Days</h2>
                                                </div>
                                                <div className='flex items-center justify-between'>
                                                    <h2 className=' uppercase text-sm font-medium text-txt-main'>Dates</h2>
                                                    <h2 className='text-sm text-black'>{ele.from} - {ele.to}</h2>
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
                                            <div className='flex flex-col gap-2 rounded-md text-wrap'>
                                                <h1 className='text-sm text-txt-main'>Comment</h1>
                                                <textarea name="" id="" 
                                                disabled={ele.status.toLocaleLowerCase() != 'pending'}
                                                className='w-full h-28 border p-2 bg-appbg-section border-white/20 text-txt-sub focus:outline-none 
                                                    focus:ring-2 focus:ring-blue-500 rounded-lg 
                                                    focus:border-transparent'></textarea>
                                            </div>
                                            <div className='justify-center flex gap-5'>
                                                {props.role == 'ADMIN' ? <>
                                                    <button 
                                                    disabled={ele.status.toLocaleLowerCase() != 'pending'}
                                                        className='p-2 px-4 rounded-md bg-red-300 hover:bg-red-300/80 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400'>
                                                        Reject
                                                    </button>
                                                    <button 
                                                    disabled={ele.status.toLocaleLowerCase() != 'pending'}
                                                    className='p-2 px-4 rounded-md bg-green-300 hover:bg-green-300/80 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400'>
                                                        Approve
                                                    </button>
                                                </> :
                                                    <button 
                                                    disabled={ele.status.toLocaleLowerCase() != 'pending'}
                                                    className={'p-2 px-4 rounded-md bg-red-300 hover:bg-red-300/80 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400'}>
                                                        Revoke
                                                    </button>}
                                            </div>
                                        </div>
                                    </PopUp>
                                    {/* {
                                        props.role == 'ADMIN' ?
                                            <div className="flex gap-2">
                                                <CircleCheck size={20} strokeWidth={2} color="green" onClick={()=> props.onApprove(ele.id)} className=" cursor-pointer"/>
                                                <CircleX size={20}  strokeWidth={2} color="red" onClick={()=> props.onCancel(ele.id)} className=" cursor-pointer"/>
                                            </div> :
                                            <button
                                                onClick={() => props.onCancel(ele.id)}
                                                className="text-red-400 hover:text-red-600 font-bold cursor-pointer" disabled={ele.status != 'Pending'}>Cancel</button>
                                    } */}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default CustomTable;