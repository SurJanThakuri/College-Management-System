import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import InputField from '../components/InputField';
import Button from '../components/Button';
import axios from 'axios';
import API_URL from '../api';

function EditAdmin() {
    const [adminData, setAdminData] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
 
        if (token) {
            axios.get(`${API_URL}/admins/current-user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setAdminData(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching admin data:', error);
            });
        }
    }, []);

    const onSubmit = (data) => {
        const token = localStorage.getItem('accessToken');
        
        axios.patch(`${API_URL}/admins/update-account`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('Update successful:', response.data);
            // Optionally, you can redirect the user to another page
            window.location.href = '/admin-dashboard';
        })
        .catch(error => {
            console.error('Update failed:', error);
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
                            <h1 className="text-2xl font-bold mb-4">Edit Admin Details</h1>
                            {adminData && (
                                <div className="container mx-auto p-4 flex flex-col justify-center items-center">
                                    <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-1/2'>
                                        <img src={adminData.profilePicture} alt="Profile" className="rounded-full w-24 h-24 mx-auto mb-4 mt-4" />
                                        <div className="">
                                            <p className="font-bold text-xl text-center">{adminData.name}</p>
                                            <div className='mx-8 my-6'>
                                                <InputField
                                                    type="text"
                                                    label="Name:"
                                                    placeholder="Enter the name"
                                                    defaultValue={adminData.name}
                                                    {...register("name", { required: "Name is required" })}
                                                    className="mb-2"
                                                />
                                                {errors.name && <span className='text-red-600'>{errors.name.message}</span>}
                                                <InputField
                                                    type="text"
                                                    label="Email:"
                                                    placeholder="Enter the email"
                                                    defaultValue={adminData.email}
                                                    {...register("email", { required: "Email is required" })}
                                                    className="mb-2"
                                                />
                                                {errors.email && <span className='text-red-600'>{errors.email.message}</span>}

                                                <InputField
                                                    type="text"
                                                    label="Address:"
                                                    placeholder="Enter the address"
                                                    defaultValue={adminData.address}
                                                    {...register("address", { required: "Address is required" })}
                                                    className="mb-2"
                                                />
                                                {errors.address && <span className='text-red-600'>{errors.address.message}</span>}

                                                <InputField
                                                    type="text"
                                                    label="Phone:"
                                                    placeholder="Enter the phone"
                                                    defaultValue={adminData.phone}
                                                    {...register("phone", { required: "Phone is required" })}
                                                    className="mb-2"
                                                />
                                                {errors.phone && <span className='text-red-600'>{errors.phone.message}</span>}
                                            </div>
                                            <div className='text-center'>
                                                <Button children="Update Profile" type='submit' className='my-3 px-3' />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditAdmin;
