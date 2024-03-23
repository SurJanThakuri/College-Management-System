import React from 'react';
import InputField from './InputField';
import { useForm } from 'react-hook-form';
import Button from './Button';


const ProfilePicturePopup = ({ data, onClose }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        // Handle form submission (e.g., send data to server)
        console.log('Form submitted:', data);
        // You can add logic here to send the data to the server
        // and handle the response as needed
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-full p-4 relative rounded-xl max-w-sm max-h-[80vh] sm:max-w-md sm:max-h-[60vh] md:max-w-sm md:max-h-[60vh] lg:max-w-[40vw]">
                <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 sm:p-6">
                    <p className="font-bold text-xl">Profile Details</p>
                    <button onClick={onClose}>
                        <img className='w-4' src="/images/close.png" alt="" />
                    </button>
                </div>
                <div className="flex flex-col items-center">
                    <img src={data.image} alt="Profile" className="rounded-full w-24 h-24 m-4 sm:w-32 sm:h-32" />

                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center mt-6">
                <div className="flex items-center w-full">
                    <InputField
                        type="file"
                        label="Choose new profile picture:"
                        {...register("image", { required: "image is required" })}
                        className="flex-grow"
                    />
                </div>
                <div className='flex justify-center my-2 w-full'>
                    <Button children="Save" type='submit' className='my-3 px-6' />
                </div>
                </form>
            </div>
        </div>
    );
};

export default ProfilePicturePopup;
