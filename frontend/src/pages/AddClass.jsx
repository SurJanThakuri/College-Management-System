import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import InputField from '../components/InputField';

function AddClass() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // Handle form submission (e.g., send data to server)
        console.log('Form submitted:', data);
    };

    const time = [
        "6:30 AM - 7:30 AM",
        "7:30 AM - 8:30 AM",
        "9:00 AM - 10:00 AM",
        "10:00 AM - 11:00 AM",
        "11:00 AM - 12:00 PM"
    ]

    const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Saturday']

    return (
        <div className='container min-w-full min-h-screen bg-[#F0F1F3]'>
            <div className="flex">
                <Sidebar />
                <div className="w-5/6 p-4 bg-[#F0F1F3] pt-0 md:absolute md:right-0 absolute right-8">
                    <Header title="Admin" />
                    <div className="container min-w-full min-h-screen bg-[#FFFFFF]">
                        <div className="p-4 bg-[#FFFFFF] flex flex-col justify-center items-center">
                            <h1 className="text-2xl font-bold mb-4">Add New Class</h1>
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
                                <Button children="Add Class" type='submit' className='my-3 px-3' />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddClass;
