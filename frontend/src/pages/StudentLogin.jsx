import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import InputField from '../components/InputField';
import Button from '../components/Button';
import API_URL from '../api';
import {Link} from 'react-router-dom';

const AdminLogin = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const [error, setError] = useState('');

    const login = (data) => {
        axios.post(`${API_URL}/admins/login`, data)
            .then(response => {
                console.log('Login successful:', response.data);
                // Optionally, redirect user to another page after successful login using link of react router dom
                window.location.href = '/admin-dashboard';
                
            })
            .catch(error => {
                console.error('Login error:', error);
                setError('Login failed. Please check your credentials.');
            });
    };
    return (
        <div>
            <div className="bg-[#FFFFFF] min-h-screen flex items-center justify-center">
                <div className="max-w-md w-full bg-[#F4F5FF] p-8 rounded shadow-lg">
                    <h1 className="text-3xl font-bold text-center mb-4 text-[#35344E]">
                        Student Login
                    </h1>
                    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                    <form onSubmit={handleSubmit(login)} className="space-y-4">
                        <InputField
                            type="text"
                            label="Email:"
                            id="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                    message: "Email address must be a valid address",
                                },
                            })}
                        />
                        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                        <InputField
                            type="password"
                            label="Password:"
                            id="password"
                            placeholder="Enter your password"
                            {...register("password", { required: "Password is required" })}
                        />
                        {errors.password && <p className="text-red-600">{errors.password.message}</p>}
                        <div className="flex justify-center items-center">
                            <Button
                                type="submit"
                                className="w-40"
                            >Login</Button>
                        </div>
                        <div className="flex justify-center items-center mt-4">
                            <Link to="/admin-login">
                            <button
                                
                                className="text-sm text-[#35344E] hover:text-[#4287f5] transition-colors duration-200"
                            >Admin Login</button>
                            </Link>
                            <span className="mx-2">|</span>
                            <Link to="/teacher-login">
                            <button
                                className="text-sm text-[#35344E] hover:text-[#4287f5] transition-colors duration-200"
                            >Teacher Login</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
