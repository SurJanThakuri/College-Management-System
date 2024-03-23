import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function Calendar() {
    return (
        <div className="p-4">
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={[
                    { title: 'Event 1', date: '2022-03-01' },
                    { title: 'Holiday', date: '2024-03-20' },
                    { title: 'Event 3', date: '2024-03-19' },
                ]}
                height="80vh"
                aspectRatio={1.5}
                headerToolbar={{
                    left: 'prev',
                    center: 'title',
                    right: 'next'
                }}
                eventBackgroundColor="#4F46E5"
                eventBorderColor="#4F46E5"
                eventTextColor="#FFFFFF"
                dayMaxEventRows={true}
                eventDisplay="block"
                eventContent={renderEventContent}
                className="sm:w-full md:w-3/4 lg:w-1/2 xl:w-1/3 mx-auto px-4 py-0"
                dayHeaderContent={({ date }) => {
                    const day = date.getDay();
                    return ['S', 'M', 'T', 'W', 'T', 'F', 'S'][day];
                }}  
            />
        </div>
    );
}

function renderEventContent(eventInfo) {
    return (
        <>
            <div className="px-2 py-1 text-sm font-semibold">{eventInfo.timeText}</div>
            <div className="px-2 py-1">{eventInfo.event.title}</div>
        </>
    );
}

export default Calendar;
