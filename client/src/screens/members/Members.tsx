import { CalendarCheck2, ClipboardClock, TicketCheck } from 'lucide-react'
import React from 'react'
import jsondata from '../../data/sample.json'
import MembersCard from '../../components/card/MembersCard'
const Members: React.FC = (props) => {

    const members = jsondata['members']


    const icon = [
        <CalendarCheck2 size={56} strokeWidth={2} color='#94A3B8' />,
        <ClipboardClock size={56} strokeWidth={2} color='#94A3B8' />,
        <TicketCheck size={56} strokeWidth={2} color='#94A3B8' />
    ]
    return (
        <div className='p-3 flex flex-col gap-3 bg-light-bg'>
            <div className='w-full  h-max grid grid-cols-3 gap-3 flex-wrap'>
                {
                    members.map((ele, index) => (
                        <MembersCard data={ele}/>
                    ))
                }
            </div>
           
        </div>
    )
}

export default Members