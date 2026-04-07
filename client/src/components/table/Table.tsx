import React from "react";
import Badge from "../badge/Badge";


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
    onClick: (e) => void
}

const CustomTable: React.FC<componentsProps> = (props) => {
    return (
        <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
            <table className="min-w-full text-sm text-left text-gray-700 ">
                <thead className="bg-slate-100 text-xs text-gray-600 uppercase">
                    <tr>
                        <th className="px-6 py-3">Leave type</th>
                        <th className="px-6 py-3">From</th>
                        <th className="px-6 py-3">To</th>
                        <th className="px-6 py-3">Days</th>
                        <th className="px-6 py-3">Reason</th>
                        <th className="px-6 py-3">status</th>
                        <th className="px-6 py-3">approvedby</th>
                        <th className="px-6 py-3">Action</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {
                        props.data.map((ele) => (
                            <tr className="hover:bg-slate-50 transition">
                                <td className="px-6 py-4 font-medium text-gray-900 flex gap-2 items-center">
                                    <div className="size-2 rounded-full bg-red-300" />
                                    {ele.leaveType}
                                </td>
                                <td className="px-6 py-4">{ele.from}</td>
                                <td className="px-6 py-4">{ele.to}</td>
                                <td className="px-6 py-4">{ele.days}</td>
                                <td className="px-6 py-4">{ele.reason}</td>
                                <td className="px-6 py-4">
                                    <Badge type={ele.status}>{ele.status}</Badge>
                                </td>
                                <td className="px-6 py-4">{ele.approvedby}</td>
                                <td className="px-6 py-4">
                                    <button 
                                    onClick={()=> props.onClick(ele.id)}
                                    className="text-red-400 hover:text-red-600 font-bold cursor-pointer" disabled={ele.status != 'Pending'}>Cancel</button>
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