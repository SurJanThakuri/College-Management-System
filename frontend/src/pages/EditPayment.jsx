import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import InputField from '../components/InputField';

function EditPayment() {
    const { id } = useParams();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [payment, setPayment] = useState(null);
    const [faculties, setFaculties] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [students, setStudents] = useState([]);

    // Simulated fetch payment data function
    const fetchPaymentData = (paymentId) => {
        // Replace this with your actual fetch logic
        return {
            id: paymentId,
            date: '2023-01-01',
            amount: '20000',
            name: 'John Doe',
            semester: 'first',
            faculty: 'BCA',
        };
    };

    useEffect(() => {
        const paymentData = fetchPaymentData(id);
        setPayment(paymentData);

        // Fetch faculties, semesters, and students from the database or an API
        // For now, use dummy data
        const dummyFaculties = ['BCA', 'BBA', 'BCom', 'BSc', 'BA'];
        const dummySemesters = ['First', 'Second', 'Third', 'Fourth'];
        const dummyStudents = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown', 'Charlie Wilson'];
        setFaculties(dummyFaculties);
        setSemesters(dummySemesters);
        setStudents(dummyStudents);
    }, [id]);

    const onSubmit = (data) => {
        // Handle form submission (e.g., send data to server)
        console.log('Form submitted:', data);
    };

    if (!payment) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container min-w-full min-h-screen bg-[#F0F1F3]'>
            <div className="flex">
                <Sidebar />
                <div className="w-5/6 p-4 bg-[#F0F1F3] md:absolute md:right-0 absolute right-8 pt-0">
                    <Header title="Admin" />
                    <div className="container min-w-full min-h-screen bg-[#FFFFFF]">
                        <div className="p-4 bg-[#FFFFFF] flex flex-col justify-center items-center">
                            <h1 className="text-2xl font-bold mb-2">Edit Payment</h1>
                            <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-1/2'>
                                <InputField
                                    type="date"
                                    label="Date:"
                                    placeholder="Payment Date"
                                    defaultValue={payment.date}
                                    {...register("date", { required: "Date is required" })}
                                    className="mb-2"
                                />
                                {errors.date && <span className='text-red-600'>{errors.date.message}</span>}
                                <InputField
                                    type="text"
                                    label="Amount:"
                                    placeholder="Payment Amount"
                                    defaultValue={payment.amount}
                                    {...register("amount", { required: "Amount is required" })}
                                    className="mb-2"
                                />
                                {errors.amount && <span className='text-red-600'>{errors.amount.message}</span>}
                                <InputField
                                    label="Name:"
                                    type="select"
                                    options={students}
                                    defaultValue={payment.name}
                                    {...register("name", { required: "Name is required" })}
                                    className="mb-2"
                                />
                                {errors.name && <span className='text-red-600'>{errors.name.message}</span>}
                                <InputField
                                    label="Faculty:"
                                    type="select"
                                    options={faculties}
                                    defaultValue={payment.faculty}
                                    {...register("faculty", { required: "Faculty is required" })}
                                    className="mb-2"
                                />
                                {errors.semester && <span className='text-red-600'>{errors.faculty.message}</span>}

                                <InputField
                                    label="Semester:"
                                    type="select"
                                    options={semesters}
                                    defaultValue={payment.semester}
                                    {...register("semester", { required: "Semester is required" })}
                                    className="mb-2"
                                />
                                {errors.faculty && <span className='text-red-600'>{errors.semester.message}</span>}
                                <Button children="Update Payment" type='submit' className='my-3 px-3' />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditPayment;
