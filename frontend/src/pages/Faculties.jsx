import { Link } from 'react-router-dom';
import Faculty from '../components/Faculty';
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import axios from 'axios';
import { refreshToken } from '../services/authServices';
import API_URL from '../api';

function Faculties() {
    const [faculties, setFaculties] = useState();

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
                Authorization: `Bearer ${accessToken}`
            }
        }).then((response) => {
            setFaculties(response.data.data);
        }).catch((error) => {
            console.error('Error fetching faculties:', error);
        });
    }, [])

        return (
            <div className='container min-w-full min-h-screen bg-[#F0F1F3]'>
                <div className="flex">
                    <Sidebar />
                    <div className="w-5/6 p-4 bg-[#F0F1F3] md:absolute md:right-0 absolute right-8 pt-0">
                <Header title="Admin" />
                        <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold mb-4">Faculties</h1>
                        <Link to="/admin-dashboard/faculties/add-faculty">
                            <Button children="Add Faculty" type='button' className='px-4' />
                        </Link>
                        </div>
                        <div className="faculties flex flex-wrap">
                            
                            {faculties && faculties.map(faculty => (
                                <Link to={`/admin-dashboard/faculties/${faculty._id}`} key={faculty.name}>
                                    <Faculty name={faculty.name} description={faculty.description} imgSrc={faculty.coverImage} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    export default Faculties;

