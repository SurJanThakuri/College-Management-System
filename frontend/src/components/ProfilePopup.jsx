import React, { useState, useEffect } from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';
import ProfilePicturePopup from './ProfilePicturePopup';
import { useForm } from 'react-hook-form';
import { refreshToken } from '../services/authServices';

const ProfilePopup = ({ data, onClose }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {

        const accessToken = localStorage.getItem('accessToken');
        const accessTokenExpiry = localStorage.getItem('accessTokenExpiry');

        if (!accessToken || !accessTokenExpiry || new Date(accessTokenExpiry) < new Date()) {
             refreshToken();
        }
        }, []);

    const onSubmit = (data) => {
        // Handle form submission (e.g., send data to server)
        console.log('Form submitted:', data);
        // You can add logic here to send the data to the server
        // and handle the response as needed
    };
    const [showProfilePicturePopup, setShowProfilePicturePopup] = useState(false);

    const handleCameraClick = () => {
        setShowProfilePicturePopup(true);
    };

    const handleCloseProfilePicturePopup = () => {
        setShowProfilePicturePopup(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg max-w-[95vw] w-full relative md:max-w-[35vw]">
                <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 sm:p-6">
                    <p className="font-bold text-xl">Profile Details</p>
                    <button onClick={onClose}>
                        <img className='w-4' src="/images/close.png" alt="" />
                    </button>
                </div>
                <div className="sm:flex sm:flex-col sm:items-center sm:space-x-6">
                    <img src={data.profilePicture} alt="Profile" className="rounded-full w-24 h-24 mx-auto mb-4 mt-4 sm:w-32 sm:h-32 sm:mx-0 sm:mb-0 sm:mt-6" />
                    <p className="font-bold text-xl sm:text-2xl text-center">{data.name}</p>
                    
                </div>
                <div className="sm:flex sm:items-center sm:space-x-6 mt-6">
                    <div className='mx-6 my-6'>
                        <div className="flex items-center gap-4">
                            <p className='font-bold text-lg sm:text-xl'>Email:</p><p className="text-gray-500 text-xl sm:text-2xl">{data.email}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <p className='font-bold text-lg sm:text-xl'>Address:</p><p className="text-gray-500 text-xl sm:text-2xl">{data.address}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <p className='font-bold text-lg sm:text-xl'>Phone:</p><p className="text-gray-500 text-xl sm:text-2xl">{data.phone}</p>
                        </div>
                    </div>

                </div>
                <div className="button text-center my-10 flex items-center justify-center gap-4 sm:flex sm:items-center sm:justify-center sm:gap-4">
                    <Link to="/admin-dashboard/edit">
                        <Button children="Edit Profile" className='px-6 py-2 sm:px-8 sm:py-4' />
                    </Link>
                    <img src="/images/camera.png" className='h-10 mb-4 sm:h-12 sm:mb-6' onClick={handleCameraClick} />
                </div>
            </div>
            {showProfilePicturePopup && <ProfilePicturePopup data={data} onClose={handleCloseProfilePicturePopup} />}
        </div>
    );
};

export default ProfilePopup;
