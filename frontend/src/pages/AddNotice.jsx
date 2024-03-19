import React from 'react';
import { useForm } from 'react-hook-form';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import InputField from '../components/InputField';

function AddNotice() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // Handle form submission (e.g., send data to server)
        console.log('Form submitted:', data);
        // You can add logic here to send the data to the server
        // and handle the response as needed
    };

    return (
        <div className='container min-w-full min-h-screen bg-[#F0F1F3]'>
            <div className="flex">
                <Sidebar />
                <div className="w-5/6 p-4 bg-[#F0F1F3] absolute right-0 pt-0">
            <Header title="Admin" />
                    <div className="container min-w-full min-h-screen bg-[#F0F1F3]">
                        <div className="p-4 bg-[#F0F1F3] flex flex-col justify-center items-center">
                            <h1 className="text-2xl font-bold mb-4">Add New Notice</h1>
                            <form onSubmit={handleSubmit(onSubmit)} className='w-1/2'>
                                <InputField
                                    type="text"
                                    label="Title:"
                                    placeholder="Notice Title"
                                    {...register("title", { required: "Title is required" })}
                                    className="mb-2"
                                />
                                {errors.title && <span className='text-red-600'>{errors.title.message}</span>}
                                <InputField
                                    type="textarea"
                                    label="Description:"
                                    placeholder="Notice Description"
                                    {...register("description", { required: "Description is required" })}
                                    className="mb-2"
                                />
                                {errors.description && <span className='text-red-600'>{errors.description.message}</span>}
                               <div>
                               <Button children="Add Notice" type='submit' className='my-3 px-3' />
                               </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddNotice;
