import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import InputField from '../components/InputField';
import TextAreaField from '../components/TextAreaField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { refreshToken } from '../services/authServices';
import API_URL from '../api';

function EditNotice() {

    const { id } = useParams();
    const [notice, setNotice] = useState(null);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

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
        axios.get(`${API_URL}/admin/notices/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setNotice(response.data.data);

                setValue('date', response.data.data.date);
                setValue('title', response.data.data.title);
            })
            .catch(error => {
                console.error('Error fetching notice:', error);
            });
    }, []);


    const onSubmit = (data) => {
        const token = localStorage.getItem('accessToken');
        axios.patch(`${API_URL}/admin/notices/update/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                navigate('/admin-dashboard/notices');
            })
            .catch(error => {
                console.error('Error editing notice:', error);
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
                            <h1 className="text-2xl font-bold mb-4">Edit Notice</h1>
                            <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-1/2'>
                                <InputField
                                    type="date"
                                    label="Date:"
                                    {...register("date", { 
                                        required: "Date is required"
                                    })}
                                    className="mb-2"
                                />
                                {errors.date && <span className='text-red-600'>{errors.date.message}</span>}
                                <InputField
                                    type="text"
                                    label="Title:"
                                    placeholder="Notice Title"
                                    {...register("title",  { 
                                        required: "Title is required",
                                        minLength: {
                                            value: 5,
                                            message: "Title must be at least 5 characters long"
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "Title must be less than 100 characters"
                                        }
                                    })}
                                    className="mb-2"
                                />
                                {errors.title && <span className='text-red-600'>{errors.title.message}</span>}
                                
                                <TextAreaField
                                    label="Description:"
                                    placeholder="Notice Description"
                                    defaultValue={notice?.description}
                                    {...register("description", { 
                                        required: "Description is required",
                                        minLength: {
                                            value: 20,
                                            message: "Description must be at least 20 characters long"
                                        },
                                        maxLength: {
                                            value: 1000,
                                            message: "Description must be less than 1000 characters"
                                        }
                                    })}
                                    className="mb-2 w-full"
                                    rows={3}
                                />
                                {errors.description && <span className='text-red-600'>{errors.description.message}</span>}
                                <div>
                               <Button children="Save Changes" type='submit' className='my-3 px-3' />   
                               </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditNotice;
