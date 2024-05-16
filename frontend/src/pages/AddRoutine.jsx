import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../components/Button';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import InputField from '../components/InputField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from '../api';
import { refreshToken } from '../services/authServices';

function AddRoutine() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [faculties, setFaculties] = useState([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {

        const accessToken = localStorage.getItem('accessToken');
        const accessTokenExpiry = localStorage.getItem('accessTokenExpiry');

        if (!accessToken || !accessTokenExpiry || new Date(accessTokenExpiry) < new Date()) {
            refreshToken();
        }
    }, []);


    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('faculty', data.faculty);
        formData.append('routineImage', data.routineImage[0]);

        const accessToken = localStorage.getItem('accessToken');
        await axios.post(`${API_URL}/admin/routines/add`, formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                navigate('/admin-dashboard/routines');
            })
            .catch(error => {
                console.error('Error adding routine:', error);
            });
    };


    return (
        <div>
            <div className='container min-w-full min-h-screen bg-[#F0F1F3]'>
                <div className="flex">
                    <Sidebar />
                    <div className="w-5/6 p-4 bg-[#F0F1F3] md:absolute md:right-0 absolute right-8 pt-0">
                        <Header title="Admin" />
                        <div className="container min-w-full min-h-screen bg-[#F0F1F3]">
                            <div className="p-4 bg-[#F0F1F3] flex flex-col justify-center items-center">
                                <h1 className="text-2xl font-bold mb-4">Add New Routine</h1>
                                <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-1/2'>
                                    <label htmlFor="faculty" className="block mb-2">Select Faculty:</label>
                                    <select name="faculty" id="faculty" {...register("faculty", { required: true })} className="w-full h-10 rounded-md border-2 mb-2">
                                        <option value="">Select a faculty</option>
                                        {faculties.map(faculty => (
                                            <option key={faculty._id} value={faculty._id}>{faculty.name}</option>
                                        ))}
                                    </select>
                                    {errors.faculty && <span className='text-red-600'>This field is required</span>}
                                    <InputField
                                        type="file"
                                        name="routineImage"
                                        label="Routine Image:"
                                        {...register("routineImage", { required: true })}
                                        className="mb-2"
                                    />
                                    {errors.routineImage && <span className='text-red-600'>This field is required</span>}
                                    <div>
                                        <Button children="Add Routine" type='submit' className='my-3 px-3' />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddRoutine
