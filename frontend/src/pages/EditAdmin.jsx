import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

function EditAdmin() {
    const [admin, setAdmin] = useState({
        image: '/images/admin.png',
        name: 'admin',
        email: 'admin@example.com',
        address: '123 Stress Main City',
        phone: '123-455-6678'
    });
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log('Form submitted:', data);
    };

    return (
        <div className='container min-w-full min-h-screen bg-[#F0F1F3]'>
            <div className="flex">
                <Sidebar />
                <div className="w-5/6 p-4 bg-[#F0F1F3] md:absolute md:right-0 absolute right-8 pt-0">
                    <Header title="Admin" />
                    <div className="container min-w-full min-h-screen bg-[#F0F1F3]">
                        <div className="p-4 bg-[#F0F1F3] flex flex-col justify-center items-center">
                            <h1 className="text-2xl font-bold mb-4">Edit Admin Details</h1>
                            <div className="container mx-auto p-4 flex flex-col justify-center items-center">
                                <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-1/2'>
                                    <img src={admin.image} alt="Profile" className="rounded-full w-24 h-24 mx-auto mb-4 mt-4" />
                                    <div className="">
                                        <p className="font-bold text-xl text-center">{admin.name}</p>
                                        <div className='mx-8 my-6'>
                                            <InputField
                                                type="text"
                                                label="Name:"
                                                placeholder="Enter the name"
                                                defaultValue={admin.name}
                                                {...register("name", { required: "Name is required" })}
                                                className="mb-2"
                                            />
                                            {errors.name && <span className='text-red-600'>{errors.name.message}</span>}
                                            <InputField
                                                type="text"
                                                label="Email:"
                                                placeholder="Enter the email"
                                                defaultValue={admin.email}
                                                {...register("email", { required: "Email is required" })}
                                                className="mb-2"
                                            />
                                            {errors.email && <span className='text-red-600'>{errors.email.message}</span>}

                                            <InputField
                                                type="text"
                                                label="Address:"
                                                placeholder="Enter the address"
                                                defaultValue={admin.address}
                                                {...register("address", { required: "Address is required" })}
                                                className="mb-2"
                                            />
                                            {errors.address && <span className='text-red-600'>{errors.address.message}</span>}

                                            <InputField
                                                type="text"
                                                label="Phone:"
                                                placeholder="Enter the phone"
                                                defaultValue={admin.phone}
                                                {...register("phone", { required: "Phone is required" })}
                                                className="mb-2"
                                            />
                                            {errors.phone && <span className='text-red-600'>{errors.phone.message}</span>}
                                        </div>
                                        <div className='text-center'>
                                            <Button children="Update Payment" type='submit' className='my-3 px-3' />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditAdmin;
