import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import axios from 'axios';
import { refreshToken } from '../services/authServices';
import API_URL from '../api';

function Routines() {
    const [routines, setRoutines] = useState([]);

    useEffect(() => {

        const accessToken = localStorage.getItem('accessToken');
        const accessTokenExpiry = localStorage.getItem('accessTokenExpiry');

        if (!accessToken || !accessTokenExpiry || new Date(accessTokenExpiry) < new Date()) {
            refreshToken();
        }
    }, []);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        axios.get(`${API_URL}/admin/routines`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then((response) => {
            setRoutines(response.data.data);
        }).catch((error) => {
            console.error('Error fetching routines:', error);
        });
    }, [])

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
                                <Link to="/admin-dashboard/routines/add-routine">
                                    <Button children="Add Routine" type='button' className='px-4' />
                                </Link>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {routines.length > 0 ? (
                                    routines.map(routine => (
                                        <Link to={`/admin-dashboard/routines/${routine._id}`} key={routine._id}>
                                            <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center">
                                                <img src={routine.routineImage} className="h-32 w-full object-cover mb-2" alt="Routine" />
                                                <span className="text-lg font-semibold">{routine.faculty.name}</span>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div>No Routines</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Routines;
