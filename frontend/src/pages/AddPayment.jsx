import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import InputField from '../components/InputField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { refreshToken } from '../services/authServices';
import API_URL from '../api';

function AddPayment() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const [faculties, setFaculties] = useState([]);
    const [students, setStudents] = useState([]);
    const [error, setError] = useState("");

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
        Promise.all([
            axios.get(`${API_URL}/admin/faculties`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            axios.get(`${API_URL}/admins/students`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        ])
            .then(([facultiesResponse, studentsResponse]) => {
                setFaculties(facultiesResponse.data.data);
                setStudents(studentsResponse.data.data);
            })
            .catch(error => {
                console.error('Error fetching faculties:', error);
            });
    }, []);

    const onSubmit = (data) => {
        const accessToken = localStorage.getItem('accessToken');
        axios.post(`${API_URL}/admin/payment-logs/add`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(response => {
                navigate('/admin-dashboard/payments');
            })
            .catch(error => {
                console.error('Error adding payment log:', error);
            });
    };

    return (
        <div className='container min-w-full min-h-screen bg-[#F0F1F3]'>
            <div className="flex">
                <Sidebar />
                <div className="w-5/6 p-4 bg-[#F0F1F3] md:absolute md:right-0 absolute right-8 pt-0">
                    <Header title="Admin" />
                    <div className="container min-w-full min-h-screen bg-[#FFFFFF]">
                        <div className="p-4 bg-[#FFFFFF] flex items-center flex-col ">
                            <h1 className="text-2xl font-bold mb-4">Add Payment</h1>
                            <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-1/2'>
                                <InputField
                                    label="Date"
                                    name="date"
                                    type="date"
                                    {...register("date", {
                                        required: "Date is required",
                                        validate: value => {
                                            const selectedDate = new Date(value);
                                            const currentDate = new Date();
                                            return selectedDate <= currentDate || "Date cannot be in the future";
                                        }
                                    })}
                                />
                                {errors.date && <span className='text-red-600'>{errors.date.message}</span>}
                                
                                <label htmlFor="faculty" className="block mb-2">Select Faculty:</label>
                                <select 
                                    name="faculty" 
                                    id="faculty" 
                                    {...register("faculty", { required: "Faculty is required" })} 
                                    className="w-full h-10 rounded-md border-2 mb-2"
                                >
                                    <option value="">Select a faculty</option>
                                    {faculties.map(faculty => (
                                        <option key={faculty._id} value={faculty._id}>{faculty.name}</option>
                                    ))}
                                </select>
                                {errors.faculty && <span className='text-red-600'>{errors.faculty.message}</span>}
                                
                                <InputField
                                    label="Semester"
                                    name="semester"
                                    type="text"
                                    placeholder="Semester"
                                    {...register("semester", { 
                                        required: "Semester is required",
                                        minLength: {
                                            value: 1,
                                            message: "Semester must be at least 1 character long"
                                        },
                                        maxLength: {
                                            value: 10,
                                            message: "Semester must be less than 10 characters"
                                        }
                                    })}
                                />
                                {errors.semester && <span className='text-red-600'>{errors.semester.message}</span>}
                                
                                <label htmlFor="student" className="block mb-2">Select Student:</label>
                                <select 
                                    name="studentName" 
                                    id="studentName" 
                                    {...register("studentName", { required: "Student is required" })} 
                                    className="w-full h-10 rounded-md border-2 mb-2"
                                >
                                    <option value="">Select Student</option>
                                    {students.map(student => (
                                        <option key={student.id} value={student.id}>{student.name}</option>
                                    ))}
                                </select>
                                {errors.studentName && <span className='text-red-600'>{errors.studentName.message}</span>}
                                
                                <InputField
                                    label="Amount"
                                    name="amount"
                                    type="text"
                                    {...register("amount", { 
                                        required: "Amount is required",
                                        validate: value => !isNaN(value) || "Amount must be a number",
                                        min: {
                                            value: 1,
                                            message: "Amount must be at least 1"
                                        }
                                    })}
                                />
                                {errors.amount && <span className='text-red-600'>{errors.amount.message}</span>}
                                
                                <div className="my-5">
                                    <Button type="submit" children="Add Payment" className='px-3' />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddPayment;