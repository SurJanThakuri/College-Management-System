import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import InputField from '../components/InputField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { refreshToken } from '../services/authServices';
import API_URL from '../api';

function EditPayment() {
    const { id } = useParams();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [payment, setPayment] = useState(null);
    const [faculties, setFaculties] = useState([]);
    const [students, setStudents] = useState([null]);

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



    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        axios.get(`${API_URL}/admin/payment-logs/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(response => {
                setPayment(response.data.data);

                setValue('date', response.data.data.date);
                setValue('amount', response.data.data.amount);
                setValue('semester', response.data.data.semester);
            })
            .catch(error => {
                console.error(error);
            });

    }, [id]);

    if (!payment) {
        return <div>Loading...</div>;
    }

    const onSubmit = (data) => {
        const accessToken = localStorage.getItem('accessToken');
        axios.patch(`${API_URL}/admin/payment-logs/update/${id}`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(response => {
                navigate(`/admin-dashboard/payments`);

            })
            .catch(error => {
                console.error('Error updating student:', error);
            });
    };

    return (
        <div className='container min-w-full min-h-screen bg-[#F0F1F3]'>
            <div className="flex">
                <Sidebar />
                <div className="w-5/6 p-4 bg-[#F0F1F3] md:absolute md:right-0 absolute right-8 pt-0">
                    <Header title="Admin" />
                    <div className="container min-w-full min-h-screen bg-[#FFFFFF]">
                        <div className="p-4 bg-[#FFFFFF] flex flex-col justify-center items-center">
                            <h1 className="text-2xl font-bold mb-2">Edit Payment</h1>
                            <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-1/2'>
                                <InputField
                                    type="date"
                                    label="Date:"
                                    placeholder="Payment Date"
                                    {...register("date", { required: "Date is required" })}
                                    className="mb-2"
                                />
                                {errors.date && <span className='text-red-600'>{errors.date.message}</span>}
                                <InputField
                                    type="text"
                                    label="Amount:"
                                    placeholder="Payment Amount"
                                    {...register("amount", { required: "Amount is required" })}
                                    className="mb-2"
                                />
                                {errors.amount && <span className='text-red-600'>{errors.amount.message}</span>}
                                <label htmlFor="studentName" className="block mb-2">Select Student:</label>
                                <select
                                    name="studentName"
                                    {...register("studentName", { required: true })}
                                    defaultValue={payment.studentName._id}
                                    className="w-full h-10 rounded-md border-2 mb-2"
                                >
                                    <option value="">Select Student</option>
                                    {students && students.map((student) => (
                                        <option
                                            key={student.id}
                                            value={student.id}
                                        >
                                            {student.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.studentName && <span className='text-red-600'>{errors.studentName.message}</span>}
                                <label htmlFor="faculty" className="block mb-2">Select Faculty:</label>
                                <select
                                    name="faculty"
                                    {...register("faculty", { required: true })}
                                    defaultValue={payment.faculty._id}
                                    className="w-full h-10 rounded-md border-2 mb-2"
                                >
                                    <option value="">Select a faculty</option>
                                    {faculties && faculties.map((faculty) => (
                                        <option
                                            key={faculty._id}
                                            value={faculty._id}
                                        >
                                            {faculty.name}
                                        </option>
                                    ))}
                                </select>

                                {errors.faculty && <span className='text-red-600'>{errors.faculty.message}</span>}

                                <InputField
                                    label="Semester:"
                                    type="text"
                                    placeholder="Semester"
                                    {...register("semester", { required: "Semester is required" })}
                                    className="mb-2"
                                />
                                {errors.semester && <span className='text-red-600'>{errors.semester.message}</span>}
                                <Button children="Update Payment" type='submit' className='my-3 px-3' />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditPayment;
