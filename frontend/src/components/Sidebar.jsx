import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="fixed w-21 hidden sm:block lg:w-1/6 bg-[#473385] p-4 text-white min-h-screen">
            <div className="mb-4">
                <ul>
                    <li className="flex items-center justify-center my-0">
                       <NavLink 
                       to="/admin-dashboard"
                       className="flex justify-between">
                         <img src="/images/main-logo.png" alt="" className='h-16 hidden lg:block'/>
                         <img src="/images/logo.png" alt="" className='h-16 block lg:hidden'/>
                       </NavLink>
                    </li>

                </ul>
            </div>
            <div className="my-4 bg-gray-600 h-[1px]"></div>

            <NavLink
                to="/admin-dashboard/faculties"
                className={({ isActive }) =>
                    isActive ? "bg-blue-700 p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white" : "p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                }
            >
                <i className="bi bi-chat-left-text-fill"></i>
                <div className="flex justify-start w-full items-center">
                    <img className='invert h-7 mr-3' src="/images/book.png" alt="" />
                    <span className='text-lg hidden lg:block'>Faculties</span>
                </div>
            </NavLink>
            <NavLink
                to="/admin-dashboard/teachers"
                className={({ isActive }) =>
                    isActive ? "bg-blue-700 p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white" : "p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                }
            >
                <i className="bi bi-chat-left-text-fill"></i>
                <div className="flex justify-start w-full items-center">
                    <img className='invert h-7 mr-3' src="/images/teacher (1).png" alt="" />
                    <span className='text-lg hidden lg:block'>Teachers</span>
                </div>
            </NavLink>
            <NavLink
                to="/admin-dashboard/students"
                className={({ isActive }) =>
                    isActive ? "bg-blue-700 p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white" : "p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                }
            >
                <i className="bi bi-chat-left-text-fill"></i>
                <div className="flex justify-start w-full items-center">
                    <img className='invert h-7 mr-3' src="/images/student (1).png" alt="" />
                    <span className='text-lg hidden lg:block'>Students</span>
                </div>
            </NavLink>
            <NavLink
                to="/admin-dashboard/payments"
                className={({ isActive }) =>
                    isActive ? "bg-blue-700 p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white" : "p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                }
            >
                <i className="bi bi-chat-left-text-fill"></i>
                <div className="flex justify-start w-full items-center">
                    <img className='invert h-7 mr-3' src="/images/payment-method.png" alt="" />
                    <span className='text-lg hidden lg:block'>Payments</span>
                </div>
            </NavLink>
            <NavLink
                to="/admin-dashboard/notices"
                className={({ isActive }) =>
                    isActive ? "bg-blue-700 p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white" : "p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                }
            >
                <i className="bi bi-chat-left-text-fill"></i>
                <div className="flex justify-start w-full items-center">
                    <img className='invert h-7 mr-3' src="/images/notification.png" alt="" />
                    <span className='text-lg hidden lg:block'>Notice</span>
                </div>
            </NavLink>
            <NavLink
                to="/admin-dashboard/complaints"
                className={({ isActive }) =>
                    isActive ? "bg-blue-700 p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white" : "p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                }
            >
                <i className="bi bi-chat-left-text-fill"></i>
                <div className="flex justify-start w-full items-center">
                    <img className='invert h-7 mr-3' src="/images/complain.png" alt="" />
                    <span className='text-lg hidden lg:block'>Complaints</span>
                </div>
            </NavLink>
            <NavLink
                to="/admin-dashboard/routines"
                className={({ isActive }) =>
                    isActive ? "bg-blue-700 p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white" : "p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                }
            >
                <i className="bi bi-chat-left-text-fill"></i>
                <div className="flex justify-start w-full items-center">
                    <img className='invert h-7 mr-3' src="/images/calendar-date.png" alt="" />
                    <span className='text-lg hidden lg:block'>Routines</span>
                </div>
            </NavLink>
        </div>
    );
}

export default Sidebar;
