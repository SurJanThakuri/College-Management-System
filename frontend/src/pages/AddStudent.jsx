import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import InputField from '../components/InputField';
import axios from 'axios';
import { refreshToken } from '../services/authServices';
import { useNavigate } from 'react-router-dom';
import API_URL from '../api';

function AddStudent() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [faculties, setFaculties] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const accessTokenExpiry = localStorage.getItem('accessTokenExpiry');

        if (!accessToken || !accessTokenExpiry || new Date(accessTokenExpiry) < new Date()) {
             refreshToken();
        }
    }, []);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        axios.get(`${API_URL}/admin/faculties`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setFaculties(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching faculties:', error);
            });
    }, []);

    const onSubmit = (data) => {
        const accessToken = localStorage.getItem('accessToken');
        axios.post(`${API_URL}/admins/student/register`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(response => {
                navigate('/admin-dashboard/students');
            })
            .catch(e => {
                let errorMessage = 'An unexpected error occurred';
                if (e.response && e.response.data) {
                    try {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(e.response.data, 'text/html');
                        const pre = doc.querySelector('pre');
                        if (pre) {
                            const fullMessage = pre.textContent;
                            errorMessage = fullMessage.split('at')[0].replace('Error:', '').trim();
                        }
                    } catch (parseError) {
                        errorMessage = 'An unexpected error occurred while parsing the error message';
                    }
                }
                setError(errorMessage);
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
                            <h1 className="text-2xl font-bold mb-4">Add New Student</h1>
                            <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-1/2'>
                                <InputField
                                    type="text"
                                    label="Name:"
                                    placeholder="Student Name"
                                    {...register("name", {
                                        required: "Name is required",
                                        minLength: { value: 2, message: "Name must be at least 2 characters long" },
                                        pattern: { value: /^[A-Za-z\s]+$/, message: "Name must contain only letters and spaces" }
                                    })}
                                    className="mb-2"
                                />
                                {errors.name && <span className='text-red-600'>{errors.name.message}</span>}
                                
                                <InputField
                                    type="email"
                                    label="Email:"
                                    placeholder="Student Email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: { value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, message: "Email address must be valid" }
                                    })}
                                    className="mb-2"
                                />
                                {errors.email && <span className='text-red-600'>{errors.email.message}</span>}
                                
                                <InputField
                                    type="password"
                                    label="Password:"
                                    placeholder="Create Password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 8, message: "Password must be at least 8 characters long" },
                                        pattern: { value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, message: "Password must contain at least one uppercase letter, one lowercase letter, and one number" }
                                    })}
                                    className="mb-2"
                                />
                                {errors.password && <span className='text-red-600'>{errors.password.message}</span>}
                                
                                <InputField
                                    type="tel"
                                    label="Phone Number:"
                                    placeholder="Phone Number"
                                    {...register("phone", {
                                        required: "Phone number is required",
                                        pattern: { value: /^\d{10}$/, message: "Phone number must be 10 digits" }
                                    })}
                                    className="mb-2"
                                />
                                {errors.phone && <span className='text-red-600'>{errors.phone.message}</span>}
                                
                                <InputField
                                    type="text"
                                    label="Address:"
                                    placeholder="Address"
                                    {...register("address", { required: "Address is required" })}
                                    className="mb-2"
                                />
                                {errors.address && <span className='text-red-600'>{errors.address.message}</span>}
                                
                                <InputField
                                    type="text"
                                    label="Shift:"
                                    placeholder="Shift"
                                    {...register("shift", { required: "Shift is required" })}
                                    className="mb-2"
                                />
                                {errors.shift && <span className='text-red-600'>{errors.shift.message}</span>}
                                
                                <InputField
                                    type="date"
                                    label="Date of Birth:"
                                    placeholder="Date of Birth"
                                    {...register("dob", { required: "Date of Birth is required" })}
                                    className="mb-2"
                                />
                                {errors.dob && <span className='text-red-600'>{errors.dob.message}</span>}
                                
                                <InputField
                                    type="text"
                                    label="Gender:"
                                    placeholder="Gender"
                                    {...register("gender", { required: "Gender is required" })}
                                    className="mb-2"
                                />
                                {errors.gender && <span className='text-red-600'>{errors.gender.message}</span>}
                                
                                <label htmlFor="faculty" className="block mb-2">Select Faculty:</label>
                                <select
                                    name="faculty"
                                    id="faculty"
                                    {...register("faculty", { required: "Faculty is required" })}
                                    className="w-full h-10 rounded-md border-2 mb-2"
                                >
                                    <option value="">Select a faculty</option>
                                    {faculties.map(faculty => (
                                        <option key={faculty._id} value={faculty._id}>{faculty.name}</option>
                                    ))}
                                </select>
                                {errors.faculty && <span className='text-red-600'>{errors.faculty.message}</span>}
                                
                                <InputField
                                    type="text"
                                    label="Nationality:"
                                    placeholder="Nationality"
                                    {...register("nationality", { required: "Nationality is required" })}
                                    className="mb-2"
                                />
                                {errors.nationality && <span className='text-red-600'>{errors.nationality.message}</span>}
                                
                                <InputField
                                    type="number"
                                    label="Total Fee:"
                                    placeholder="Total Fee"
                                    {...register("totalFee", {
                                        required: "Total fee is required",
                                        min: { value: 0, message: "Total fee cannot be negative" }
                                    })}
                                    className="mb-2"
                                />
                                {errors.totalFee && <span className='text-red-600'>{errors.totalFee.message}</span>}
                                
                                <InputField
                                    type="tel"
                                    label="Emergency Contact:"
                                    placeholder="Emergency Contact"
                                    {...register("emergencyContact", {
                                        required: "Emergency contact is required",
                                        pattern: { value: /^\d{10}$/, message: "Emergency contact must be 10 digits" }
                                    })}
                                    className="mb-2"
                                />
                                {errors.emergencyContact && <span className='text-red-600'>{errors.emergencyContact.message}</span>}
                                
                                <InputField
                                    type="text"
                                    label="Blood Group:"
                                    placeholder="Blood Group"
                                    {...register("bloodGroup", { required: "Blood group is required" })}
                                    className="mb-2"
                                />
                                {errors.bloodGroup && <span className='text-red-600'>{errors.bloodGroup.message}</span>}
                                
                                <InputField
                                    type="number"
                                    label="Admission Year:"
                                    placeholder="Admission Year"
                                    {...register("admissionYear", {
                                        required: "Admission year is required",
                                        min: { value: 1900, message: "Admission year must be valid" },
                                        max: { value: new Date().getFullYear(), message: `Admission year cannot be in the future` }
                                    })}
                                    className="mb-2"
                                />
                                {errors.admissionYear && <span className='text-red-600'>{errors.admissionYear.message}</span>}
                                
                                <InputField
                                    type="text"
                                    label="Roll Number:"
                                    placeholder="Roll Number"
                                    {...register("rollNo", {
                                        required: "Roll number is required",
                                        pattern: { value: /^\d+$/, message: "Roll number must contain only digits" }
                                    })}
                                    className="mb-2"
                                />
                                {errors.rollNo && <span className='text-red-600'>{errors.rollNo.message}</span>}
                                <InputField
                                    type="text"
                                    label="Guardian's Name:"
                                    placeholder="Guardian's Name"
                                    {...register("guardianName", { required: "Guardian's Name is required" })}
                                    className="mb-2"
                                />
                                {errors.guardianName && <span className='text-red-600'>This field is required</span>}
                                <InputField
                                    type="text"
                                    label="Guardian's Relationship:"
                                    placeholder="Guardian's Relationship"
                                    {...register("guardianRelation", { required: "Guardian's Relationship is required" })}
                                    className="mb-2"
                                />
                                {errors.guardianRelationship && <span className='text-red-600'>This field is required</span>}
                                <InputField
                                    type="text"
                                    label="Guardian's Contact:"
                                    placeholder="Guardian's Contact"
                                    {...register("guardianPhone", { required: "Guardian's contact is required" ,
                                        pattern: { value: /^\d{10}$/, message: "Guardian's contact must be 10 digits" }
                                    }
                                        
                                    )}
                                    
                                    className="mb-2"
                                />
                                {errors.guardianContact && <span className='text-red-600'>This field is required</span>}
                                <div>
                                {error && <p className="text-red-600 mt-4">{error}</p>}
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