import React, { useEffect } from 'react';
import InputField from './InputField';
import { useForm } from 'react-hook-form';
import Button from './Button';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { refreshToken } from '../services/authServices';
import API_URL from '../api';

const CoverImagePopup = ({ data, onClose }) => {
    const { _id } = data;
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {

        const accessToken = localStorage.getItem('accessToken');
        const accessTokenExpiry = localStorage.getItem('accessTokenExpiry');

        if (!accessToken || !accessTokenExpiry || new Date(accessTokenExpiry) < new Date()) {
             refreshToken();
        }
        }, []);
    
    const onSubmit = (data) => {
        const token = localStorage.getItem('accessToken');
        const formData = new FormData();
        formData.append('coverImage', data.coverImage[0]); 

        axios.patch(`${API_URL}/admin/faculties/update-cover-image/` + _id, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            navigate('/admin-dashboard/faculties/' + _id);
        })
        .catch(error => {
            console.error('Failed to update profile picture:', error);
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-full p-4 relative rounded-xl max-w-sm max-h-[80vh] sm:max-w-md sm:max-h-[60vh] md:max-w-sm md:max-h-[60vh] lg:max-w-[40vw]">
                <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 sm:p-6">
                    <p className="font-bold text-xl">Cover Image</p>
                    <button onClick={onClose}>
                        <img className='w-4' src="/images/close.png" alt="" />
                    </button>
                </div>
                <div className="flex flex-col items-center">
                    <img src={data.coverImage} alt="Profile" className=" w-32 h-24 m-4 sm:w-40 sm:h-32" />
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center mt-6">
                    <div className="flex items-center w-full">
                        <InputField
                            type="file"
                            label="Choose new cover image:"
                            {...register("coverImage", { required: "Cover Image is required" })}
                            className="flex-grow"
                        />
                    </div>
                    {errors.coverImage && <p className='text-red-600'>{errors.coverImage.message}</p>}
                    <div className='flex justify-center my-2 w-full'>
                        <Button children="Save" type='submit' className='my-3 px-6' />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CoverImagePopup;
