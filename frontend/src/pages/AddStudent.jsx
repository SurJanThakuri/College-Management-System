import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import InputField from '../components/InputField';

function AddStudent() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // Handle form submission (e.g., send data to server)
        console.log('Form submitted:', data);
        // Optionally, redirect user to another page after submission
    };

    return (
        <div className='container min-w-full min-h-screen bg-[#F0F1F3]'>
            <div className="flex">
                <Sidebar />
                <div className="w-5/6 p-4 bg-[#F0F1F3] absolute right-0 pt-0">
                    <Header title="Admin" />
                    <div className="container min-w-full min-h-screen bg-[#F0F1F3]">
                        <div className="p-4 bg-[#F0F1F3] flex flex-col justify-center items-center">
                            <h1 className="text-2xl font-bold mb-4">Add New Student</h1>
                            <form onSubmit={handleSubmit(onSubmit)} className='w-1/2'>
                                <InputField
                                    type="text"
                                    label="Name:"
                                    placeholder="Student Name"
                                    {...register("name", { required: true })}
                                    className="mb-2"
                                />
                                {errors.name && <span className='text-red-600'>This field is required</span>}
                                <InputField
                                    type="email"
                                    label="Email:"
                                    placeholder="Student Email"
                                    {...register("email", { required: "Email is required",
                                        pattern: {
                                            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                            message: "Email address must be a valid address",
                                        }, })}
                                    className="mb-2"
                                />
                                {errors.email && <span className='text-red-600'>{errors.email.message}</span>}
                                <InputField
                                    type="text"
                                    label="Phone Number:"
                                    placeholder="Phone Number"
                                    {...register("phone", { required: true })}
                                    className="mb-2"
                                />
                                {errors.phone && <span className='text-red-600'>This field is required</span>}
                                <InputField
                                    type="text"
                                    label="Shift:"
                                    placeholder="Shift"
                                    {...register("shift", { required: true })}
                                    className="mb-2"
                                />
                                {errors.shift && <span className='text-red-600'>This field is required</span>}
                                <InputField
                                    type="date"
                                    label="Date of Birth:"
                                    placeholder="Date of Birth"
                                    {...register("dob", { required: true })}
                                    className="mb-2"
                                />
                                {errors.dob && <span className='text-red-600'>This field is required</span>}
                                <InputField
                                    type="text"
                                    label="Gender:"
                                    placeholder="Gender"
                                    {...register("gender", { required: true })}
                                    className="mb-2"
                                />
                                {errors.gender && <span className='text-red-600'>This field is required</span>}
                                <InputField
                                    type="text"
                                    label="Nationality:"
                                    placeholder="Nationality"
                                    {...register("nationality", { required: true })}
                                    className="mb-2"
                                />
                                {errors.nationality && <span className='text-red-600'>This field is required</span>}
                                <InputField
                                    type="text"
                                    label="Emergency Contact:"
                                    placeholder="Emergency Contact"
                                    {...register("emergencyContact", { required: true })}
                                    className="mb-2"
                                />
                                {errors.emergencyContact && <span className='text-red-600'>This field is required</span>}
                                <InputField
                                    type="text"
                                    label="Blood Group:"
                                    placeholder="Blood Group"
                                    {...register("bloodGroup", { required: true })}
                                    className="mb-2"
                                />
                                {errors.bloodGroup && <span className='text-red-600'>This field is required</span>}
                                <InputField
                                    type="text"
                                    label="Admission Year:"
                                    placeholder="Admission Year"
                                    {...register("admissionYear", { required: true })}
                                    className="mb-2"
                                />
                                {errors.admissionYear && <span className='text-red-600'>This field is required</span>}
                                <InputField
                                    type="text"
                                    label="Faculty:"
                                    placeholder="Faculty"
                                    {...register("faculty", { required: true })}
                                    className="mb-2"
                                />
                                {errors.faculty && <span className='text-red-600'>This field is required</span>}
                                <InputField
                                    type="text"
                                    label="Roll Number:"
                                    placeholder="Roll Number"
                                    {...register("rollNumber", { required: true })}
                                    className="mb-2"
                                />
                                {errors.rollNumber && <span className='text-red-600'>This field is required</span>}
                                <InputField
                                    type="text"
                                    label="Guardian's Name:"
                                    placeholder="Guardian's Name"
                                    {...register("guardianName", { required: true })}
                                    className="mb-2"
                                />
                                {errors.guardianName && <span className='text-red-600'>This field is required</span>}
                                <InputField
                                    type="text"
                                    label="Guardian's Relationship:"
                                    placeholder="Guardian's Relationship"
                                    {...register("guardianRelationship", { required: true })}
                                    className="mb-2"
                                />
                                {errors.guardianRelationship && <span className='text-red-600'>This field is required</span>}
                                <InputField
                                    type="text"
                                    label="Guardian's Contact:"
                                    placeholder="Guardian's Contact"
                                    {...register("guardianContact", { required: true })}
                                    className="mb-2"
                                />
                                {errors.guardianContact && <span className='text-red-600'>This field is required</span>}
                                <div>
                                <Button children="Add Student" type='submit' className='my-3 px-3' />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddStudent;
