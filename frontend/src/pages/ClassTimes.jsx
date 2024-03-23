import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ReactPaginate from 'react-paginate';


function Students() {
    const classTimes = [
        { faculty: 'BCA', semester: 'First', time: '9:00 AM - 10:00 AM' },
        { faculty: 'BBM', semester: 'Second', time: '10:00 AM - 11:00 AM' },
        { faculty: 'BSW', semester: 'Third', time: '11:00 AM - 12:00 PM' },
        { faculty: 'BBS', semester: 'Fourth', time: '1:00 PM - 2:00 PM' },
        { faculty: 'BBA', semester: 'First', time: '2:00 PM - 3:00 PM' },
        { faculty: 'BBA', semester: 'First', time: '2:00 PM - 3:00 PM' },
        { faculty: 'BBA', semester: 'First', time: '2:00 PM - 3:00 PM' },
        { faculty: 'BBA', semester: 'First', time: '2:00 PM - 3:00 PM' },
        { faculty: 'BBA', semester: 'First', time: '2:00 PM - 3:00 PM' },
        { faculty: 'BBA', semester: 'First', time: '2:00 PM - 3:00 PM' },
        { faculty: 'BBA', semester: 'First', time: '2:00 PM - 3:00 PM' },
        { faculty: 'BBA', semester: 'First', time: '2:00 PM - 3:00 PM' },
        { faculty: 'BBA', semester: 'First', time: '2:00 PM - 3:00 PM' },
        { faculty: 'BBA', semester: 'First', time: '2:00 PM - 3:00 PM' },
        { faculty: 'BBA', semester: 'First', time: '2:00 PM - 3:00 PM' },
        { faculty: 'BBA', semester: 'First', time: '2:00 PM - 3:00 PM' },
        { faculty: 'BBA', semester: 'First', time: '2:00 PM - 3:00 PM' },
    ];
    const [offset, setOffset] = useState(0);
    const [perPage] = useState(15);
    const [pageCount, setPageCount] = useState(Math.ceil(classTimes.length / perPage));

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage * perPage);
    };

    const TimesToShow = classTimes.slice(offset, offset + perPage);

    return (
        <div className='container min-w-full min-h-screen bg-[#F0F1F3]'>
            <div className="flex">
                <Sidebar />
                <div className="w-5/6 p-4 bg-[#F0F1F3] md:absolute md:right-0 absolute right-8 pt-0">
                    <Header title="Admin" />
                    <div className="container min-w-full min-h-screen bg-[#FFFFFF]">
                        <div className="p-4 bg-[#FFFFFF]">
                            <div className="flex justify-between items-center">
                                <h1 className="text-2xl font-bold mb-4">Class Timings</h1>
                                <Link to='/admin-dashboard/students/add'>
                                    <Button children="Add Timing" className='px-3' />
                                </Link>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="table-auto border-collapse w-full">
                                    <thead>
                                        <tr>
                                            <th className="border border-black bg-blue-500 text-white px-4 py-2">Action</th>
                                            <th className="border border-black bg-blue-500 text-white px-4 py-2">Faculty</th>
                                            <th className="border border-black bg-blue-500 text-white px-4 py-2">Semester</th>
                                            <th className="border border-black bg-blue-500 text-white px-4 py-2">Timing</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {TimesToShow.map((classTime, index) => (
                                    <tr key={index}>
                                        <td className="border border-black px-4 py-6 flex gap-4 justify-center">
                                                    <Link to={`/admin-dashboard/students/1/edit`}>
                                                        <img className='h-6' src="/images/edit-text.png" alt="" />
                                                    </Link>
                                                    <Link to={`/admin-dashboard/students/1/delete`}>
                                                        <img className='h-6' src="/images/delete.png" alt="" />
                                                    </Link>
                                                </td>
                                        <td className="border border-black px-4 py-2">{classTime.faculty}</td>
                                        <td className="border border-black px-4 py-2">{classTime.semester}</td>
                                        <td className="border border-black px-4 py-2">{classTime.time}</td>
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
