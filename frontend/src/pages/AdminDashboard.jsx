import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Calender from '../components/Calender';
import NoticeBoard from '../components/NoticeBoard';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Button from '../components/Button';
import { useForm } from 'react-hook-form';
import InputField from '../components/InputField';
import axios from 'axios';
import { refreshToken } from '../services/authServices';
import API_URL from '../api';

const AdminDashboard = () => {
    useEffect(() => {

            const accessToken = localStorage.getItem('accessToken');
            const accessTokenExpiry = localStorage.getItem('accessTokenExpiry');
    
            if (!accessToken || !accessTokenExpiry || new Date(accessTokenExpiry) < new Date()) {
                 refreshToken();
            }
            }, []);
    

    const [showForm, setShowForm] = useState(false);
    const { handleSubmit, register } = useForm();

    const onSubmit = (data) => {
        // Handle form submission here
        console.log(data);
    };

    const [teachers, setTeachers] = useState(null);
    const [faculties, setFaculties] = useState(null);
    const [students, setStudents] = useState(null);

    const [amountCollected, setAmountCollected] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        Promise.all([
            axios.get(`${API_URL}/admins/teachers`,  {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }),
        axios.get(`${API_URL}/admin/faculties`,  {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }),
        axios.get(`${API_URL}/admins/students`,  {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }),
        axios.get(`${API_URL}/admin/payment-logs`,  {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        ])
        .then(([teachersResponse, facultiesResponse, studentsResponse, paymentsResponse]) => {
            setTeachers(teachersResponse.data.data.length);
            setFaculties(facultiesResponse.data.data.length);
            setStudents(studentsResponse.data.data.length);
            let amount = 0;
            paymentsResponse.data.data.forEach(payment => {
                payment.amount = parseInt(payment.amount);
                amount += payment.amount;
            });
            setAmountCollected(amount);
        })
            .catch(error => {
                console.error(error);
            });
    }, []);
    

    return (
        <div className='container min-w-full min-h-screen bg-[#F0F1F3]'>
            <div className="flex">
                <Sidebar />
                <div className="w-5/6 p-2 pt-0 bg-[#F0F1F3] md:absolute md:right-0 absolute right-8 ">
                    <Header title="Admin" />
                    <div className="flex justify-around items-center mb-8 flex-wrap gap-2">
                        <Card title="Total Students" imgSrc='/images/student.png' number={students} />
                        <Card title="Faculties" imgSrc='/images/education.png' number={faculties} />
                        <Card title="Total Teachers" imgSrc='/images/teacher.png' number={teachers} />
                        <Card title="Money Collected" imgSrc='/images/money.png' number={amountCollected} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="col-span-2 bg-white">
                            <div className='flex items-center justify-between mx-6'>
                                <h2 className='font-bold text-2xl'>Calendar</h2>
                                <Button children="Add Event" className='px-4 mt-2' onClick={() => setShowForm(!showForm)} />
                            </div>
                            <hr className='h-1' />
                            <Calender />
                        </div>
                        <div className="col-span-1">
                            <NoticeBoard />
                        </div>
                    </div>

                    {showForm && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-8 rounded-lg max-w-[95vw] w-full relative md:max-w-[35vw]">
                                <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 sm:p-6">
                                    <p className="font-bold text-xl">Profile Details</p>
                                    <button onClick={() => setShowForm(false)}>
                                        <img className='w-4' src="/images/close.png" alt="" />
                                    </button>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-4 mt-6">
                                        <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
                                            Title
                                        </label>
                                        <InputField
                                            id="title"
                                            name="title"
                                            type="text"
                                            placeholder="Enter title"
                                            {...register("title", { required: true })}
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
                                            Date
                                        </label>
                                        <InputField
                                            id="date"
                                            name="date"
                                            type="date"
                                            {...register("date", { required: true })}
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <Button children="Add Event" className='px-4' type='submit' />
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
