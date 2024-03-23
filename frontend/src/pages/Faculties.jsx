import { Link } from 'react-router-dom';
import Faculty from '../components/Faculty';
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import React from 'react';
import Button from '../components/Button';


function Faculties() {

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
                       <Link to="/admin-dashboard/faculties/BCA"> <Faculty name="BCA" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, magni!" imgSrc="/images/BCA.png" /></Link>
                        <Faculty name="BBM" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, magni!" imgSrc="/images/BBM.png" />
                        <Faculty name="BBS" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, magni!" imgSrc="/images/BBS.png" />
                        <Faculty name="BSW" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, magni!" imgSrc="/images/BSW.png" />
                        <Faculty name="BSW" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, magni!" imgSrc="/images/BSW.png" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    export default Faculties;

