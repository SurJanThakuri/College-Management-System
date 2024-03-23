import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import InputField from '../components/InputField';

function AddPayment() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const [error, setError] = useState("");
    const [faculties, setFaculties] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        // Fetch faculties, semesters, and students from the database or an API
        // For now, use dummy data
        const dummyFaculties = ['BCA', 'BBA', 'BCom', 'BSc', 'BA'];
        const dummySemesters = ['First', 'Second', 'Third', 'Fourth'];
        const dummyStudents = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown', 'Charlie Wilson'];
        setFaculties(dummyFaculties);
        setSemesters(dummySemesters);
        setStudents(dummyStudents);
    }, []);

    const onSubmit = (data) => {
        // Add logic to submit the payment data to the database or API
        console.log(data);
    };

    return (
        <div className='container min-w-full min-h-screen bg-[#F0F1F3]'>
            <div className="flex">
                <Sidebar />
                <div className="w-5/6 p-4 bg-[#F0F1F3] md:absolute md:right-0 absolute right-8 pt-0">
                    <Header title="Admin" />
                    <div className="container min-w-full min-h-screen bg-[#FFFFFF]">
                        <div className="p-4 bg-[#FFFFFF] flex items-center flex-col ">
                            <h1 className="text-2xl font-bold mb-4">Add Payment</h1>
                            <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-1/2'>
                            <InputField
                                label="Date"
                                name="date"
                                type="date"
                                {...register("date",{required: "Date is required"})}
                                
                                />
                                {errors.date && <span className='text-red-600'>{errors.date.message}</span>}
                                <InputField
                                    label="Faculty"
                                    name="faculty"
                                    type="select"
                                    options={faculties}
                                    {...register("faculty", { required: "Faculty is required" })}
                                    
                                />
                                {errors.faculty && <span className='text-red-600'>{errors.faculty.message}</span>}
                                <InputField
                                    label="Semester"
                                    name="semester"
                                    type="select"
                                    options={semesters}
                                    {...register("semester", { required: "Semester is required" })}
                                    
                                />
                                {errors.semester && <span className='text-red-600'>{errors.semester.message}</span>}
                                <InputField
                                    label="Student"
                                    name="student"
                                    type="select"
                                    options={students}
                                    {...register("student", { required: "Student is required" })}
                                    
                                />
                                {errors.student && <span className='text-red-600'>{errors.student.message}</span>}
                                <InputField
                                    label="Amount"
                                    name="amount"
                                    type="text"
                                    {...register("amount", { required: "Amount is required" })}
                                    
                                />
                                {errors.amount && <span className='text-red-600'>{errors.amount.message}</span>}
                                <div className="my-5">
                                    <Button type="submit" children="Add Payment" className='px-3' />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddPayment;
