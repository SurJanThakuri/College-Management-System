import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ReactPaginate from 'react-paginate';
import SearchBar from '../components/SearchBar';


function Students() {
    const students = [];
    for (let i = 1; i <= 100; i++) {
        students.push({
            id: i,
            name: `Student ${i}`,
            faculty: i % 3 === 0 ? 'BCA' : i % 2 === 0 ? 'BBA' : 'BSC',
            address: `${i} Main St, City`,
            email: `student${i}@example.com`
        });
    }
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
                <div className="w-5/6 p-4 bg-[#F0F1F3] absolute right-0 pt-0">
                    <Header title="Admin" />
                    <div className="container min-w-full min-h-screen bg-[#FFFFFF]">
                        <div className="p-4 bg-[#FFFFFF]">
                            <div className="flex justify-between items-center">
                                <div className="flex justify-center gap-8 items-center">
                                    <h1 className="text-2xl font-bold mb-4">Students</h1>
                                    <SearchBar onSearch={handleSearch} />
                                </div>
                                <Link to='/admin-dashboard/students/add'>
                                    <Button children="Add Student" className='px-3' />
                                </Link>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="table-auto border-collapse w-full">
                                    <thead>
                                        <tr>
                                            <th className="border border-black bg-blue-500 text-white px-4 py-2">Name</th>
                                            <th className="border border-black bg-blue-500 text-white px-4 py-2">Faculty</th>
                                            <th className="border border-black bg-blue-500 text-white px-4 py-2">Address</th>
                                            <th className="border border-black bg-blue-500 text-white px-4 py-2">Email</th>
                                            <th className="border border-black bg-blue-500 text-white px-4 py-2">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {studentsToShow.map(student => (
                                            <tr key={student.id}>
                                                <td className="border border-black px-4 py-2">{student.name}</td>
                                                <td className="border border-black px-4 py-2">{student.faculty}</td>
                                                <td className="border border-black px-4 py-2">{student.address}</td>
                                                <td className="border border-black px-4 py-2">{student.email}</td>
                                                <td className="border border-black px-4 py-2 flex gap-4 justify-center">
                                                    <Link to={`/admin-dashboard/students/view`}>
                                                        <img className='h-6 ' src="/images/eye.png" alt="" />
                                                    </Link>
                                                    <Link to={`/admin-dashboard/students/1/edit`}>
                                                        <img className='h-6' src="/images/edit-text.png" alt="" />
                                                    </Link>
                                                    <Link to={`/admin-dashboard/students/1/delete`}>
                                                        <img className='h-6' src="/images/delete.png" alt="" />
                                                    </Link>
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
