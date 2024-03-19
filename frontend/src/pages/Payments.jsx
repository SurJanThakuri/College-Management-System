import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ReactPaginate from 'react-paginate';
import SearchBar from '../components/SearchBar';

function Payments() {
    const logs = [
        { id: 1, name: 'John Doe', faculty: 'BCA', date: '2023-01-01', semester: 'first', amount: '20000' },
        { id: 2, name: 'Jane Smith', faculty: 'BBA', date: '2023-02-05', semester: 'second', amount: '18000' },
        { id: 3, name: 'Alice Johnson', faculty: 'BCom', date: '2023-03-10', semester: 'third', amount: '22000' },
        { id: 4, name: 'Bob Brown', faculty: 'BSc', date: '2023-04-15', semester: 'fourth', amount: '19000' },
        { id: 5, name: 'Charlie Wilson', faculty: 'BA', date: '2023-05-20', semester: 'first', amount: '21000' },
        { id: 6, name: 'David Lee', faculty: 'BCA', date: '2023-06-25', semester: 'second', amount: '19500' },
        { id: 7, name: 'Emma Davis', faculty: 'BBA', date: '2023-07-30', semester: 'third', amount: '23000' },
        { id: 8, name: 'Frank Miller', faculty: 'BCom', date: '2023-08-04', semester: 'fourth', amount: '20500' },
        { id: 9, name: 'Grace Clark', faculty: 'BSc', date: '2023-09-09', semester: 'first', amount: '21500' },
        { id: 10, name: 'Henry Moore', faculty: 'BA', date: '2023-10-14', semester: 'second', amount: '19800' },
        { id: 11, name: 'Isabel White', faculty: 'BCA', date: '2023-11-19', semester: 'third', amount: '22500' },
        { id: 12, name: 'Jackie Hall', faculty: 'BBA', date: '2023-12-24', semester: 'fourth', amount: '21000' },
        { id: 13, name: 'Kevin Young', faculty: 'BCom', date: '2024-01-29', semester: 'first', amount: '22000' },
        { id: 14, name: 'Linda Harris', faculty: 'BSc', date: '2024-03-04', semester: 'second', amount: '20000' },
        { id: 15, name: 'Michael Thompson', faculty: 'BA', date: '2024-04-08', semester: 'third', amount: '23000' },
        { id: 16, name: 'Nancy Martinez', faculty: 'BCA', date: '2024-05-13', semester: 'fourth', amount: '20500' },
        { id: 17, name: 'Oliver Robinson', faculty: 'BBA', date: '2024-06-18', semester: 'first', amount: '21500' },
        { id: 18, name: 'Patricia King', faculty: 'BCom', date: '2024-07-23', semester: 'second', amount: '19500' },
        { id: 19, name: 'Quincy Green', faculty: 'BSc', date: '2024-08-28', semester: 'third', amount: '22500' },
        { id: 20, name: 'Robert Allen', faculty: 'BA', date: '2024-09-02', semester: 'fourth', amount: '21000' },
        { id: 21, name: 'Sarah Turner', faculty: 'BCA', date: '2024-10-07', semester: 'first', amount: '22000' },
        { id: 22, name: 'Tommy Evans', faculty: 'BBA', date: '2024-11-12', semester: 'second', amount: '20000' },
        { id: 23, name: 'Ursula Morris', faculty: 'BCom', date: '2024-12-17', semester: 'third', amount: '23000' },
        { id: 24, name: 'Victor Scott', faculty: 'BSc', date: '2025-01-22', semester: 'fourth', amount: '20500' },
        { id: 25, name: 'Wendy Hill', faculty: 'BA', date: '2025-02-26', semester: 'first', amount: '21500' },
        { id: 26, name: 'Xavier Reed', faculty: 'BCA', date: '2025-04-02', semester: 'second', amount: '19500' },
        { id: 27, name: 'Yvonne Bailey', faculty: 'BBA', date: '2025-05-07', semester: 'third', amount: '22500' },
        { id: 28, name: 'Zachary Cooper', faculty: 'BCom', date: '2025-06-11', semester: 'fourth', amount: '21000' },
        { id: 29, name: 'Alice Johnson', faculty: 'BSc', date: '2025-07-16', semester: 'first', amount: '22000' },
        { id: 30, name: 'Bob Brown', faculty: 'BA', date: '2025-08-21', semester: 'second', amount: '20000' },
        { id: 31, name: 'Charlie Wilson', faculty: 'BCA', date: '2025-09-25', semester: 'third', amount: '23000' },
        { id: 32, name: 'David Lee', faculty: 'BBA', date: '2025-10-30', semester: 'fourth', amount: '20500' },
        { id: 33, name: 'Emma Davis', faculty: 'BCom', date: '2025-12-04', semester: 'first', amount: '21500' },
        { id: 34, name: 'Frank Miller', faculty: 'BSc', date: '2026-01-08', semester: 'second', amount: '19500' },
        { id: 35, name: 'Grace Clark', faculty: 'BA', date: '2026-02-12', semester: 'third', amount: '22500' },
        { id: 36, name: 'Henry Moore', faculty: 'BCA', date: '2026-03-19', semester: 'fourth', amount: '21000' },
        { id: 37, name: 'Isabel White', faculty: 'BBA', date: '2026-04-23', semester: 'first', amount: '22000' },
        { id: 38, name: 'Jackie Hall', faculty: 'BCom', date: '2026-05-28', semester: 'second', amount: '20000' },
        { id: 39, name: 'Kevin Young', faculty: 'BSc', date: '2026-07-02', semester: 'third', amount: '23000' },
        { id: 40, name: 'Linda Harris', faculty: 'BA', date: '2026-08-06', semester: 'fourth', amount: '20500' },
        { id: 41, name: 'Michael Thompson', faculty: 'BCA', date: '2026-09-10', semester: 'first', amount: '21500' },
        { id: 42, name: 'Nancy Martinez', faculty: 'BBA', date: '2026-10-15', semester: 'second', amount: '19500' },
        { id: 43, name: 'Oliver Robinson', faculty: 'BCom', date: '2026-11-19', semester: 'third', amount: '22500' },
        { id: 44, name: 'Patricia King', faculty: 'BSc', date: '2026-12-24', semester: 'fourth', amount: '21000' },
        { id: 45, name: 'Quincy Green', faculty: 'BA', date: '2027-01-28', semester: 'first', amount: '22000' },
        { id: 46, name: 'Robert Allen', faculty: 'BCA', date: '2027-03-04', semester: 'second', amount: '20000' },
        { id: 47, name: 'Sarah Turner', faculty: 'BBA', date: '2027-04-08', semester: 'third', amount: '23000' },
        { id: 48, name: 'Tommy Evans', faculty: 'BCom', date: '2027-05-13', semester: 'fourth', amount: '20500' },
        { id: 49, name: 'Ursula Morris', faculty: 'BSc', date: '2027-06-17', semester: 'first', amount: '21500' },
        { id: 50, name: 'Victor Scott', faculty: 'BA', date: '2027-07-22', semester: 'second', amount: '19500' },
    ];
    
    const [searchQuery, setSearchQuery] = useState('');
    const [offset, setOffset] = useState(0);
    const [perPage] = useState(10);


    const handleSearch = (query) => {
        setSearchQuery(query);
        setOffset(0); // Reset offset when search query changes
    };

    const filteredLogs = logs.filter(log =>
        log.name.toLowerCase().includes(searchQuery.toLowerCase())
        || log.faculty.toLowerCase().includes(searchQuery.toLowerCase())
        || log.semester.toLowerCase().includes(searchQuery.toLowerCase())
        || log.amount.toLowerCase().includes(searchQuery.toLowerCase())
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
                <div className="w-5/6 p-4 bg-[#F0F1F3] absolute right-0 pt-0">
                    <Header title="Admin" />
                    <div className="container min-w-full min-h-screen bg-[#FFFFFF]">
                        <div className="p-4 bg-[#FFFFFF]">
                            <div className="flex justify-between items-center">
                            <div className="flex justify-center gap-8 items-center">
                                    <h1 className="text-2xl font-bold mb-4">Student Fee Payment Logs</h1>
                                    <SearchBar onSearch={handleSearch} />
                                </div>
                                <Link to='/admin-dashboard/payments/add'>
                                    <Button children="Add Payment" className='px-3' />
                                </Link>
                            </div>
                            <div className="overflow-x-auto">
                            <table className="table-auto border-collapse w-full">
                                    <thead>
                                        <tr>
                                            <th className="border border-black bg-blue-500 text-white px-4 py-2">Date</th>
                                            <th className="border border-black bg-blue-500 text-white px-4 py-2">Name</th>
                                            <th className="border border-black bg-blue-500 text-white px-4 py-2">Faculty</th>
                                            <th className="border border-black bg-blue-500 text-white px-4 py-2">Semester</th>
                                            <th className="border border-black bg-blue-500 text-white px-4 py-2">Amount</th>
                                            <th className="border border-black bg-blue-500 text-white px-4 py-2">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paymentLogs.map(log => (
                                            <tr key={log.id}>
                                                <td className="border border-black px-4 py-2">{log.date}</td>
                                                <td className="border border-black px-4 py-2">{log.name}</td>
                                                <td className="border border-black px-4 py-2">{log.faculty}</td>
                                                <td className="border border-black px-4 py-2">{log.semester}</td>
                                                <td className="border border-black px-4 py-2">{log.amount}</td>
                                                <td className="border border-black px-4 py-2 flex gap-4 justify-center">
                                                    <Link to={`/admin-dashboard/payments/1/edit`}>
                                                        <img className='h-6' src="/images/edit-text.png" alt="" />
                                                    </Link>
                                                    <Link to={`/admin-dashboard/payments/1/delete`}>
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

export default Payments;
