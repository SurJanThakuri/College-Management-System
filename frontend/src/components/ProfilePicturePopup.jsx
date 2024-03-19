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
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="">
                    <InputField
                        type="file"
                        label="Choose new profile picture:"
                        {...register("image", { required: "image is required" })}
                    />
                </div>
                <div className='text-center my-2'>
                    <Button children="Save" type='submit' className='my-3 px-6' />
                </div>
                </form>
            </div>
        </div>
    );
};

export default ProfilePicturePopup;
