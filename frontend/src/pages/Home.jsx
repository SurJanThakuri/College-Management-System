import React from 'react';
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()

    const handleAdminLogin = () => {
        navigate('/admin-login')
    }
    const handleTeacherLogin = () => {
        navigate('/teacher-login')
    }
    const handleStudentLogin = () => {
        navigate('/student-login')
    }



    return (
        <div className="bg-[#FFFFFF] min-h-screen flex items-center justify-center">
            <div className="max-w-lg w-full bg-[#F4F5FF] p-8 rounded shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-4 text-[#35344E]">
                    Lorem ipsum dolor sit amet consectetur
                </h1>
                <p className="text-center text-lg mb-8 text-[#35344E]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget venenatis lorem.</p>
                <div className="flex gap-8 justify-center items-center">
                    <button onClick={handleAdminLogin} className="bg-[#673EE6] hover:bg-[#5025D1] text-white font-bold py-4 px-8 rounded-full shadow-md">
                        Admin   
                    </button>
                    <button onClick={handleTeacherLogin} className="bg-[#673EE6] hover:bg-[#5025D1] text-white font-bold py-4 px-8 rounded-full shadow-md">
                        Teacher
                    </button>
                    <button onClick={handleStudentLogin} className="bg-[#673EE6] hover:bg-[#5025D1] text-white font-bold py-4 px-8 rounded-full shadow-md">
                        Student
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
