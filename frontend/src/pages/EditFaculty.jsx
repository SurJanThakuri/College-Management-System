import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import InputField from '../components/InputField';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import CoverImagePopup from '../components/CoverImagePopup';
import { refreshToken } from '../services/authServices';
import API_URL from '../api';

function EditFaculty() {
    const [showCoverImagePopup, setShowCoverImagePopup] = useState(false);
    const handleCameraClick = () => {
        setShowCoverImagePopup(true);
    };

    const handleCloseCoverImagePopup = () => {
        setShowCoverImagePopup(false);
    };

    const { id } = useParams();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [faculty, setFaculty] = useState(null);
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
        axios.get(`${API_URL}/admin/faculties/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(response => {
                setFaculty(response.data.data);

                setValue('name', response.data.data.name);
                setValue('description', response.data.data.description);
            })
            .catch(error => {
                console.error(error);
            });

    }, [id]);

    if (!faculty) {
        return <div>Loading...</div>;
    }

    const onSubmit = async (data) => {
        const accessToken = localStorage.getItem('accessToken');
        await axios.patch(`${API_URL}/admin/faculties/update/${id}`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(response => {
                navigate('/admin-dashboard/faculties/' + id);
            })
            .catch(error => {
                console.error('Error updating faculty:', error);
            });

    };

    return (
        <div className='container min-w-full min-h-screen bg-[#F0F1F3]'>
            <div className="flex">
                <Sidebar />
                <div className="w-5/6 p-4 bg-[#F0F1F3] md:absolute md:right-0 absolute right-8 pt-0">
                    <Header title="Admin" />
                    <h1 className="text-center text-2xl font-bold mb-4">Edit Faculty</h1>
                    <div className="image">
                                <div className="course w-full">
                                    <div className="flex flex-col gap-4 items-center justify-center my-4 p-2">
                                    <img src={faculty.coverImage} className='h-[30vh] object-contain' alt="" />
                                    <div className="flex items-center justify-center text-center gap-4  ">
                                    <div className="flex justify-center items-center">
                                    <h2 className='text-xl font-bold'>Cover Image</h2>
                                    </div>
                                    <div className="flex justify-center items-center">
                                    <img src="/images/camera.png" className='h-10' onClick={handleCameraClick}  />
                                    </div>
                                    </div>
                                    </div>
                                </div>
                                {showCoverImagePopup && <CoverImagePopup data={faculty} onClose={handleCloseCoverImagePopup} />}
                            </div>
                    <div className="flex flex-col items-center">
                        <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-1/2'>
                            <InputField
                                type="text"
                                label="Name:"
                                placeholder="Faculty Name"
                                {...register("name", { 
                                    required: "Name is required", 
                                    minLength: {
                                        value: 3,
                                        message: "Name must be at least 3 characters long"
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: "Name must be less than 50 characters"
                                    }
                                })}
                                className="mb-2"
                            />
                            {errors.name && <span className='text-red-600'>{errors.name.message}</span>}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                    Description:
                                </label>
                                <textarea
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#673EE6]"
                                    id="description"
                                    rows="4"
                                    placeholder="Faculty Description"
                                    {...register("description",{ 
                                        required: "Description is required",
                                        minLength: {
                                            value: 10,
                                            message: "Description must be at least 10 characters long"
                                        },
                                        maxLength: {
                                            value: 300,
                                            message: "Description must be less than 300 characters"
                                        }
                                    })}
                                />
                                    {errors.description && <span className='text-red-600'>{errors.description.message}</span>}
                                    </div>

                            

                            <div>
                                <Button children="Save Changes" type='submit' className='my-3 px-3' />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditFaculty;
