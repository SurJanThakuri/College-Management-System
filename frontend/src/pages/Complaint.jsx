import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

function Complaint() {
    const { id } = useParams();
    const complaint = 
        {
            id: 1,
            title: 'Internet Connectivity Issue',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae lorem ipsum.',
            type: 'Student',
            teacherName: 'John Doe',
            teacherEmail: 'john.doe@example.com',
            teacherPhone: '123-456-7890',
            studentName: "Sarah Lee",
            faculty: "BBA",
            batch: "2021",
            studentPhone: "123-456-7890",
        }
        // Fetch complaint data by id

    return (
        <div className='container min-w-full min-h-screen bg-[#F0F1F3]'>
            <div className="flex">
                <Sidebar />
                <div className="w-5/6 p-4 bg-[#F0F1F3] md:absolute md:right-0 absolute right-8 pt-0">
            <Header title="Admin" />
                    <div className="container min-w-full min-h-screen bg-[#F0F1F3]">
                        <div className="flex flex-col items-center p-4 bg-[#F0F1F3]">
                            <h1 className="text-2xl self-start font-bold mb-4">Complaint Details</h1>
                            <div className="bg-white p-4 w-[45vw] rounded-lg shadow-md">
                                <h2 className="text-lg font-semibold">{complaint.title}</h2>
                                <p className="text-gray-600 mt-2">{complaint.description}</p>
                                {complaint.type === 'Teacher' && (
                                    <>
                                        <p className="mt-4"><strong>Teacher Name:</strong> {complaint.teacherName}</p>
                                        <p><strong>Email:</strong> {complaint.teacherEmail}</p>
                                        <p><strong>Phone:</strong> {complaint.teacherPhone}</p>
                                    </>
                                )}
                                {complaint.type === 'Student' && (
                                    <>
                                        <p className="mt-4"><strong>Student Name:</strong> {complaint.studentName}</p>
                                        <p><strong>Faculty:</strong> {complaint.faculty}</p>
                                        <p><strong>Batch:</strong> {complaint.batch}</p>
                                        <p><strong>Phone:</strong> {complaint.studentPhone}</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Complaint;
