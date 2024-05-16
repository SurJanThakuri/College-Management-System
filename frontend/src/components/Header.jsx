import React, { useState, useEffect } from 'react'
import ProfilePopup from './ProfilePopup';
import LogoutPopup from './LogoutPopup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { refreshToken } from '../services/authServices';
import API_URL from '../api';

function Header({title}) {
    const [showPopup, setShowPopup] = useState(false);
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);
    const [adminData, setAdminData] = useState(null);

    useEffect(() => {

        const accessToken = localStorage.getItem('accessToken');
        const accessTokenExpiry = localStorage.getItem('accessTokenExpiry');

        if (!accessToken || !accessTokenExpiry || new Date(accessTokenExpiry) < new Date()) {
             refreshToken();
        }
        }, []);

   useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
        axios.get(`${API_URL}/admins/current-user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setAdminData(response.data.data);
        })
        .catch(error => {
            console.error('Error fetching admin data:', error);
        });
    }
}, []);
   

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const [showProfilePopup, setShowProfilePopup] = useState(false);

    const toggleProfilePopup = () => {
        setShowProfilePopup(!showProfilePopup);
    };

    const toggleLogoutPopup = () => {
        setShowLogoutPopup(!showLogoutPopup);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleLogoutConfirm = () => {
        const accessToken = localStorage.getItem('accessToken');

        axios.post(`${API_URL}/admins/logout`, null, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(response => {
            dispatch(logout());
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('accessTokenExpiry');
            localStorage.removeItem('refreshTokenExpiry');
            navigate("/admin-login")
        })
        .catch(error => {
            console.error('Logout failed:', error);
        });

        setShowLogoutPopup(false);
    };
    

    const handleLogoutCancel = () => {
        setShowLogoutPopup(false);
    };

    return (
        <div className=''>
            <div className="w-full header h-14 p-0 m-0 mb-4 bg-[#F0F1F3] text-black flex justify-between items-center">
                <div className='ml-8'>
                    <div className="title font-bold text-lg">
                        {title} Dashboard
                    </div>
                </div>
                <div className="profile mr-8 ">
                    <div className="rounded-full w-12 h-12 bg-gray-300 flex items-center justify-center cursor-pointer" onClick={togglePopup}>
                        <img src={adminData?.profilePicture} alt="Profile" className="rounded-full w-10 h-10" />
                    </div>
                    <div className={`absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-md ${showPopup ? '' : 'hidden'}`}>
                        <ul className="py-2">
                            <li className="text-black flex items-center justify-evenly px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={toggleProfilePopup}>
                                <img src="/images/admin.png" alt="Profile" className="rounded-full w-10 h-10" />
                                Profile</li>
                            <li className="text-black flex items-center justify-evenly px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                <img src="/images/gear.png" alt="Profile" className="rounded-full w-10 h-10" />
                                Settings</li>
                                <li className="text-black flex items-center justify-evenly px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={toggleLogoutPopup}>
                        <img src="/images/logout.png" alt="Profile" className="rounded-full w-10 h-10" />
                        Logout
                    </li>
                    {showLogoutPopup && <LogoutPopup onConfirm={handleLogoutConfirm} onCancel={handleLogoutCancel} />}

                        </ul>
                    </div>
                </div>

            </div>
            {showProfilePopup && <ProfilePopup data={adminData} onClose={toggleProfilePopup} />}
        </div>
    )
}

export default Header
