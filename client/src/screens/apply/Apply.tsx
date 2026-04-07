import React from 'react'
import Select from 'react-select'
import CustomDatePicker from '../../components/datepicker/Datepicker'

const Apply: React.FC = () => {
    return (
        <div className='p-4'>
            <div className='w-full h-full flex flex-col bg-white p-3 rounded-lg shadow-sm gap-3'>
                <div className='flex items-center justify-between shadow-sm pb-3'>
                    <h1 className='text-xl'>New Leave Request</h1>
                    <button className='text-sm p-2 px-4 bg-red-200 rounded-md hover:bg-red-300'>
                        Cancel
                    </button>
                </div>
                <div className='flex gap-7 h-full'>
                    <div className='w-1/2 flex flex-col gap-3'>
                        <div >
                            <h6 className='text-sm font-bold text-gray-700 mb-1'>Email address</h6>
                            <Select />
                        </div>
                        <div >
                            <h6 className='text-sm font-bold text-gray-700 mb-1'>From</h6>

                            <div className='flex items-center gap-3'>
                                <CustomDatePicker />

                            </div>
                        </div>
                        <div >
                            <h6 className='text-sm font-bold text-gray-700 mb-1'>To</h6>
                            <div className='flex items-center gap-3'>
                                <CustomDatePicker />
                            </div>
                        </div>


                    </div>
                    <div className='w-1/2 h-full'>
                        <h6 className='text-sm font-bold text-gray-700 mb-1'>Reason</h6>
                        <div className='flex items-center gap-3'>
                            <textarea name="" id="" className='w-full h-56 border-2 p-2' cols={10}>

                            </textarea>
                        </div>
                    </div>

                </div>
                <div className='justify-end flex gap-5'>
                    <button className='p-2 px-4 rounded-md bg-gray-200'>
                        cancel
                    </button>
                    <button className='p-2 px-4 rounded-md bg-green-300'>
                        Apply
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Apply