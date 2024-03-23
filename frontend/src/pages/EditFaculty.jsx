import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import InputField from '../components/InputField';
import { useForm } from 'react-hook-form';

function EditFaculty() {
    const { id } = useParams(); // Assuming you have a route parameter for faculty id
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [faculty, setFaculty] = useState(null);

    // Simulating fetching faculty data based on id
    // Replace this with actual API call
    const fetchFacultyData = () => {
        // Fetch faculty data based on id and set state
        setFaculty({
            name: 'Faculty Name',
            description: 'Faculty Description',
            // Set other properties as needed
        });
    };

    // Call fetchFacultyData on component mount
    useEffect(() => {
        fetchFacultyData();
    }, []);

    const onSubmit = (data) => {
        // Handle form submission (e.g., send data to server)
        console.log('Form submitted:', { id, ...data });
        // Optionally, redirect user to another page after submission
    };

    return (
        <div className='container min-w-full min-h-screen bg-[#F0F1F3]'>
            <div className="flex">
                <Sidebar />
                <div className="w-5/6 p-4 bg-[#F0F1F3] md:absolute md:right-0 absolute right-8 pt-0">
            <Header title="Admin" />
                    <h1 className="text-center text-2xl font-bold mb-4">Edit Faculty</h1>
                    <div className="flex flex-col items-center">
                        <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-1/2'>
                            <InputField
                                type="text"
                                label="Name:"
                                placeholder="Faculty Name"
                                defaultValue={faculty ? faculty.name : ''}
                                {...register("name", { required: true })}
                                className="mb-4"
                            />
                            {errors.name && <span>This field is required</span>}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                    Description:
                                </label>
                                <textarea
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#673EE6]"
                                    id="description"
                                    rows="4"
                                    placeholder="Faculty Description"
                                    {...register("description", { required: true })}
                                    defaultValue={faculty ? faculty.description : ''}
                                />
                                {errors.description && <span>This field is required</span>}
                            </div>
                            {errors.description && <span>This field is required</span>}
                            <InputField
                                        type="file"
                                        label="Course Structure Image:"
                                        defaultValue = {faculty ? faculty.strucImageFile : ''}
                                        {...register("strucImageFile", { required: true })}
                                        className="mb-2"
                                    />
                                    {errors.strucImageFile && <span className='text-red-600'>This field is required</span>}
                                    <InputField
                                        type="file"
                                        label="Cover Image:"
                                        defaultValue = {faculty ? faculty.coverImageFile : ''}
                                        {...register("coverImageFile", { required: true })}
                                        className="mb-2"
                                    />
                                    {errors.coverImageFile && <span className='text-red-600'>This field is required</span>}
                           <div>
                           <Button children="Save Changes" type='submit' className='my-3 px-3' />
                           </div>
                           </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditFaculty;
