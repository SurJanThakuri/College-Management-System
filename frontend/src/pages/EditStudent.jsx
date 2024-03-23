import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

function EditStudent() {
    const { id } = useParams(); // Assuming id is the parameter for student ID

    // Fetch student data based on id (you can replace this with actual API call)
    const [student, setStudent] = useState({
        id: id,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        shift: 'Morning',
        dob: '1990-01-01',
        gender: 'Male',
        nationality: 'American',
        emergencyContact: 'Jane Doe - 987-654-3210',
        bloodGroup: 'O+',
        admissionYear: '2022',
        faculty: 'Science',
        rollNumber: 'SCI-001',
        guardianName: 'Jane Doe',
        guardianRelationship: 'Mother',
        guardianContact: '987-654-3210'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., send data to server)
        console.log('Form submitted:', student);
        // Optionally, redirect user to another page after submission
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent(prevStudent => ({
            ...prevStudent,
            [name]: value
        }));
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
                            <form onSubmit={handleSubmit} className='w-full md:w-1/2'>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                        Name:
                                    </label>
                                    <input
                                        name="name"
                                        value={student.name}
                                        onChange={handleChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                                        id="name"
                                        type="text"
                                        placeholder="Student Name"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                        Email:
                                    </label>
                                    <input
                                        name="email"
                                        value={student.email}
                                        onChange={handleChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                                        id="email"
                                        type="email"
                                        placeholder="Student Email"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                                        Phone Number:
                                    </label>
                                    <input
                                        name="phone"
                                        value={student.phone}
                                        onChange={handleChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                                        id="phone"
                                        type="tel"
                                        placeholder="Phone Number"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shift">
                                        Shift:
                                    </label>
                                    <select
                                        name="shift"
                                        value={student.shift}
                                        onChange={handleChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                                        id="shift"
                                        required
                                    >
                                        <option value="">Select Shift</option>
                                        <option value="Morning">Morning</option>
                                        <option value="Day">Day</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
                                        Date of Birth:
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                                        id="dob"
                                        type="date"
                                        value={student.dob}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                                        Gender:
                                    </label>
                                    <select
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                                        id="gender"
                                        value={student.gender}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nationality">
                                        Nationality:
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                                        id="nationality"
                                        type="text"
                                        placeholder="Nationality"
                                        value={student.nationality}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emergencyContact">
                                        Emergency Contact:
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                                        id="emergencyContact"
                                        type="text"
                                        placeholder="Emergency Contact"
                                        value={student.emergencyContact}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bloodGroup">
                                        Blood Group:
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                                        id="bloodGroup"
                                        type="text"
                                        placeholder="Blood Group"
                                        value={student.bloodGroup}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="admissionYear">
                                        Admission Year:
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                                        id="admissionYear"
                                        type="text"
                                        placeholder="Admission Year"
                                        value={student.admissionYear}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="faculty">
                                        Faculty:
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                                        id="faculty"
                                        type="text"
                                        placeholder="Faculty"
                                        value={student.faculty}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rollNumber">
                                        Roll Number:
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                                        id="rollNumber"
                                        type="text"
                                        placeholder="Roll Number"
                                        value={student.rollNumber}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="guardianName">
                                        Guardian's Name:
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                                        id="guardianName"
                                        type="text"
                                        placeholder="Guardian's Name"
                                        value={student.guardianName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="guardianRelationship">
                                        Guardian's Relationship:
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                                        id="guardianRelationship"
                                        type="text"
                                        placeholder="Guardian's Relationship"
                                        value={student.guardianRelationship}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="guardianContact">
                                        Guardian's Contact:
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                                        id="guardianContact"
                                        type="text"
                                        placeholder="Guardian's Contact"
                                        value={student.guardianContact}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <Button children="Update Student" type='submit' className='my-3 px-3' />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditStudent;
