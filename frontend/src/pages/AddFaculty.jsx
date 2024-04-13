import React, {useEffect} from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import InputField from '../components/InputField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { refreshToken } from '../services/authServices';

function AddFaculty() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()

    useEffect(() => {

        const accessToken = localStorage.getItem('accessToken');
        const accessTokenExpiry = localStorage.getItem('accessTokenExpiry');

        if (!accessToken || !accessTokenExpiry || new Date(accessTokenExpiry) < new Date()) {
             refreshToken();
        }
        }, []);
    const onSubmit = async (data) => {

        const courseStructureImg = data.courseStructureImg[0];
        const coverImage = data.coverImage[0];
        
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('description', data.description);
            formData.append('courseStructureImg', courseStructureImg);
            formData.append('coverImage', coverImage);
            
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.post('http://localhost:8000/api/v1/admin/faculties/add', formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            navigate('/admin-dashboard/faculties');

        } catch (error) {
            console.error('Error adding faculty:', error);
        }
       
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
                                <h1 className="text-2xl font-bold mb-4">Add New Faculty</h1>
                                <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-1/2'>
                                    <InputField
                                        type="text"
                                        label="Name:"
                                        placeholder="Faculty Name"
                                        {...register("name", { required: true })}
                                        className="mb-2"
                                    />
                                    {errors.name && <span className='text-red-600'>This field is required</span>}
                                    <label className="block text-gray-700 text-sm mb-2 mt-2" htmlFor="description">
                                        Description:
                                    </label>
                                    <textarea
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#673EE6]"
                                        id="description"
                                        placeholder="Faculty Description"
                                        rows="4"
                                        {...register("description", { required: true })}
                                    />
                                    {errors.description && <span className='text-red-600'>This field is required</span>}
                                    <InputField
                                        type="file"
                                        label="Course Structure Image:"
                                        {...register("courseStructureImg", { required: true })}
                                        className="mb-2"
                                    />
                                    {errors.courseStructureImg && <span className='text-red-600'>This field is required</span>}
                                    <InputField
                                        type="file"
                                        label="Cover Image:"
                                        {...register("coverImage", { required: true })}
                                        className="mb-2"
                                    />
                                    {errors.coverImage && <span className='text-red-600'>This field is required</span>}
                                    <div>
                                        <Button children="Add Faculty" type='submit' className='my-3 px-3' />
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

export default AddFaculty;
