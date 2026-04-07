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
        <div className="shadow overflow-hidden rounded-lg">
            <table className="min-w-full text-sm text-left text-gray-700 ">
                <thead className=" text-xs text-txt-main uppercase m-2 bg-appbg-section border border-white/20">
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
                                <td className="px-6 py-4 font-medium text-txt-sub">{ele.reason}</td>
                                <td className="px-6 py-4">
                                    <Badge type={ele.status}>{ele.status}</Badge>
                                </td>
                                <td className="px-6 py-4 font-medium text-txt-sub">{ele.approvedby}</td>
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