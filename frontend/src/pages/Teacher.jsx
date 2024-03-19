import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { Link } from 'react-router-dom'
import Button from '../components/Button'

function Teacher() {
    return (
        <div className='container min-w-full min-h-screen bg-[#F0F1F3]'>
            <div className="flex">
                <Sidebar />
                <div className=" w-5/6 p-4 bg-[#F0F1F3] absolute right-0 pt-0">
            <Header title="Admin" />
            <div className='flex'>
                <div id="profile" className="w-1/2 lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">
                <div className="p-4 md:p-12 text-center lg:text-left">
                    <div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-center" ></div>
                    <h1 className="text-3xl font-bold pt-8 lg:pt-0">Marry Copper</h1>
                    <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-blue-600 opacity-25"></div>
                    <p className="pt-4 text-base">Lorem ipsum dolor sit amet.</p>
                    <p className="pt-4 text-base flex gap-1 items-center justify-center lg:justify-start">
                        <strong>Address:</strong> Lorem, ipsum dolor.
                    </p>
                    <p className="pt-4 text-base flex gap-1 items-center justify-center lg:justify-start">
                        <strong>Email:</strong> marry.copper@example.com
                    </p>
                    <p className="pt-4 text-base flex gap-1 items-center justify-center lg:justify-start">
                        <strong>Shift:</strong> Morning 
                    </p>
                    <p className="pt-4 text-base flex gap-1 items-center justify-center lg:justify-start">
                        <strong>Phone:</strong> 980-436-0990
                    </p>

                    <p className="pt-4 text-base flex gap-1 items-center justify-center lg:justify-start">
                        <strong>Password:</strong> marry@123
                    </p>
                    <p>
                    <div className="mt-4">
                        <h2 className="text-base font-bold">Courses:</h2>
                        <ul className='ml-10'>
                            <li> <strong>DBMS</strong> - BCA</li>
                            <li> <strong>DBMS</strong> - BCA</li>
                            <li> <strong>DBMS</strong> - BCA</li>
                        </ul>
                    </div>
                    </p>
                    <div className="button my-10 flex justify-center gap-4">
                    <Link to="/admin-dashboard/teachers/teacher/edit">
                            <Button children="Edit" type='button' className='px-6' />
                        </Link>
                    <Link to="/admin-dashboard/faculties/BCA/edit">
                            <Button children="Delete" type='button' bgColor='bg-red-600' hover='hover:bg-red-700' className='px-4' />
                        </Link>
                    </div>
                  
                    
                </div>
                </div>

                <div className="image w-1/2 bg-[#F0F1F3] p-5 h-4/5">
                    <img className='' src="https://i.pinimg.com/474x/3b/3f/a1/3b3fa1a2db40f8f2610b9cd691cfe8e2.jpg" alt="" />
                </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Teacher
