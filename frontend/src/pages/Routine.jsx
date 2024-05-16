import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import axios from 'axios'
import RoutineImgPopup from '../components/RoutineImgPopup'
import { refreshToken } from '../services/authServices'
import API_URL from '../api';

function Routine() {
    const { id } = useParams();
    const [routine, setRoutine] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {

        const accessToken = localStorage.getItem('accessToken');
        const accessTokenExpiry = localStorage.getItem('accessTokenExpiry');

        if (!accessToken || !accessTokenExpiry || new Date(accessTokenExpiry) < new Date()) {
             refreshToken();
        }
        }, []);

    const [showRoutineImgPopup, setShowRoutineImgPopup] = useState(false);
    const handleCameraClick = () => {
        setShowRoutineImgPopup(true);
    };

    const handleCloseRoutineImgPopup = () => {
        setShowRoutineImgPopup(false);
    };

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        axios.get(`${API_URL}/admin/routines/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(response => {
                setRoutine(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

    if (!routine) {
        return <div>Loading...</div>;
    }

    const handleDelete = () => {
        const accessToken = localStorage.getItem('accessToken');
        axios.delete(`${API_URL}/admin/routines/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(response => {
                navigate('/admin-dashboard/routines');
            })
            .catch(error => {
                console.error('Error deleting faculty:', error);
            });
    };

    return (
        <div>
            <div className='container min-w-full min-h-screen bg-[#F0F1F3]'>
                <div className="flex">
                    <Sidebar />
                    <div className="w-5/6 p-4 bg-[#F0F1F3] md:absolute md:right-0 absolute right-8 pt-0">
                        <Header title="Admin" />
                        <div className="flex justify-between items-center">
                            <h1 className='text-2xl font-bold'>{routine?.faculty.name}</h1>
                            <div className="flex gap-3">
                                <Link to={`/admin-dashboard/routines/${id}/edit`}>
                                    <Button children="Edit" type='button' className='px-4' />
                                </Link>

                                <Button children="Delete" onClick={handleDelete} type='button' className='px-4' bgColor='bg-red-600' hover='hover:bg-red-700' />
                            </div>
                        </div>

                        <div className="image flex items-center justify-center my-4">
                            <img src={routine?.routineImage} alt="" />
                        </div>
                        <div className="flex gap-5 justify-center items-center">
                            <h2 className='font-bold text-xl'>{routine?.faculty.name} </h2>
                            <div className="flex justify-center items-center">
                                <img src="/images/camera.png" className='h-10' onClick={handleCameraClick} />
                            </div>
                            {showRoutineImgPopup && <RoutineImgPopup data={routine} onClose={handleCloseRoutineImgPopup} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Routine
