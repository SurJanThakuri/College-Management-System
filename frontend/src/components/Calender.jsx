import React from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function Calender() {
    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={[
                    { title: 'Event 1', date: '2022-03-01' },
                    { title: 'Holiday', date: '2024-02-24' },
                    { title: 'Event 3', date: '2024-02-23' },
                ]}
                height={420}
            />
        </div>
    )
}

export default Calender
