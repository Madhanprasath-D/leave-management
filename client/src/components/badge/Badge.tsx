import React, { type PropsWithChildren } from 'react'
interface BadgeProps extends PropsWithChildren {
    type: string
}
const Badge: React.FC<BadgeProps> = (props) => {
    var bg = ''
    if(props.type.toLocaleLowerCase() == 'approved'){
        bg = 'bg-emerald-400/40 border border-emerald-600 text-txt-main'
    } else if (props.type.toLocaleLowerCase() == 'pending'){
        bg = 'bg-yellow-400/40  border border-yellow-400 text-txt-main'
    } else {
        bg = 'bg-red-400/50  border border-red-500 text-txt-main'
    }
    return (
        <div className={'p-0.5 px-2 rounded-md  text-center w-max ' + bg}>
            <h5 className='text-xs'>{props.children}</h5>
        </div>
    )
}

export default Badge