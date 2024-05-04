import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import InputField from '../components/InputField';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../api';

function EditTeacher() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

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
        const accessToken = localStorage.getItem('accessToken');
        axios.get(`${API_URL}/admins/teachers/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(response => {
            setTeacher(response.data.data);
            // Set default values for form fields
            setValue('name', response.data.data.name);
            setValue('email', response.data.data.email);
            setValue('address', response.data.data.address);
            setValue('shift', response.data.data.shift);
            setValue('course', response.data.data.course);
            setValue('bio', response.data.data.bio);
            setValue('phone', response.data.data.phone);
        })
        .catch(error => {
            console.error(error);
        });
    }, [id]);
    
    if (!teacher) {
        return <div>Loading...</div>;
    }
    
    const onSubmit = (data) => {
        const accessToken = localStorage.getItem('accessToken');
        axios.patch(`${API_URL}/admins/update-teacher/${id}`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(response => {
                console.log('Teacher updated successfully:', response.data);
                // Optionally, redirect user to another page after submission by using useNavigate()
                navigate(`/admin-dashboard/teachers/${id}`);
               
            })
            .catch(error => {
                console.error('Error updating teacher:', error);
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
                            <h1 className="text-2xl font-bold mb-4">Edit Teacher</h1>
                            <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-1/2'>
                                <InputField
                                    type="text"
                                    label="Name:"
                                    placeholder="Teacher Name"
                                    {...register("name", { required: true })}
                                    className="mb-2"
                                />
                                {errors.name && <span className='text-red-600'>This field is required</span>}
                                <InputField
                                    type="text"
                                    label="Email:"
                                    placeholder="Teacher Email"
                                    {...register("email", { required: "Email is required",
                                    pattern: {
                                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                        message: "Email address must be a valid address",
                                    }, },)}
                                    className="mb-2"
                                />
                                {errors.email && <span className='text-red-600'>{errors.email.message}</span>}
                                <InputField
                                    type="text"
                                    label="Address:"
                                    placeholder="Teacher Address"
                                    {...register("address", { required: true })}
                                    className="mb-2"
                                />
                                {errors.address && <span className='text-red-600'>This field is required</span>}
                                
                                <InputField
                                    type="text"
                                    label="Shift:"
                                    placeholder="Teacher Shift"
                                    {...register("shift", { required: true })}
                                    className="mb-2"
                                />
                                {errors.shift && <span className='text-red-600'>This field is required</span>}
                                <InputField
                                    type="text"
                                    label="Courses:"
                                    placeholder="Teacher Courses"
                                    {...register("course", { required: true })}
                                    className="mb-2"
                                />
                                {errors.course && <span className='text-red-600'>This field is required</span>}
                                <InputField
                                    type="textarea"
                                    label="Bio:"
                                    placeholder="Teacher Bio"
                                    {...register("bio", { required: true })}
                                    className="mb-2"
                                />
                                {errors.bio && <span className='text-red-600'>This field is required</span>}
                                <InputField
                                    type="text"
                                    label="Phone:"
                                    placeholder="Teacher Phone"
                                    {...register("phone", { required: true })}
                                    className="mb-2"
                                />
                                {errors.phone && <span className='text-red-600'>This field is required</span>}
                                <div>
                                <Button children="Update Teacher" type='submit' className='my-3 px-3' />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditTeacher;
