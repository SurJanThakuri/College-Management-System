import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../components/Button';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import API_URL from '../api';
import { refreshToken } from '../services/authServices';
function EditRoutine() {
    const { id } = useParams();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [faculties, setFaculties] = useState([]);
    const [routine, setRoutine] = useState(null);

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

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        axios.get(`${API_URL}/admin/routines/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(response => {
                setRoutine(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const onSubmit = async (data) => {
        const accessToken = localStorage.getItem('accessToken');
        await axios.patch(`${API_URL}/admin/routines/update/${id}`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(response => {
                navigate('/admin-dashboard/routines');
            })
            .catch(error => {
                console.error('Error updating routine:', error);
            });
    };
    return (
        <div className='container min-w-full min-h-screen bg-[#F0F1F3]'>
            <div className="flex">
                <Sidebar />
                <div className="w-5/6 p-4 bg-[#F0F1F3] md:absolute md:right-0 absolute right-8 pt-0">
                    <Header title="Admin" />
                    <div className="container min-w-full min-h-screen bg-[#FFFFFF]">
                        <div className="p-4 bg-[#FFFFFF] flex flex-col justify-center items-center">
                            <h1 className="text-2xl font-bold mb-2">Edit Routine</h1>
                            <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-1/2'>
                                <label htmlFor="faculty" className="block mb-2">Select Faculty:</label>
                                <select
                                    name="faculty"
                                    {...register("faculty", { required: true })}
                                    defaultValue={routine.faculty._id}
                                    className="w-full h-10 rounded-md border-2 mb-2"
                                >
                                    <option value="">Select a faculty</option>
                                    {faculties && faculties.map((faculty) => (
                                        <option
                                            key={faculty._id}
                                            value={faculty._id}
                                        >
                                            {faculty.name}
                                        </option>
                                    ))}
                                </select>

                                {errors.faculty && <span className='text-red-600'>{errors.faculty.message}</span>}
                                <Button children="Update Routine" type='submit' className='my-3 px-3' />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditRoutine
