import React from 'react'
import CustomTable from '../../components/table/Table'
import jsondata from '../../data/sample.json'

const History: React.FC = () => {
    return (
        <div className='p-3'>
            <div className='w-full flex flex-col p-3 rounded-lg gap-3  border border-white/[0.09] bg-gradient-to-br from-white/[0.07] to-transparent backdrop-blur-sm shadow-xl '>
                <div className='flex items-center justify-between'>
                    <h1 className='text-txt-main'>All Leave Request</h1>
                    <button className='text-sm p-2 px-4 bg-red-200 rounded-md hover:bg-red-300'>
                        Apply Leave
                    </button>
                </div>
                <div>
                    <CustomTable data={jsondata['leave']} onClick={() => { }} />
                </div>
            </div>
        </div>
    )
}

export default History