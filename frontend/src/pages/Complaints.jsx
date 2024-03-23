import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

function Complaints() {
    const [complaints, setComplaints] = useState([
        { id: 1, date: '2024-02-27', by: 'John Doe', type: 'Teacher', title: 'Internet Connectivity Issue',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae lorem ipsum.', status: 'Pending' },
        { id: 2, date: '2024-02-26', by: 'Jane Smith', type: 'Student', title: 'Internet Connectivity Issue',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae lorem ipsum.', status: 'Resolved' },
        { id: 3, date: '2024-02-25', by: 'Alice Johnson', type: 'Student', title: 'Internet Connectivity Issue',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae lorem ipsum.', status: 'Pending' },
        { id: 4, date: '2024-02-25', by: 'Alice Johnson', type: 'Student', title: 'Internet Connectivity Issue',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae lorem ipsum.', status: 'Pending' },
        { id: 5, date: '2024-02-25', by: 'Alice Johnson', type: 'Student', title: 'Internet Connectivity Issue',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae lorem ipsum.', status: 'Pending' },
        { id: 6, date: '2024-02-25', by: 'Alice Johnson', type: 'Student', title: 'Internet Connectivity Issue',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae lorem ipsum.', status: 'Pending' },
        { id: 7, date: '2024-02-25', by: 'Alice Johnson', type: 'Student', title: 'Internet Connectivity Issue',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae lorem ipsum.', status: 'Pending' },
        { id: 8, date: '2024-02-25', by: 'Alice Johnson', type: 'Student', title: 'Internet Connectivity Issue',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae lorem ipsum.', status: 'Pending' },
        { id: 9, date: '2024-02-25', by: 'Alice Johnson', type: 'Student', title: 'Internet Connectivity Issue',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae lorem ipsum.', status: 'Pending' },
        { id: 10, date: '2024-02-25', by: 'Alice Johnson', type: 'Student', title: 'Internet Connectivity Issue',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae lorem ipsum.', status: 'Pending' },
        { id: 11, date: '2024-02-25', by: 'Alice Johnson', type: 'Student', title: 'Internet Connectivity Issue',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae lorem ipsum.', status: 'Pending' },
        { id: 12, date: '2024-02-25', by: 'Alice Johnson', type: 'Student', title: 'Internet Connectivity Issue',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae lorem ipsum.', status: 'Pending' },
        { id: 13, date: '2024-02-25', by: 'Alice Johnson', type: 'Student', title: 'Internet Connectivity Issue',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae lorem ipsum.', status: 'Pending' },
        { id: 14, date: '2024-02-25', by: 'Alice Johnson', type: 'Student', title: 'Internet Connectivity Issue',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae lorem ipsum.', status: 'Pending' },
    ]);

    const handleResolve = (id) => {
        setComplaints(complaints.map(complaint =>
            complaint.id === id ? { ...complaint, status: 'Resolved' } : complaint
        ));
    };

    const [perPage] = useState(8);
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const offset = currentPage * perPage;
    const pageCount = Math.ceil(complaints.length / perPage);
    const complaintsToShow = complaints.slice(offset, offset + perPage);

    return (
        <div className='container min-w-full min-h-screen bg-[#F0F1F3]'>
            <div className="flex">
                <Sidebar />
                <div className="w-5/6 p-4 bg-[#F0F1F3] md:absolute md:right-0 absolute right-8 pt-0">
                    <Header title="Admin" />
                    <div className="container min-w-full min-h-screen bg-[#F0F1F3]">
                        <div className="p-2 bg-[#F0F1F3]">
                            <div className="my-2">
                                <h1 className="text-2xl font-bold mb-4">Complaints</h1>
                                <table className="min-w-full divide-y divide-gray-200">
                                   
                                    <thead className="bg-gray-50">
                                        
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider  hidden md:table-cell">Date</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">By</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Complaint</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Status</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {complaintsToShow.map(complaint => (
                                            <tr key={complaint.id}>
                                                <td className="px-6 py-4 whitespace-nowrap  hidden md:table-cell">{complaint.date}</td>
                                                <td className="px-6 py-4 ">{complaint.by}</td>
                                                <td className="px-6 py-4">{complaint.title}</td>
                                                <td className="px-6 py-4 hidden md:table-cell">{complaint.status}</td>
                                                <td className="flex gap-2 justify-center items-center px-6 py-4">
                                                   <Link to='/admin-dashboard/notices/1/view'>
                                                   <img className='h-7' src="/images/eye.png" alt="" />
                                                   </Link>
                                                    {complaint.status === 'Pending' && (
                                                        <button onClick={() => handleResolve(complaint.id)}>
                                                            <img className='h-7' src="/images/checked.png" alt="" />
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="text-center mt-4">
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
                </div>
            </div>
        </div>
    );
}

export default Complaints;
