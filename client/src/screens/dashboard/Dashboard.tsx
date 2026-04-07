import React from 'react'
import CustomTable from '../../components/table/Table'
import jsondata from '../../data/sample.json'
const Dashboard: React.FC = () => {
    const leaveOverview = [
        {
            label: 'Total',
            value: '20'
        },
        {
            label: 'Sick',
            value: '5'
        },
        {
            label: 'Casual',
            value: '8'
        },
        {
            label: 'Paid',
            value: '7'
        }
    ]
    const bg = ['bg-emerald-200', 'bg-red-200', 'bg-yellow-100', 'bg-purple-200']
    return (
        <div className='p-3 flex flex-col gap-3'>
            <div className='bg-white p-3 rounded-lg shadow-sm'>
                <div className='w-full flex justify-between gap-3'>
                    {
                        leaveOverview.map((ele, index) => (
                            <div className={'flex p-2 w-1/4 rounded-lg items-center gap-3 px-5 justify-between ' + bg[index]} key={index}>
                                <div>
                                    <h1 className='text-lg font-medium'>{ele.label} Leaves</h1>
                                </div>
                                <h1 className='text-2xl'>{ele.value} <span className='text-sm font-bold '>days</span></h1>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='w-full flex flex-col bg-white p-3 rounded-lg shadow-sm gap-3 '>
                <div className='flex items-center justify-between'>
                    <h1>Recent Leave Request</h1>
                    <button className='text-sm p-2 px-4 bg-red-200 rounded-md hover:bg-red-300'>
                        Apply Leave
                    </button>
                </div>
                <div>
                    <CustomTable data={jsondata['leave']} onClick={()=> {}}/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard