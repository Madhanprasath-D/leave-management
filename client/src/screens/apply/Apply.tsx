import React, { useState } from 'react'
import Select from 'react-select'
import CustomDatePicker from '../../components/datepicker/Datepicker'
import { useNavigate } from 'react-router-dom'
import { ApplyLeave } from '../../invoke/InvokeAPI'
import { LoaderCircle } from 'lucide-react'

const Apply: React.FC = () => {
    const navigate = useNavigate()

    const [leaveType, setLeaveType] = useState<any>(null);
    const [startDate, setStartDate] = useState<any>(null);
    const [endDate, setEndDate] = useState<any>(null);
    const [reason, setReason] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const options = [
        { value: "casual", label: "Casual Leave" },
        { value: "sick", label: "Sick Leave" },
        { value: "others", label: "Others" },
    ];

    const customStyles = {
        control: (base: any, state: any) => ({
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

        menu: (base: any) => ({
            ...base,
            backgroundColor: "#1F263B",
            borderRadius: "8px",
            overflow: "hidden",
        }),

        option: (base: any, state: any) => ({
            ...base,
            backgroundColor: state.isFocused
                ? "#1F263B"
                : state.isSelected
                    ? "#3B82F6"
                    : "transparent",
            color: "white",
            cursor: "pointer",
        }),

        singleValue: (base: any) => ({
            ...base,
            color: "white",
        }),

        placeholder: (base: any) => ({
            ...base,
            color: "#94A3B8",
        }),

        dropdownIndicator: (base: any) => ({
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


    const handleApply = async () => {
        if (!leaveType || !startDate || !endDate || !reason) {
            setError("All fields are required");
            return;
        }

        setLoading(true);

        try {
            const payload = {
                leave_type: leaveType.value,
                start_date: startDate.toISOString(),
                end_date: endDate.toISOString(),
                reason
            };

            await ApplyLeave(payload);

            navigate("/dashboard");

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-4'>
            <div className='w-full h-full flex flex-col  border border-white/[0.09] bg-gradient-to-br from-white/[0.07] to-transparent backdrop-blur-sm shadow-xl p-3 rounded-lg gap-3'>
                <div className='flex items-center justify-between shadow-sm pb-3'>
                    <h1 className='text-xl text-txt-main'>New Leave Request</h1>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-7 h-full flex-wrap'>
                    <div className=' flex flex-col gap-3'>
                        <div >
                            <h6 className='text-sm font-bold text-txt-sub mb-1'>Email address</h6>
                            <Select
                                options={options}
                                styles={customStyles}
                                value={leaveType}
                                onChange={(val) => setLeaveType(val)}
                            />
                        </div>
                        <div >
                            <h6 className='text-sm font-bold text-txt-sub mb-1'>From</h6>

                            <div className='flex items-center gap-3'>
                                <CustomDatePicker value={startDate} onChange={(e: any) => setStartDate(e)} />
                            </div>
                        </div>
                        <div >
                            <h6 className='text-sm font-bold text-txt-sub mb-1'>To</h6>
                            <div className='flex items-center gap-3'>
                                <CustomDatePicker value={endDate} onChange={(e: any) => setEndDate(e)} />
                            </div>
                        </div>


                    </div>
                    <div className='h-full'>
                        <h6 className='text-sm font-bold text-txt-sub mb-1'>Reason</h6>
                        <div className='flex items-center gap-3'>
                            <textarea
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                name="reason" id="reason" className='w-full h-56 border p-2 bg-appbg-section border-white/20 text-txt-main focus:outline-none 
  focus:ring-2 focus:ring-blue-500 rounded-lg 
  focus:border-transparent' cols={10}>
                            </textarea>
                        </div>
                    </div>

                </div>
                <div className='justify-center flex gap-5'>
                    <button onClick={() => navigate('/dashboard')} className='p-2 px-4 rounded-md bg-gray-200'>
                        cancel
                    </button>
                    <button
                        onClick={handleApply}
                        disabled={loading}
                        className='p-2 px-4 rounded-md bg-button-primary'>
                        {loading ? <LoaderCircle className=' animate-spin' color='white' /> : 'Apply'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Apply