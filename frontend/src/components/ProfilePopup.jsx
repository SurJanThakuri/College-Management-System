import React, { useState } from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';
import ProfilePicturePopup from './ProfilePicturePopup';
import { useForm } from 'react-hook-form';

const ProfilePopup = ({ data, onClose }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
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
            <div className="bg-white p-8 rounded-lg h-[70vh] w-[30vw] relative">
                <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4">
                    <p className="font-bold text-xl">Profile Details</p>
                    <button onClick={onClose}>
                        <img className='w-4' src="/images/close.png" alt="" />
                    </button>
                </div>
                <div className="">
                    <img src={data.image} alt="Profile" className="rounded-full w-24 h-24 mx-auto mb-4 mt-4" />
                   
                </div>
                <div className="">
                    <p className="font-bold text-xl text-center">{data.name}</p>
                    <div className='mx-8 my-6'>
                        <div className="flex items-center gap-4">
                            <p className='font-bold text-lg'>Email:</p><p className="text-gray-500 text-xl">{data.email}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <p className='font-bold text-lg'>Address:</p><p className="text-gray-500 text-xl">{data.address}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <p className='font-bold text-lg'>Phone:</p><p className="text-gray-500 text-xl">{data.phone}</p>
                        </div>
                    </div>

                </div>
                <div className="button text-center my-10 flex justify-center items-center gap-4">
                    <Link to="/admin-dashboard/edit">
                        <Button children="Edit Profile" className='px-6 py-2' />
                    </Link>
                    <img src="/images/camera.png" className='h-10 mb-4' onClick={handleCameraClick} />
                </div>
            </div>
            {showProfilePicturePopup && <ProfilePicturePopup data={data} onClose={handleCloseProfilePicturePopup} />}
        </div>
    );
};

export default ProfilePopup;
