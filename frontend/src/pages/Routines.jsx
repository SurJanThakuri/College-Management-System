import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';

const faculties = [
    { name: 'BCA', image: '/images/BCA.png' },
    { name: 'BBM', image: '/images/BBM.png' },
    // Add more faculties with their respective cover images
];

function Routines() {
    return (
        <div className='container min-w-full min-h-screen bg-[#F0F1F3]'>
            <div className="flex">
                <Sidebar />
                <div className="w-5/6 p-4 bg-[#F0F1F3] md:absolute md:right-0 absolute right-8 pt-0">
                    <Header title="Admin" />
                    <div className="container min-w-full min-h-screen bg-[#FFFFFF]">
                        <div className="p-4 bg-[#FFFFFF]">
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl font-bold mb-4">Faculty Routines</h1>
                                <Link to="/admin-dashboard/routines/class-times">
                                    <Button children="Class Timing" type='button' className='px-4' />
                                </Link>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {faculties.map(faculty => (
                                    <Link to={`/admin-dashboard/routines/${faculty.name}`} key={faculty.name}>
                                        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center">
                                            <img src={faculty.image} alt={faculty.name} className="h-32 w-full object-cover mb-2" />
                                            <span className="text-lg font-semibold">{faculty.name}</span>
                                        </div>
                                    </Link>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Routines;
