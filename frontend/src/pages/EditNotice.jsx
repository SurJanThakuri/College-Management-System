import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import InputField from '../components/InputField';

function EditNotice() {
    const { id } = useParams();
    const [notice, setNotice] = useState({ title: '', description: '' });
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        // Mock data for an existing teacher
        const notice = {
            title: 'This is the title',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        };

        // Set default values for each field
        Object.keys(notice).forEach(key => setValue(key, notice[key]));
    }, [setValue]);

    const onSubmit = (data) => {
        // Handle form submission (e.g., send data to server)
        console.log('Form submitted:', data);
        // You can add logic here to update the notice data on the server
        // and handle the response as needed
    };

    return (
        <div className='container min-w-full min-h-screen bg-[#F0F1F3]'>
            <div className="flex">
                <Sidebar />
                <div className="w-5/6 p-4 bg-[#F0F1F3] md:absolute md:right-0 absolute right-8 pt-0">
            <Header title="Admin" />
                    <div className="container min-w-full min-h-screen bg-[#F0F1F3]">
                        <div className="p-4 bg-[#F0F1F3] flex flex-col justify-center items-center">
                            <h1 className="text-2xl font-bold mb-4">Edit Notice</h1>
                            <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-1/2'>
                                <InputField
                                    type="text"
                                    label="Title:"
                                    placeholder="Notice Title"
                                    {...register("title", { required: true })}
                                    className="mb-2"
                                />
                                {errors.title && <span className='text-red-600'>This field is required</span>}
                                <InputField
                                    type="textarea"
                                    label="Description:"
                                    placeholder="Notice Description"
                                    {...register("description", { required: true })}
                                    className="mb-2"
                                />
                                {errors.description && <span className='text-red-600'>This field is required</span>}
                               <div>
                               <Button children="Save Changes" type='submit' className='my-3 px-3' />   
                               </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditNotice;
