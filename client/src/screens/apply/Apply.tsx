import React from 'react'
import Select from 'react-select'
import CustomDatePicker from '../../components/datepicker/Datepicker'
import { useNavigate } from 'react-router-dom'

const Apply: React.FC = () => {
    const navigate = useNavigate()
    const options = [
        { value: "casual", label: "Casual Leave" },
        { value: "sick", label: "Sick Leave" },
        { value: "paid", label: "Paid Leave" },
    ];

    const customStyles = {
        control: (base, state) => ({
            ...base,
            backgroundColor: "#1e293b",
            borderColor: state.isFocused ? "#3B82F6" : "#334155",
            boxShadow: state.isFocused ? "0 0 0 2px #3B82F6" : "none",
            borderRadius: "8px",
            padding: "2px",
            "&:hover": {
                borderColor: "#3B82F6",
            },
        }),

        menu: (base) => ({
            ...base,
            backgroundColor: "#1F263B",
            borderRadius: "8px",
            overflow: "hidden",
        }),

        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused
                ? "#1F263B"
                : state.isSelected
                    ? "#3B82F6"
                    : "transparent",
            color: "white",
            cursor: "pointer",
        }),

        singleValue: (base) => ({
            ...base,
            color: "white",
        }),

        placeholder: (base) => ({
            ...base,
            color: "#94A3B8",
        }),

        dropdownIndicator: (base) => ({
            ...base,
            color: "#94A3B8",
            "&:hover": {
                color: "white",
            },
        }),

        indicatorSeparator: () => ({
            display: "none",
        }),
    };

    return (
        <div className='p-4'>
            <div className='w-full h-full flex flex-col  border border-white/[0.09] bg-gradient-to-br from-white/[0.07] to-transparent backdrop-blur-sm shadow-xl p-3 rounded-lg gap-3'>
                <div className='flex items-center justify-between shadow-sm pb-3'>
                    <h1 className='text-xl text-txt-main'>New Leave Request</h1>

                </div>
                <div className='flex gap-7 h-full'>
                    <div className='w-1/2 flex flex-col gap-3'>
                        <div >
                            <h6 className='text-sm font-bold text-txt-sub mb-1'>Email address</h6>
                            <Select options={options} styles={customStyles}/>
                        </div>
                        <div >
                            <h6 className='text-sm font-bold text-txt-sub mb-1'>From</h6>

                            <div className='flex items-center gap-3'>
                                <CustomDatePicker />
                            </div>
                        </div>
                        <div >
                            <h6 className='text-sm font-bold text-txt-sub mb-1'>To</h6>
                            <div className='flex items-center gap-3'>
                                <CustomDatePicker />
                            </div>
                        </div>


                    </div>
                    <div className='w-1/2 h-full'>
                        <h6 className='text-sm font-bold text-txt-sub mb-1'>Reason</h6>
                        <div className='flex items-center gap-3'>
                            <textarea name="" id="" className='w-full h-56 border p-2 bg-appbg-section border-white/20 text-txt-sub focus:outline-none 
  focus:ring-2 focus:ring-blue-500 rounded-lg 
  focus:border-transparent' cols={10}>
                            </textarea>
                        </div>
                    </div>

                </div>
                <div className='justify-end flex gap-5'>
                    <button onClick={()=> navigate('/dashboard')} className='p-2 px-4 rounded-md bg-gray-200'>
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