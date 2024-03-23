import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';

function Routine() {
    const [routines, setRoutines] = useState([]);
    const [loading, setLoading] = useState(true);

    // Simulated fetch routine data function
    const fetchRoutineData = () => {
        // Replace this with your actual fetch logic
        const dummyData = [
            {
                id: 1,
                faculty: 'BCA',
                semester: 'First',
                routine: [
                    {
                        day: 'Sunday', classes: [
                            { time: '6:30 AM - 7:30 AM', subject: 'N Methods', teacher: 'Mr. A' },
                            { time: '7:30 AM - 8:30 AM', subject: 'SE', teacher: 'Mr. S' },
                            { time: '9:00 AM - 10:00 AM', subject: 'Operating System', teacher: 'Mr. B' },
                            { time: '10:00 AM - 11:00 AM', subject: 'DBMS', teacher: 'Mr. B' },
                        ]
                    },
                    {
                        day: 'Monday', classes: [
                            { time: '6:30 AM - 7:30 AM', subject: 'Operating System', teacher: 'Mr. A' },
                            { time: '7:30 AM - 8:30 AM', subject: 'N Methods', teacher: 'Mr. B' },
                            { time: '9:00 AM - 10:00 AM', subject: 'Script. Lang', teacher: 'Mr. B' },
                            { time: '10:00 AM - 11:00 AM', subject: 'DBMS', teacher: 'Mr. B' },
                        ]
                    },
                    {
                        day: 'Tuesday', classes: [
                            { time: '6:30 AM - 7:30 AM', subject: 'N Methods', teacher: 'Mr. A' },
                            { time: '7:30 AM - 8:30 AM', subject: 'SE', teacher: 'Mr. S' },
                            { time: '9:00 AM - 10:00 AM', subject: 'Operating System', teacher: 'Mr. B' },
                            { time: '10:00 AM - 11:00 AM', subject: 'DBMS', teacher: 'Mr. B' },
                        ]
                    },
                    {
                        day: 'Wednesday', classes: [
                            { time: '6:30 AM - 7:30 AM', subject: 'Operating System', teacher: 'Mr. A' },
                            { time: '7:30 AM - 8:30 AM', subject: 'N Methods', teacher: 'Mr. B' },
                            { time: '9:00 AM - 10:00 AM', subject: 'Script. Lang', teacher: 'Mr. B' },
                            { time: '10:00 AM - 11:00 AM', subject: 'DBMS', teacher: 'Mr. B' },
                        ]
                    },
                    {
                        day: 'Thursday', classes: [
                            { time: '6:30 AM - 7:30 AM', subject: 'N Methods', teacher: 'Mr. A' },
                            { time: '7:30 AM - 8:30 AM', subject: 'SE', teacher: 'Mr. S' },
                            { time: '9:00 AM - 10:00 AM', subject: 'Operating System', teacher: 'Mr. B' },
                            { time: '10:00 AM - 11:00 AM', subject: 'DBMS', teacher: 'Mr. B' },
                        ]
                    },
                    {
                        day: 'Friday', classes: [
                            { time: '6:30 AM - 7:30 AM', subject: 'Operating System', teacher: 'Mr. A' },
                            { time: '7:30 AM - 8:30 AM', subject: 'N Methods', teacher: 'Mr. B' },
                            { time: '9:00 AM - 10:00 AM', subject: 'Script. Lang', teacher: 'Mr. B' },
                            { time: '10:00 AM - 11:00 AM', subject: 'DBMS', teacher: 'Mr. B' },
                        ]
                    },
                ],
            },
            {
                id: 2,
                faculty: 'BCA',
                semester: 'Second',
                routine: [
                    {
                        day: 'Monday', classes: [
                            { time: '6:30 AM - 7:30 AM', subject: 'Operating System', teacher: 'Mr. A' },
                            { time: '7:30 AM - 8:30 AM', subject: 'N Methods', teacher: 'Mr. B' },
                            { time: '9:00 AM - 10:00 AM', subject: 'Script. Lang', teacher: 'Mr. B' },
                            { time: '10:00 AM - 11:00 AM', subject: 'DBMS', teacher: 'Mr. B' },
                            // Add more classes for Monday
                        ]
                    },
                    {
                        day: 'Tuesday', classes: [
                            { time: '6:30 AM - 7:30 AM', subject: 'N Methods', teacher: 'Mr. A' },
                            { time: '7:30 AM - 8:30 AM', subject: 'SE', teacher: "Mr. S" },
                            { time: '9:00 AM - 10:00 AM', subject: 'Operating System', teacher: 'Mr. B' },
                            { time: '10:00 AM - 11:00 AM', subject: 'DBMS', teacher: 'Mr. B' },
                            // Add more classes for Tuesday
                        ]
                    },
                ],
            },
            // Add more dummy data for other faculties and semesters
        ];
        return dummyData;
    };

    useEffect(() => {
        const routineData = fetchRoutineData();
        setRoutines(routineData);
        setLoading(false);
    }, []);

    return (
        <div className='container min-w-full min-h-screen bg-[#F0F1F3]'>
            <div className="flex">
                <Sidebar />
                <div className="w-5/6 p-4 bg-[#F0F1F3] md:absolute md:right-0 absolute right-8 pt-0">
                    <Header title="Admin" />
                    <div className="container min-w-full min-h-screen bg-[#FFFFFF]">
                        <div className="p-4 bg-[#FFFFFF]">
                            {loading ? (
                                <div>Loading...</div>
                            ) : (
                                <div className="container text-xs md:text-base min-w-full min-h-screen bg-[#FFFFFF]">
                                    {routines.map((facultyRoutine, index) => (
                                        <div key={index}>
                                            <div className="flex justify-between items-center">
                                                <h1 className="text-xl font-bold my-4">{facultyRoutine.semester} Semester</h1>
                                                <div className="flex gap-3">
                                                    <Link to="/admin-dashboard/routines/BCA/add-class">
                                                        <Button children="Add Class" type='button' className='px-4' />
                                                    </Link>
                                                    
                                                </div>
                                            </div>
                                            <div className='overflow-x-scroll'>
                                            <table className="table-auto w-full mb-4">
                                                <thead>
                                                    <tr>
                                                    <th className="border px-6 py-2">Action</th>
                                                        <th className="border px-6 py-2">Day/Time</th>
                                                        {facultyRoutine.routine[0].classes.map((classDetail, index) => (
                                                            <th key={index} className="border px-4 py-2">{classDetail.time}</th>

                                                        ))}
                                                        
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {facultyRoutine.routine.map((dayRoutine, dayIndex) => (
                                                        <tr key={dayIndex}>
                                                            <td className="border px-4 py-5 flex items-center justify-center gap-2">
                                                                <Link to={`/admin-dashboard/routines/BCA/edit-class`}>
                                                                    <img className='h-6' src="/images/edit-text.png" alt="" />
                                                                </Link>
                                                                <Link to={`/admin-dashboard/students/1/delete`}>
                                                                    <img className='h-6' src="/images/delete.png" alt="" />
                                                                </Link>
                                                            </td>
                                                            <td className="border px-4 py-2 text-center">{dayRoutine.day}</td>
                                                            {dayRoutine.classes.map((classDetail, classIndex) => (
                                                                <td key={classIndex} className="border px-4 py-2 text-center">
                                                                    {classDetail.subject}<br />
                                                                    {classDetail.teacher}
                                                                </td>
                                                            ))}
                                                            
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Routine;
