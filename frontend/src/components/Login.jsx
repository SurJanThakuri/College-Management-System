import React, { useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { useForm } from "react-hook-form";

function Login({ title }) {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const [error, setError] = useState("");

    const login = (data) => {
        //TODO: authenication here
        console.log(data);
    };

    return (
        <div>
            <div className="bg-[#FFFFFF] min-h-screen flex items-center justify-center">
                <div className="max-w-md w-full bg-[#F4F5FF] p-8 rounded shadow-lg">
                    <h1 className="text-3xl font-bold text-center mb-4 text-[#35344E]">
                        {title} Login
                    </h1>
                    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                    <form onSubmit={handleSubmit(login)} className="space-y-4">
                        <InputField
                            type="text"
                            label="Email:"
                            id="email"
                            placeholder="enter your email"
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
                            placeholder="enter your password"
                            {...register("password", { required: "Password is required" })}
                        />
                        {errors.password && <p className="text-red-600">{errors.password.message}</p>}
                        <div className="flex justify-center items-center">
                            <Button
                                type="submit"
                                className="w-40"
                            >Login</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
