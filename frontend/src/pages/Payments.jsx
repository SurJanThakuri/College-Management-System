import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ReactPaginate from 'react-paginate';
import SearchBar from '../components/SearchBar';
import axios from 'axios';
import { refreshToken } from '../services/authServices';
import API_URL from '../api';

function Payments() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {

        const accessToken = localStorage.getItem('accessToken');
        const accessTokenExpiry = localStorage.getItem('accessTokenExpiry');

        if (!accessToken || !accessTokenExpiry || new Date(accessTokenExpiry) < new Date()) {
             refreshToken();
        }
        }, []);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        axios.get(`${API_URL}/admin/payment-logs`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(response => {
                setLogs(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
        }, []);


        const handleDelete = (id) => {
            const accessToken = localStorage.getItem('accessToken');
            axios.delete(`${API_URL}/admin/payment-logs/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
                .then(response => {
                    window.location.reload();
                   
                })
                .catch(error => {
                    console.error('Error deleting payment log:', error);
                });
        };
    
    const [searchQuery, setSearchQuery] = useState('');
    const [offset, setOffset] = useState(0);
    const [perPage] = useState(10);


    const handleSearch = (query) => {
        setSearchQuery(query);
        setOffset(0); // Reset offset when search query changes
    };

    const filteredLogs = logs.filter(log =>
        (log.studentName.name && log.studentName.name.toLowerCase().includes(searchQuery.toLowerCase()))
        || (log.faculty.name && log.faculty.name.toLowerCase().includes(searchQuery.toLowerCase()))
        || (log.semester && log.semester.toLowerCase().includes(searchQuery.toLowerCase()))
        || (log.amount && log.amount.toLowerCase().includes(searchQuery.toLowerCase()))
    );
   

    const paymentLogs = filteredLogs.slice(offset, offset + perPage);
    const pageCount = Math.ceil(filteredLogs.length / perPage);

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage * perPage);
    };


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
                                    <h1 className="text-2xl font-bold mb-4">Payment Logs</h1>
                                </div>
                                <Link to='/admin-dashboard/payments/add'>
                                    <Button children="Add" className='px-3' />
                                </Link>
                            </div>
                                    <SearchBar onSearch={handleSearch} />
                            <div className="overflow-x-auto">
                            <table className="table-auto border-collapse w-full">
                                    <thead>
                                        <tr>
                                            <th className="border border-black bg-blue-500 text-white px-4 py-2 hidden sm:table-cell">Date</th>
                                            <th className="border border-black bg-blue-500 text-white px-4 py-2">Name</th>
                                            <th className="border border-black bg-blue-500 text-white px-4 py-2  hidden md:table-cell">Faculty</th>
                                            <th className="border border-black bg-blue-500 text-white px-4 py-2 hidden md:table-cell">Semester</th>
                                            <th className="border border-black bg-blue-500 text-white px-4 py-2 hidden sm:table-cell">Amount</th>
                                            <th className="border border-black bg-blue-500 text-white px-4 py-2">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paymentLogs.map(log => (
                                            <tr key={log._id}>
                                                <td className="border border-black px-4 py-2  hidden sm:table-cell">{log.date}</td>
                                                <td className="border border-black px-4 py-2">{log.studentName.name}</td>
                                                <td className="border border-black px-4 py-2  hidden md:table-cell">{log.faculty.name}</td>
                                                <td className="border border-black px-4 py-2  hidden md:table-cell">{log.semester}</td>
                                                <td className="border border-black px-4 py-2  hidden sm:table-cell">{log.amount}</td>
                                                <td className="border border-black px-4 py-2 flex gap-4 justify-center">
                                                    <Link to={`/admin-dashboard/payments/${log._id}/edit`}>
                                                        <img className='h-6' src="/images/edit-text.png" alt="" />
                                                    </Link>
                                                        <img className='h-6' onClick={() => handleDelete(log._id)} src="/images/delete.png" alt="" />
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

export default Payments;
