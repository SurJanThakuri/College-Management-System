import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import InputField from '../components/InputField';
import axios from 'axios';

function AddTeacher() {
    const { register, handleSubmit, formState: { errors } } = useForm();

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

            const response = await axios.post('http://localhost:8000/api/v1/admins/teacher/register', formData);
            console.log('Teacher added:', response.data);
            // Optionally, redirect user to another page after submission
            window.location.href = '/admin-dashboard';
        } catch (error) {
            console.error('Error adding teacher:', error);
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
                                    label="Phone:"
                                    placeholder="Teacher Phone"
                                    {...register("phone", { required: true })}
                                    className="mb-2"
                                />
                                {errors.phone && <span className='text-red-600'>This field is required</span>}
                                <InputField
                                    type="password"
                                    label="Password:"
                                    placeholder="Password"
                                    {...register("password", { required: true })}
                                    className="mb-2"
                                />
                                {errors.password && <span className='text-red-600'>This field is required</span>}
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
                                    type="file"
                                    label="Profile Picture:"
                                    {...register("profilePicture", { required: true })}
                                    className="mb-2"
                                />
                                {errors.profilePicture && <span className='text-red-600'>This field is required</span>}
                                <div>
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
