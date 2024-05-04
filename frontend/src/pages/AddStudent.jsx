import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import InputField from '../components/InputField';
import axios from 'axios';
import { refreshToken } from '../services/authServices';
import { useNavigate } from 'react-router-dom';
import API_URL from '../api';

function AddStudent() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [faculties, setFaculties] = useState([]); 
    const navigate = useNavigate();
    
    
    useEffect(() => {

        const accessToken = localStorage.getItem('accessToken');
        const accessTokenExpiry = localStorage.getItem('accessTokenExpiry');

        if (!accessToken || !accessTokenExpiry || new Date(accessTokenExpiry) < new Date()) {
             refreshToken();
        }
        }, []);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        axios.get(`${API_URL}/admin/faculties`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                setFaculties(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching faculties:', error);
            });
    }, []);

    const onSubmit = (data) => {
        const accessToken = localStorage.getItem('accessToken');
        axios.post(`${API_URL}/admins/student/register`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(response => {
                navigate('/admin-dashboard/students');
            })
            .catch(error => {
                console.error('Error adding student:', error);
            });
    };

    return (
        <div className='container min-w-full min-h-screen bg-[#F0F1F3]'>
            <div className="flex">
                <Sidebar />
                <div className="w-5/6 p-4 bg-[#F0F1F3] md:absolute md:right-0 absolute right-8 pt-0">
                    <Header title="Admin" />
                    <div className="container min-w-full min-h-screen bg-[#F0F1F3]">
                        <div className="p-4 bg-[#F0F1F3] flex flex-col justify-center items-center">
                            <h1 className="text-2xl font-bold mb-4">Add New Student</h1>
                            <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-1/2'>
                                <InputField
                                    type="text"
                                    label="Name:"
                                    placeholder="Student Name"
                                    {...register("name", { required: true })}
                                    className="mb-2"
                                />
                                {errors.name && <span className='text-red-600'>This field is required</span>}
                                <InputField
                                    type="email"
                                    label="Email:"
                                    placeholder="Student Email"
                                    {...register("email", { required: "Email is required",
                                        pattern: {
                                            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                            message: "Email address must be a valid address",
                                        }, })}
                                    className="mb-2"
                                />
                                {errors.email && <span className='text-red-600'>{errors.email.message}</span>}
                                <InputField
                                    type="password"
                                    label="Password:"
                                    placeholder="Create Password"
                                    {...register("password", { required: "Password is required" })}
                                    className="mb-2"
                                />
                                {errors.password && <span className='text-red-600'>{errors.password.message}</span>}
                                <InputField
                                    type="text"
                                    label="Phone Number:"
                                    placeholder="Phone Number"
                                    {...register("phone", { required: true })}
                                    className="mb-2"
                                />
                                {errors.phone && <span className='text-red-600'>This field is required</span>}
                                <InputField
                                    type="text"
                                    label="Address:"
                                    placeholder="Address"
                                    {...register("address", { required: true })}
                                    className="mb-2"
                                />
                                {errors.address && <span className='text-red-600'>This field is required</span>}
                                <InputField
                                    type="text"
                                    label="Shift:"
                                    placeholder="Shift"
                                    {...register("shift", { required: true })}
                                    className="mb-2"
                                />
                                {errors.shift && <span className='text-red-600'>This field is required</span>}
                                <InputField
                                    type="date"
                                    label="Date of Birth:"
                                    placeholder="Date of Birth"
                                    {...register("dob", { required: true })}
                                    className="mb-2"
                                />
                                {errors.dob && <span className='text-red-600'>This field is required</span>}
                                <InputField
                                    type="text"
                                    label="Gender:"
                                    placeholder="Gender"
                                    {...register("gender", { required: true })}
                                    className="mb-2"
                                />
                                {errors.gender && <span className='text-red-600'>This field is required</span>}
                                <label htmlFor="faculty" className="block mb-2">Select Faculty:</label>
                                <select name="faculty" id="faculty" {...register("faculty", { required: true })} className="w-full h-10 rounded-md border-2 mb-2">
                                    <option value="">Select a faculty</option>
                                    {faculties.map(faculty => (
                                        <option key={faculty._id} value={faculty._id}>{faculty.name}</option>
                                    ))}
                                </select>
                                {errors.faculty && <span className='text-red-600'>This field is required</span>}
                                <InputField
                                    type="text"
                                    label="Nationality:"
                                    placeholder="Nationality"
                                    {...register("nationality", { required: true })}
                                    className="mb-2"
                                />
                                {errors.nationality && <span className='text-red-600'>This field is required</span>}
                                <InputField
                                    type="text"
                                    label="Total Fee:"
                                    placeholder="Total Fee"
                                    {...register("totalFee", { required: true })}
                                    className="mb-2"
                                />
                                {errors.totalFee && <span className='text-red-600'>This field is required</span>}
                                <InputField
                                    type="text"
                                    label="Emergency Contact:"
                                    placeholder="Emergency Contact"
                                    {...register("emergencyContact", { required: true })}
                                    className="mb-2"
                                />
                                {errors.emergencyContact && <span className='text-red-600'>This field is required</span>}
                                <InputField
                                    type="text"
                                    label="Blood Group:"
                                    placeholder="Blood Group"
                                    {...register("bloodGroup", { required: true })}
                                    className="mb-2"
                                />
                                {errors.bloodGroup && <span className='text-red-600'>This field is required</span>}
                                <InputField
                                    type="text"
                                    label="Admission Year:"
                                    placeholder="Admission Year"
                                    {...register("admissionYear", { required: true })}
                                    className="mb-2"
                                />
                                {errors.admissionYear && <span className='text-red-600'>This field is required</span>}
                                <InputField
                                    type="text"
                                    label="Roll Number:"
                                    placeholder="Roll Number"
                                    {...register("rollNo", { required: true })}
                                    className="mb-2"
                                />
                                {errors.rollNumber && <span className='text-red-600'>This field is required</span>}
                                <InputField
                                    type="text"
                                    label="Guardian's Name:"
                                    placeholder="Guardian's Name"
                                    {...register("guardianName", { required: true })}
                                    className="mb-2"
                                />
                                {errors.guardianName && <span className='text-red-600'>This field is required</span>}
                                <InputField
                                    type="text"
                                    label="Guardian's Relationship:"
                                    placeholder="Guardian's Relationship"
                                    {...register("guardianRelation", { required: true })}
                                    className="mb-2"
                                />
                                {errors.guardianRelationship && <span className='text-red-600'>This field is required</span>}
                                <InputField
                                    type="text"
                                    label="Guardian's Contact:"
                                    placeholder="Guardian's Contact"
                                    {...register("guardianPhone", { required: true })}
                                    className="mb-2"
                                />
                                {errors.guardianContact && <span className='text-red-600'>This field is required</span>}
                                <div>
                                <Button children="Add Student" type='submit' className='my-3 px-3' />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddStudent;
