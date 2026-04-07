import React from 'react'
import Badge from '../badge/Badge'

interface CardProps {
    name: string
    email: string
    onLeave: boolean
    role: string
}
interface MemberCardProps {
    data: CardProps
}
const MembersCard: React.FC<MemberCardProps> = (props) => {

    const bg = ['bg-red-400', 'bg-emerald-400', 'bg-purple-400', 'bg-pink-400']
    return (
        <div className=' border border-white/[0.09] bg-gradient-to-br from-white/[0.07] to-transparent backdrop-blur-sm shadow-xl w-full rounded-lg p-3 flex gap-4'>
            <div className={'px-3 py-2 rounded-full  w-max ' + bg[Math.floor(Math.random() * bg.length)]}><h2>{props.data.name[0].toLocaleUpperCase()}</h2></div>
            <div className='flex items-center justify-between w-full'>
                <div>
                <h2 className='text-txt-main'>{props.data.name}</h2>
                <h3 className='text-xs text-txt-sub'>{props.data.role}</h3>
            </div>
            <div>
                <Badge type={!props.data.onLeave ? 'Approved': ''}>{props.data.onLeave ? 'No Available': 'Available'}</Badge>
            </div>
            </div>
        </div>
    )
}

export default MembersCard