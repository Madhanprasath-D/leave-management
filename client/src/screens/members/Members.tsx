import { CalendarCheck2, ClipboardClock, TicketCheck } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import jsondata from '../../data/sample.json'
import MembersCard from '../../components/card/MembersCard'
import { GetUsers } from '../../invoke/InvokeAPI'
const Members: React.FC = (props) => {

    const [members, setMembers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const data = await GetUsers('/users');
                console.log("Users:", data);

                setMembers(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className='p-3 flex flex-col gap-3 bg-light-bg'>
            <div className='w-full  h-max grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                {
                    members.map((ele, index) => (
                        <MembersCard data={ele} key={index}/>
                    ))
                }
            </div>

        </div>
    )
}

export default Members