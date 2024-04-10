import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import axios from 'axios';

function Teachers() {
    const [searchQuery, setSearchQuery] = useState('');
    const [offset, setOffset] = useState(0);
    const [perPage] = useState(8); // Change the number of items per page here
    const [teachersData, setTeachersData] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        axios.get('http://localhost:8000/api/v1/admins/teachers',
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setTeachersData(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
        setOffset(0); // Reset offset when search query changes
    };

    let filteredTeachers = Array.isArray(teachersData) ? teachersData.filter(teacher =>
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.phone.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

    const pageCount = Math.ceil(filteredTeachers.length / perPage);

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage * perPage);
    };

    const teachersToShow = filteredTeachers.slice(offset, offset + perPage);

    return (
        <div className='container min-w-full min-h-screen bg-[#F0F1F3]'>
            <div className="flex">
                <Sidebar />
                <div className="w-5/6 p-4 bg-[#F0F1F3] md:absolute md:right-0 absolute right-8 pt-0">
                    <Header title="Admin" />
                    <div className="flex justify-between">
                        <div className="flex justify-center gap-8 items-center">
                            <h1 className="text-2xl font-bold mb-4">Teachers</h1>
                        </div>
                        <Link to="/admin-dashboard/teachers/add">
                            <Button children="Add Teacher" type='button' className='px-4' />
                        </Link>
                    </div>
                    <SearchBar onSearch={handleSearch} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {teachersToShow.map((teacher) => (
                            <Link key={teacher.id} to={`/admin-dashboard/teachers/${teacher.id}`}>
                                <div className="bg-white rounded-lg p-4 shadow-md">
                                    <img className="w-20 h-20 rounded-full mx-auto mb-4" src={teacher.profilePicture} alt={teacher.name} />
                                    <div className="text-center">
                                        <p className="font-bold text-lg">{teacher.name}</p>
                                        <p className="text-gray-500">{teacher.email}</p>
                                        <p className="text-gray-500">{teacher.phone}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className='text-center mt-4'>
                        <ReactPaginate
                            previousLabel={'← Previous'}
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
    );
}

export default Teachers;
