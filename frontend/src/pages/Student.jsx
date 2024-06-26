import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Link, useParams } from 'react-router-dom';
import FeeDetailsTable from '../components/FeeDetailsTable';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { refreshToken } from '../services/authServices';
import Button from '../components/Button';
import API_URL from '../api';

function Student() {

    const { id } = useParams();

    const [student, setStudent] = useState({});
    const [fee, setFee] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        const accessToken = localStorage.getItem('accessToken');
        const accessTokenExpiry = localStorage.getItem('accessTokenExpiry');

        if (!accessToken || !accessTokenExpiry || new Date(accessTokenExpiry) < new Date()) {
            refreshToken();
        }
    }, []);


    useEffect(() => {
        const fetchFee = async () => {
            const accessToken = localStorage.getItem('accessToken');
            try {
                const response = await axios.get(`${API_URL}/admin/payment-logs/student/${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setFee(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchFee();
    }, [id]);

    console.log(fee);


    useEffect(() => {
        const fetchStudent = async () => {
            const accessToken = localStorage.getItem('accessToken');
            try {
                const response = await axios.get(`${API_URL}/admins/students/${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setStudent(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchStudent();
    }, [id]);

    const handleDelete = () => {
        const accessToken = localStorage.getItem('accessToken');
        axios.delete(`${API_URL}/admins/delete-student/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(response => {
                navigate('/admin-dashboard/students');
            })
            .catch(error => {
                console.error('Error deleting student:', error);
            });
    };


    return (
        <div className='container min-w-full min-h-screen bg-[#F0F1F3]'>
            <div className="flex">
                <Sidebar />
                <div className="w-5/6 p-4 md:absolute md:right-0 absolute right-8 pt-0">
                    <Header title="Admin" />
                    <div className="flex flex-col md:flex-row justify-around bg-[#FFFFFF] p-4 md:p-12 lg:text-left">
                        <div>
                            <div className="flex justify-center gap-20">
                                <h1 className="text-3xl font-bold pt-8 lg:pt-0">{student.name}</h1>
                                <div className="button flex justify-center gap-4 md:justify-start">
                                    <Link to={`/admin-dashboard/students/${id}/edit`}>
                                        <Button children="Edit" type='button' className='px-6' />
                                    </Link>

                                    <Button children="Delete" type='button' onClick={handleDelete} bgColor='bg-red-600' hover='hover:bg-red-700' className='px-4' />

                                </div>
                            </div>
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
                                <strong>Total Fee:</strong> {student.totalFee}
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
                            {student.faculty && (
                                <p className="pt-4 text-base">
                                    <strong>Faculty:</strong> {student.faculty.name}
                                </p>
                            )}

                            <p className="pt-4 text-base">
                                <strong>Roll Number:</strong> {student.rollNo}
                            </p>
                            <p className="pt-4 text-base">
                                <strong>Guardian's Name:</strong> {student.guardianName}
                            </p>
                            <p className="pt-4 text-base">
                                <strong>Guardian's Relationship:</strong> {student.guardianRelation}
                            </p>
                            <p className="pt-4 text-base">
                                <strong>Guardian's Contact:</strong> {student.guardianPhone}
                            </p>
                        </div>
                        <div className="pt-4 text-base">
                            <div className='font-bold mb-4 text-xl'>Fee Details Table</div>
                            <FeeDetailsTable fees={fee} totalFee={student.totalFee} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Student;
