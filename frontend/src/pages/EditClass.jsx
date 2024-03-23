import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import InputField from '../components/InputField';

function EditClass() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    useEffect(() => {
        // Simulating existing class data
        const existingData = {
            day: 'Monday',
            subjects: [
                'Mathematics',
                'Science',
                'History',
                'English'
            ]
        };
        // Set existing data to form fields
        setValue('day', existingData.day);
        existingData.subjects.forEach((subject, index) => {
            setValue(`subjects[${index}]`, subject);
        });
    }, [setValue]);

    const onSubmit = (data) => {
        // Handle form submission (e.g., send data to server)
        console.log('Form submitted:', data);
    };

    const time = [
        "6:30 AM - 7:30 AM",
        "7:30 AM - 8:30 AM",
        "9:00 AM - 10:00 AM",
        "10:00 AM - 11:00 AM"
    ]

    const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Saturday']

    return (
        <div className='container min-w-full min-h-screen bg-[#F0F1F3]'>
            <div className="flex">
                <Sidebar />
                <div className="w-5/6 p-4 bg-[#F0F1F3] md:absolute md:right-0 absolute right-8 pt-0">
                    <Header title="Admin" />
                    <div className="container min-w-full min-h-screen bg-[#FFFFFF]">
                        <div className="p-4 bg-[#FFFFFF] flex flex-col justify-center items-center">
                            <h1 className="text-2xl font-bold mb-4">Edit Class</h1>
                            <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-1/2'>
                                <InputField
                                    type="select"
                                    label="Day:"
                                    options={day}
                                    {...register("day", { required: true })}
                                    className="mb-2"
                                />
                                {errors.day && <span className='text-red-600'>This field is required</span>}
                                {time.map((slot, index) => (
                                    <InputField
                                        key={index}
                                        type="text"
                                        label={`Subject at ${slot}:`}
                                        placeholder="Enter The Subject"
                                        {...register(`subjects[${index}]`, { required: true })}
                                        className="mb-2"
                                    />
                                ))}
                                {errors.subjects && errors.subjects.map((error, index) => (
                                    <span key={index} className='text-red-600'>Subject at {time[index]} is required</span>
                                ))}
                                <Button children="Update Class" type='submit' className='my-3 px-3' />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditClass;
