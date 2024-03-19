import React, { useState } from 'react';
import Card from '../components/Card';
import Calender from '../components/Calender';
import NoticeBoard from '../components/NoticeBoard';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const AdminDashboard = () => {
    return (
        <>
            <div className='container min-w-full min-h-screen bg-[#F0F1F3]'>
                <div className="flex">
                    <Sidebar />
                    <div className="w-5/6 p-2 pt-0 bg-[#F0F1F3] absolute right-0">
                <Header title="Admin" />
                        <div className="flex justify-around items-center mb-8">
                            <Card title="Total Students" imgSrc='/images/student.png' number='1000' />
                            <Card title="Faculties" imgSrc='/images/education.png' number='10' />
                            <Card title="Total Teachers" imgSrc='/images/teacher.png' number='20' />
                            <Card title="Money Collected" imgSrc='/images/money.png' number='40,00,000' />

                        </div>
                        <div className="flex gap-4 justify-center">
                            <div className="calender w-1/2 bg-[#FFFFFF] ml-3  p-4 rounded shadow-md">
                                <Calender />
                            </div>
                            <NoticeBoard />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
