import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ReactPaginate from 'react-paginate';
import SearchBar from '../components/SearchBar';
import axios from 'axios';
import { refreshToken } from '../services/authServices';


function Students() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        axios.get('http://localhost:8000/api/v1/admins/students',
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setStudents(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    
    useEffect(() => {

        const accessToken = localStorage.getItem('accessToken');
        const accessTokenExpiry = localStorage.getItem('accessTokenExpiry');

        if (!accessToken || !accessTokenExpiry || new Date(accessTokenExpiry) < new Date()) {
             refreshToken();
        }
        }, []);

    const handleDelete = (id) => {
        const accessToken = localStorage.getItem('accessToken');
        axios.delete(`http://localhost:8000/api/v1/admins/delete-student/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(response => {
                // Optionally, redirect user to another page after deletion by using useNavigate()
                window.location.reload();
               
            })
            .catch(error => {
                console.error('Error deleting student:', error);
            });
    };
    
    const [searchQuery, setSearchQuery] = useState('');
    const [offset, setOffset] = useState(0);
    const [perPage] = useState(15);

    const handleSearch = (query) => {
        setSearchQuery(query);
        setOffset(0); // Reset offset when search query changes
    };

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
        || student.faculty.toLowerCase().includes(searchQuery.toLowerCase())
        || student.address.toLowerCase().includes(searchQuery.toLowerCase())
        || student.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const pageCount = Math.ceil(filteredStudents.length / perPage);

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage * perPage);
    };

    const studentsToShow = filteredStudents.slice(offset, offset + perPage);

    return (
        <div className='container min-w-full min-h-screen bg-[#F0F1F3]'>
            <div className="flex">
                <Sidebar />
                <div className="w-5/6 p-4 bg-[#F0F1F3] md:absolute md:right-0 absolute right-8 pt-0">
                    <Header title="Admin" />
                    <div className="container min-w-full min-h-screen bg-[#FFFFFF]">
                        <div className="p-4 bg-[#FFFFFF]">
                            <div className="flex justify-between items-center">
                                <div className="flex justify-center gap-8 items-center">
                                    <h1 className="text-2xl font-bold mb-4">Students</h1>
                                </div>
                                <Link to='/admin-dashboard/students/add'>
                                    <Button children="Add Student" className='px-3' />
                                </Link>
                            </div>
                             <SearchBar onSearch={handleSearch} />
                            <div className="overflow-x-auto">
                                <table className="table-auto border-collapse w-full">
                                    <thead>
                                        <tr>
                                            <th className="border border-black bg-blue-500 text-white px-4 py-2">Name</th>
                                            <th className="border border-black bg-blue-500 text-white px-4 py-2 hidden sm:table-cell">Faculty</th>
                                            <th className="border border-black bg-blue-500 text-white px-4 py-2 hidden md:table-cell">Address</th>
                                            <th className="border border-black bg-blue-500 text-white px-4 py-2 hidden md:table-cell">Email</th>
                                            <th className="border border-black bg-blue-500 text-white px-4 py-2">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {studentsToShow.map(student => (
                                            <tr key={student.id}>
                                                <td className="border border-black px-4 py-2">{student.name}</td>
                                                <td className="border border-black px-4 py-2 hidden sm:table-cell">{student.faculty.name}</td>
                                                <td className="border border-black px-4 py-2 hidden md:table-cell">{student.address}</td>
                                                <td className="border border-black px-4 py-2 hidden md:table-cell">{student.email}</td>
                                                <td className="border border-black px-4 py-2 flex gap-4 justify-center">
                                                    <Link to={`/admin-dashboard/students/${student.id}`}>
                                                        <img className='h-6 ' src="/images/eye.png" alt="" />
                                                    </Link>
                                                    <Link to={`/admin-dashboard/students/${student.id}/edit`}>
                                                        <img className='h-6' src="/images/edit-text.png" alt="" />
                                                    </Link>
                                                    
                                                        <img className='h-6' onClick={() => handleDelete(student.id)} src="/images/delete.png" alt="" />
                                                    
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className='text-center mt-4'>
                                <ReactPaginate
                                    previousLabel={'← Previous'}
                                    className={'flex-nowrap'}
                                    nextLabel={'Next →'}
                                    pageCount={pageCount}
                                    onPageChange={handlePageClick}
                                    containerClassName={'pagination'}
                                    activeClassName={'active bg-gray-200 py-1 rounded-full'}
                                    pageClassName={'inline-block mx-1'}
                                    pageLinkClassName={'border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-200'}
                                    previousClassName={'inline-block mx-1'}
                                    nextClassName={'inline-block mx-1'}
                                    previousLinkClassName={'border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-200'}
                                    nextLinkClassName={'border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-200'}
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Students;
