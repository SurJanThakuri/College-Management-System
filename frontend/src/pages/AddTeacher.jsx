import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import InputField from '../components/InputField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { refreshToken } from '../services/authServices';
import API_URL from '../api';

function AddTeacher() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [error,setError] = useState('');

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const accessTokenExpiry = localStorage.getItem('accessTokenExpiry');

        if (!accessToken || !accessTokenExpiry || new Date(accessTokenExpiry) < new Date()) {
            refreshToken();
        }
    }, []);

    const onSubmit = async (data) => {
        const profilePicture = data.profilePicture[0];

        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('address', data.address);
            formData.append('phone', data.phone);
            formData.append('password', data.password);
            formData.append('shift', data.shift);
            formData.append('course', data.course);
            formData.append('bio', data.bio);
            formData.append('profilePicture', profilePicture);

            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.post(`${API_URL}/admins/teacher/register`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Teacher added:', response.data);

            navigate('/admin-dashboard/teachers');
        } catch (e) {
            let errorMessage = 'An unexpected error occurred';
            if (e.response && e.response.data) {
                try {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(e.response.data, 'text/html');
                    const pre = doc.querySelector('pre');
                    if (pre) {
                        const fullMessage = pre.textContent;
                        errorMessage = fullMessage.split('at')[0].replace('Error:', '').trim();
                    }
                } catch (parseError) {
                    errorMessage = 'An unexpected error occurred while parsing the error message';
                }
            }
            setError(errorMessage);
        }
                   
    };

    return (
        <div className='container min-w-full min-h-screen bg-[#F0F1F3]'>
            <div className="flex">
                <Sidebar />
                <div className="w-5/6 p-4 bg-[#F0F1F3] md:absolute md:right-0 absolute right-8 pt-0">
                    <Header title="Admin" />
                    <div className="container min-w-full min-h-screen bg-[#F0F1F3]">
                        <div className="p-4 bg-[#F0F1F3] flex flex-col justify-center items-center">
                            <h1 className="text-2xl font-bold mb-2">Add New Teacher</h1>
                            <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-1/2'>
                                <InputField
                                    type="text"
                                    label="Name:"
                                    placeholder="Teacher Name"
                                    {...register("name", {
                                        required: "Name is required",
                                        minLength: { value: 2, message: "Name must be at least 2 characters long" },
                                        pattern: { value: /^[A-Za-z\s]+$/, message: "Name must contain only letters and spaces" }
                                    })}
                                    className="mb-2"
                                />
                                {errors.name && <span className='text-red-600'>{errors.name.message}</span>}
                                
                                <InputField
                                    type="email"
                                    label="Email:"
                                    placeholder="Teacher Email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                            message: "Email address must be a valid address",
                                        },
                                    })}
                                    className="mb-2"
                                />
                                {errors.email && <span className='text-red-600'>{errors.email.message}</span>}
                                
                                <InputField
                                    type="text"
                                    label="Address:"
                                    placeholder="Teacher Address"
                                    {...register("address", { required: "Address is required" })}
                                    className="mb-2"
                                />
                                {errors.address && <span className='text-red-600'>{errors.address.message}</span>}
                                
                                <InputField
                                    type="tel"
                                    label="Phone:"
                                    placeholder="Teacher Phone"
                                    {...register("phone", {
                                        required: "Phone number is required",
                                        pattern: { value: /^\d{10}$/, message: "Phone number must be 10 digits" }
                                    })}
                                    className="mb-2"
                                />
                                {errors.phone && <span className='text-red-600'>{errors.phone.message}</span>}
                                
                                <InputField
                                    type="password"
                                    label="Password:"
                                    placeholder="Password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 8, message: "Password must be at least 8 characters long" },
                                        pattern: { value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, message: "Password must contain at least one uppercase letter, one lowercase letter, and one number" }
                                    })}
                                    className="mb-2"
                                />
                                {errors.password && <span className='text-red-600'>{errors.password.message}</span>}
                                
                                <InputField
                                    type="text"
                                    label="Shift:"
                                    placeholder="Teacher Shift"
                                    {...register("shift", { required: "Shift is required" })}
                                    className="mb-2"
                                />
                                {errors.shift && <span className='text-red-600'>{errors.shift.message}</span>}
                                
                                <InputField
                                    type="text"
                                    label="Courses:"
                                    placeholder="Teacher Courses"
                                    {...register("course", { required: "Courses are required" })}
                                    className="mb-2"
                                />
                                {errors.course && <span className='text-red-600'>{errors.course.message}</span>}
                                
                                <InputField
                                    type="textarea"
                                    label="Bio:"
                                    placeholder="Teacher Bio"
                                    {...register("bio", { required: "Bio is required" })}
                                    className="mb-2"
                                />
                                {errors.bio && <span className='text-red-600'>{errors.bio.message}</span>}
                                
                                <InputField
                                    type="file"
                                    label="Profile Picture:"
                                    {...register("profilePicture", { required: "Profile picture is required",
                                        validate: {
                                            size: value => value[0].size < 2000000 || "File size must be less than 2MB",
                                            type: value => ['image/jpeg', 'image/png'].includes(value[0].type) || "Only JPEG and PNG formats are allowed"
                                        }
                                    })}
                                    className="mb-2"
                                />
                                {errors.profilePicture && <span className='text-red-600'>{errors.profilePicture.message}</span>}
                                
                                <div>
                                {error && <p className="text-red-600 mt-4">{error}</p>}
                                    <Button children="Add Teacher" type='submit' className='my-3 px-3' />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddTeacher;