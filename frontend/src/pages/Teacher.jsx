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
                <div className=" w-5/6 p-4 bg-[#F0F1F3] md:absolute md:right-0 absolute right-8 pt-0">
            <Header title="Admin" />
            <div className='flex flex-col-reverse md:flex-row w-full'>
                
                <div className="w-full md:w-1/2 p-5 md:p-0">
                    <div className="w-full h-full flex flex-col items-center md:items-start">
                        {/* <div className="block md:hidden rounded-full shadow-xl mx-auto -mt-16 h-24 w-24 bg-center" ></div> */}
                        <h1 className="text-2xl font-bold pt-0 md:pt-0">Marry Copper</h1>
                        <div className="mx-auto md:mx-0 w-3/4 pt-3 border-b-2 border-blue-600 opacity-25"></div>
                        <p className="pt-4 text-base md:text-lg">Lorem ipsum dolor sit amet.</p>
                        <p className="pt-4 text-base md:text-lg flex gap-1 items-center justify-center md:justify-start">
                            <strong>Address:</strong> Lorem, ipsum dolor.
                        </p>
                        <p className="pt-4 text-base md:text-lg flex gap-1 items-center justify-center md:justify-start">
                            <strong>Email:</strong> marry.copper@example.com
                        </p>
                        <p className="pt-4 text-base md:text-lg flex gap-1 items-center justify-center md:justify-start">
                            <strong>Shift:</strong> Morning 
                        </p>
                        <p className="pt-4 text-base md:text-lg flex gap-1 items-center justify-center md:justify-start">
                            <strong>Phone:</strong> 980-436-0990
                        </p>
    
                        <p className="pt-4 text-base md:text-lg flex gap-1 items-center justify-center md:justify-start">
                            <strong>Password:</strong> marry@123
                        </p>
                        <p>
                        <div className="mt-4">
                            <h2 className="text-base font-bold md:text-lg">Courses:</h2>
                            <ul className='ml-10 md:ml-0'>
                                <li> <strong>DBMS</strong> - BCA</li>
                                <li> <strong>DBMS</strong> - BCA</li>
                                <li> <strong>DBMS</strong> - BCA</li>
                            </ul>
                        </div>
                        </p>
                        <div className="mt-4 button flex justify-center gap-4 md:justify-start">
                        <Link to="/admin-dashboard/teachers/teacher/edit">
                                <Button children="Edit" type='button' className='px-6' />
                            </Link>
                        <Link to="/admin-dashboard/faculties/BCA/edit">
                                <Button children="Delete" type='button' bgColor='bg-red-600' hover='hover:bg-red-700' className='px-4' />
                            </Link>
                        </div>
                      
                        
                    </div>
                </div>
                <div className="w-full md:w-2/5 p-5 md:p-0">
                    <img className='w-full md:h-[80vh] object-cover md:object-contain' src="https://i.pinimg.com/474x/3b/3f/a1/3b3fa1a2db40f8f2610b9cd691cfe8e2.jpg" alt="" />
                </div>
            </div>

        </div>
    </div>
    </div>
    )
}

export default Teacher
