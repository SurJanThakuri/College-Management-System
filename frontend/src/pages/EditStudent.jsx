import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import InputField from '../components/InputField';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditStudent() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const { id } = useParams();
    const [student, setStudent] = useState(null);

    const [faculties, setFaculties] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        const accessToken = localStorage.getItem('accessToken');
        const accessTokenExpiry = localStorage.getItem('accessTokenExpiry');

        if (!accessToken || !accessTokenExpiry || new Date(accessTokenExpiry) < new Date()) {
            refreshToken();
        }
    }, []);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        axios.get('http://localhost:8000/api/v1/admin/faculties', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                setFaculties(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching faculties:', error);
            });
    }, []);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        axios.get(`http://localhost:8000/api/v1/admins/students/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(response => {
                setStudent(response.data.data);
                setValue('name', response.data.data.name);
                setValue('email', response.data.data.email);
                setValue('address', response.data.data.address);
                setValue('dob', response.data.data.dob);
                setValue('gender', response.data.data.gender);
                setValue('nationality', response.data.data.nationality);
                setValue('rollNo', response.data.data.rollNo);
                setValue('emergencyContact', response.data.data.emergencyContact);
                setValue('guardianName', response.data.data.guardianName);
                setValue('guardianRelation', response.data.data.guardianRelation);
                setValue('guardianPhone', response.data.data.guardianPhone);
                setValue('bloodGroup', response.data.data.bloodGroup);
                setValue('admissionYear', response.data.data.admissionYear);
                setValue('shift', response.data.data.shift);
                setValue('phone', response.data.data.phone);
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

    if (!student) {
        return <div>Loading...</div>;
    }

    const onSubmit = (data) => {
        const accessToken = localStorage.getItem('accessToken');
        axios.patch(`http://localhost:8000/api/v1/admins/update-student/${id}`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(response => {
                navigate(`/admin-dashboard/students/${id}`);

            })
            .catch(error => {
                console.error('Error updating student:', error);
            });
    };

    return (
        <div className='container min-w-full min-h-screen bg-[#F0F1F3]'>
            <div className="flex">
                <Sidebar />
                <div className="w-5/6 p-4 bg-[#F0F1F3] md:absolute md:right-0 absolute right-8 pt-0">
                    <Header title="Admin" />
                    <div className="container min-w-full min-h-screen bg-[#F0F1F3]">
                        <div className="p-4 bg-[#F0F1F3] flex flex-col justify-center items-center">
                            <h1 className="text-2xl font-bold mb-4">Edit Student</h1>
                            <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-1/2'>
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
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                            message: "Email address must be a valid address",
                                        },
                                    })}
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
                                    label="Address:"
                                    placeholder="Address"
                                    {...register("address", { required: true })}
                                    className="mb-2"
                                />
                                {errors.address && <span className='text-red-600'>This field is required</span>}
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
                                <label htmlFor="faculty" className="block mb-2">Select Faculty:</label>
                                <select
                                    name="faculty"                                     
                                    {...register("faculty", { required: true })}
                                    defaultValue={student.faculty._id}
                                    className="w-full h-10 rounded-md border-2 mb-2"
                                >   
                                    <option value="">Select a faculty</option>
                                    {faculties.map((faculty) => (
                                        <option
                                            key={faculty._id}
                                            value={faculty._id}
                                        >
                                         {faculty.name}
                                        </option>
                                    ))}
                                </select>

                                {errors.faculty && <span className='text-red-600'>This field is required</span>}
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
                                    label="Roll Number:"
                                    placeholder="Roll Number"
                                    {...register("rollNo", { required: true })}
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
                                    {...register("guardianRelation", { required: true })}
                                    className="mb-2"
                                />
                                {errors.guardianRelationship && <span className='text-red-600'>This field is required</span>}
                                <InputField
                                    type="text"
                                    label="Guardian's Contact:"
                                    placeholder="Guardian's Contact"
                                    {...register("guardianPhone", { required: true })}
                                    className="mb-2"
                                />
                                {errors.guardianContact && <span className='text-red-600'>This field is required</span>}
                                <div>
                                    <Button children="Update Student" type='submit' className='my-3 px-3' />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditStudent;
