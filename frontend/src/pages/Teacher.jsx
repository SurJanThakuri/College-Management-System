import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { refreshToken } from '../services/authServices';
import API_URL from '../api';

function Teacher() {
    const { id } = useParams();
    const [teacher, setTeacher] = useState(null);

    const navigate = useNavigate();
    
    useEffect(() => {

        const accessToken = localStorage.getItem('accessToken');
        const accessTokenExpiry = localStorage.getItem('accessTokenExpiry');

        if (!accessToken || !accessTokenExpiry || new Date(accessTokenExpiry) < new Date()) {
             refreshToken();
        }
        }, []);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        axios.get(`${API_URL}/admins/teachers/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setTeacher(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

    if (!teacher) {
        return <div>Loading...</div>;
    }

    const handleDelete = () => {
        const token = localStorage.getItem('accessToken');
        axios.delete(`${API_URL}/admins/delete-teacher/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                // Optionally, redirect user to another page after deletion by using useNavigate()
                navigate('/admin-dashboard/teachers');
            })
            .catch(error => {
                console.error('Error deleting teacher:', error);
            });
    };

    return (
        <div className='container min-w-full min-h-screen bg-[#F0F1F3]'>
            <div className="flex">
                <Sidebar />
                <div className=" w-5/6 p-4 bg-[#F0F1F3] md:absolute md:right-0 absolute right-8 pt-0">
                    <Header title="Admin" />
                    <div className='flex flex-col-reverse md:flex-row w-full'>
                        <div className="w-full md:w-1/2 p-5 md:p-0">
                            <div className="w-full h-full flex flex-col items-center md:items-start">
                                <h1 className="text-2xl font-bold pt-0 md:pt-0">{teacher.name}</h1>
                                <div className="mx-auto md:mx-0 w-3/4 pt-3 border-b-2 border-blue-600 opacity-25"></div>
                                <p className="pt-4 text-base md:text-lg">{teacher.bio}</p>
                                <p className="pt-4 text-base md:text-lg flex gap-1 items-center justify-center md:justify-start">
                                    <strong>Address:</strong> {teacher.address}
                                </p>
                                <p className="pt-4 text-base md:text-lg flex gap-1 items-center justify-center md:justify-start">
                                    <strong>Email:</strong> {teacher.email}
                                </p>
                                <p className="pt-4 text-base md:text-lg flex gap-1 items-center justify-center md:justify-start">
                                    <strong>Shift:</strong> {teacher.shift}
                                </p>
                                <p className="pt-4 text-base md:text-lg flex gap-1 items-center justify-center md:justify-start">
                                    <strong>Phone:</strong> {teacher.phone}
                                </p>
                                <p className="pt-4 text-base md:text-lg flex gap-1 items-center justify-center md:justify-start">
                                    <strong>Courses:</strong> {teacher.course}
                                </p>
                                {/* <div className="mt-4">
                                    <h2 className="text-base font-bold md:text-lg">Courses:</h2>
                                    <ul className='ml-10 md:ml-0'>
                                        {teacher.courses?.map(course => (
                                            <li key={course}>{course}</li>
                                        ))}
                                    </ul>
                                </div> */}
                                <div className="mt-4 button flex justify-center gap-4 md:justify-start">
                                    <Link to={`/admin-dashboard/teachers/${id}/edit`}>
                                        <Button children="Edit" type='button' className='px-6' />
                                    </Link>
                                    
                                        <Button children="Delete" type='button' onClick={handleDelete} bgColor='bg-red-600' hover='hover:bg-red-700' className='px-4' />
                                    
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-2/5 p-5 md:p-0">
                            <img className='w-full md:h-[80vh] object-cover md:object-contain' src={teacher.profilePicture} alt={teacher.name} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Teacher;
