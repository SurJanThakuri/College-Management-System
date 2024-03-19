import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import InputField from '../components/InputField';

function AddTeacher() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // Handle form submission (e.g., send data to server)
        console.log('Form submitted:', data);
        // Optionally, redirect user to another page after submission
    };

    return (
        <div className='container min-w-full min-h-screen bg-[#F0F1F3]'>
            <div className="flex">
                <Sidebar />
                <div className="w-5/6 p-4 bg-[#F0F1F3] absolute right-0 pt-0">
            <Header title="Admin" />
                    <div className="container min-w-full min-h-screen bg-[#F0F1F3]">
                        <div className="p-4 bg-[#F0F1F3] flex flex-col justify-center items-center">
                            <h1 className="text-2xl font-bold mb-2">Add New Teacher</h1>
                            <form onSubmit={handleSubmit(onSubmit)} className='w-1/2'>
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
                                    {...register("courses", { required: true })}
                                    className="mb-2"
                                />
                                {errors.courses && <span className='text-red-600'>This field is required</span>}
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
                                    {...register("profilePic", { required: true })}
                                    className="mb-2"
                                />
                                {errors.profilePic && <span className='text-red-600'>This field is required</span>}
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
