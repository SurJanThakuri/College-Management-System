import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';

function Routine() {
    const [routines, setRoutines] = useState([]);
    const [loading, setLoading] = useState(true);


    return (
        <div className='container min-w-full min-h-screen bg-[#F0F1F3]'>
            <div className="flex">
                <Sidebar />
                <div className="w-5/6 p-4 bg-[#F0F1F3] md:absolute md:right-0 absolute right-8 pt-0">
                    <Header title="Admin" />
                    <div className="container min-w-full min-h-screen bg-[#FFFFFF]">
                        <div className="p-4 bg-[#FFFFFF]">
                            {loading ? (
                                <div>Loading...</div>
                            ) : (
                                <div className="container text-xs md:text-base min-w-full min-h-screen bg-[#FFFFFF]">
                                    
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Routine;
