import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import axios from 'axios'
import CourseStructImgPopup from '../components/CourseStructImgPopup';
import { refreshToken } from '../services/authServices'

function Faculty() {
    const { id } = useParams();
    const [faculty, setFaculty] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {

        const accessToken = localStorage.getItem('accessToken');
        const accessTokenExpiry = localStorage.getItem('accessTokenExpiry');

        if (!accessToken || !accessTokenExpiry || new Date(accessTokenExpiry) < new Date()) {
             refreshToken();
        }
        }, []);

    const [showStructImgPopup, setShowStructImgPopup] = useState(false);
    const handleCameraClick = () => {
        setShowStructImgPopup(true);
    };

    const handleCloseStructImgPopup = () => {
        setShowStructImgPopup(false);
    };

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        axios.get(`http://localhost:8000/api/v1/admin/faculties/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(response => {
                setFaculty(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

    if (!faculty) {
        return <div>Loading...</div>;
    }

    const handleDelete = () => {
        const accessToken = localStorage.getItem('accessToken');
        axios.delete(`http://localhost:8000/api/v1/admin/faculties/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(response => {
                navigate('/admin-dashboard/faculties');
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
                            <h1 className='text-2xl font-bold'>{faculty?.name}</h1>
                            <div className="flex gap-3">
                                <Link to={`/admin-dashboard/faculties/${id}/edit`}>
                                    <Button children="Edit" type='button' className='px-4' />
                                </Link>

                                <Button children="Delete" onClick={handleDelete} type='button' className='px-4' bgColor='bg-red-600' hover='hover:bg-red-700' />
                            </div>
                        </div>
                        <p className='my-4'>{faculty?.description}</p>

                        <div className="image flex items-center justify-center my-4">
                            <img src={faculty?.courseStructureImg} alt="" />
                        </div>
                        <div className="flex gap-5 justify-center items-center">
                            <h2 className='font-bold text-xl'>{faculty?.name} Course Structure</h2>
                            <div className="flex justify-center items-center">
                                <img src="/images/camera.png" className='h-10' onClick={handleCameraClick} />
                            </div>
                            {showStructImgPopup && <CourseStructImgPopup data={faculty} onClose={handleCloseStructImgPopup} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Faculty
