import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useParams } from 'react-router-dom';
import FeeDetailsTable from '../components/FeeDetailsTable';

function Student() {
    const { id } = useParams(); // Assuming id is the parameter for student ID

    // Dummy data for a single student (replace with actual data)
    const student = {
        id: id,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        shift: 'Morning',
        dob: '1990-01-01',
        gender: 'Male',
        nationality: 'American',
        emergencyContact: 'Jane Doe - 987-654-3210',
        bloodGroup: 'O+',
        admissionYear: '2022',
        faculty: 'Science',
        rollNumber: 'SCI-001',
        guardianName: 'Jane Doe',
        guardianRelationship: 'Mother',
        guardianContact: '987-654-3210',
        fees: [
            { semester: '1st Semester', paid: 10000, due: 10000 },
            { semester: '2nd Semester', paid: 20000, due: 0 },
        ]
    };

    const fee = [
        {
            semester: 'Semester 1',
            fees: 2000,
            due: 1000,
            paymentLogs: [
                { date: '2023-01-01', description: 'Payment - 1000' },
                { date: '2023-02-01', description: 'Payment - 1000' }
            ]
        },
        {
            semester: 'Semester 2',
            fees: 2200,
            due: 2200,
            paymentLogs: [
                { date: '2023-03-01', description: 'Payment received' },
                { date: '2023-04-01', description: 'Payment received' },
                { date: '2023-05-01', description: 'Payment received' }
            ]
        },
        {
            semester: 'Semester 3',
            fees: 2100,
            due: 2100,
            paymentLogs: [
                { date: '2023-06-01', description: 'Payment received' }
            ]
        },
    ];

    return (
        <div className='container min-w-full min-h-screen bg-[#F0F1F3]'>
            <div className="flex">
                <Sidebar />
                <div className="w-5/6 p-4 md:absolute md:right-0 absolute right-8 pt-0">
                    <Header title="Admin" />
                    <div className="flex flex-col md:flex-row justify-around bg-[#FFFFFF] p-4 md:p-12 lg:text-left">
                        <div>
                            <h1 className="text-3xl font-bold pt-8 lg:pt-0">{student.name}</h1>
                            <div className="flex mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-blue-600 opacity-25"></div>
                            <p className="pt-4 text-base">
                                <strong>Email:</strong> {student.email}
                            </p>
                            <p className="pt-4 text-base">
                                <strong>Phone:</strong> {student.phone}
                            </p>
                            <p className="pt-4 text-base">
                                <strong>Shift:</strong> {student.shift}
                            </p>
                            <p className="pt-4 text-base">
                                <strong>Date of Birth:</strong> {student.dob}
                            </p>
                            <p className="pt-4 text-base">
                                <strong>Gender:</strong> {student.gender}
                            </p>
                            
                            <p className="pt-4 text-base">
                                <strong>Nationality:</strong> {student.nationality}
                            </p>
                            <p className="pt-4 text-base">
                                <strong>Emergency Contact:</strong> {student.emergencyContact}
                            </p>
                            <p className="pt-4 text-base">
                                <strong>Blood Group:</strong> {student.bloodGroup}
                            </p>
                            <p className="pt-4 text-base">
                                <strong>Admission Year:</strong> {student.admissionYear}
                            </p>
                            <p className="pt-4 text-base">
                                <strong>Faculty:</strong> {student.faculty}
                            </p>
                            <p className="pt-4 text-base">
                                <strong>Roll Number:</strong> {student.rollNumber}
                            </p>
                            <p className="pt-4 text-base">
                                <strong>Guardian's Name:</strong> {student.guardianName}
                            </p>
                            <p className="pt-4 text-base">
                                <strong>Guardian's Relationship:</strong> {student.guardianRelationship}
                            </p>
                            <p className="pt-4 text-base">
                                <strong>Guardian's Contact:</strong> {student.guardianContact}
                            </p>
                        </div>
                        <div className="pt-4 text-base">
                            <div className='font-bold mb-4 text-lg'>Fee Details Table</div>
                        <FeeDetailsTable data={fee} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Student;
