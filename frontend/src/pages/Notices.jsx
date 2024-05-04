import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { refreshToken } from '../services/authServices';
import API_URL from '../api';

function NoticeList() {
    const [notices, setNotices] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        const accessToken = localStorage.getItem('accessToken');
        const accessTokenExpiry = localStorage.getItem('accessTokenExpiry');

        if (!accessToken || !accessTokenExpiry || new Date(accessTokenExpiry) < new Date()) {
             refreshToken();
        }
        }, []);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        axios.get(`${API_URL}/admin/notices`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(response => {
                setNotices(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
        }, []);


    const handleDelete = (id) => {
        const accessToken = localStorage.getItem('accessToken');
        axios.delete(`${API_URL}/admin/notices/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(response => {
                window.location.reload();
            })
            .catch(error => {
                console.error('Error deleting notice:', error);
            });
    };

    const [searchQuery, setSearchQuery] = useState('');
    const [offset, setOffset] = useState(0);
    const [perPage] = useState(5);


    const [expandedNotice, setExpandedNotice] = useState(null);

    const toggleExpand = (id) => {
        setExpandedNotice(expandedNotice === id ? null : id);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setOffset(0); // Reset offset when search query changes
    };

    const filteredNotices = notices.filter(notice =>
        notice.title.toLowerCase().includes(searchQuery.toLowerCase())
        || notice.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const pageCount = Math.ceil(filteredNotices.length / perPage);

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage * perPage);
    };

    const noticesToShow = filteredNotices.slice(offset, offset + perPage);

    return (
        <div className='container min-w-full min-h-screen bg-[#F0F1F3]'>
            <div className="flex">
                <Sidebar />
                <div className="w-5/6 p-4 bg-[#F0F1F3] md:absolute md:right-0 absolute right-8 pt-0">
                    <Header title="Admin" />
                    <div className="container min-w-full min-h-screen bg-[#F0F1F3]">
                        <div className="p-4 bg-[#F0F1F3]">
                            <div className="my-2 flex justify-between items-center">
                                <div className="flex justify-center gap-8 items-center">
                                    <h1 className="text-2xl font-bold mb-4">Notices</h1>
                                </div>
                                <Link to="/admin-dashboard/notices/add">
                                    <Button children="Add Notice" className='px-3' />
                                </Link>
                            </div>
                            <SearchBar onSearch={handleSearch} />
                            {noticesToShow.map(notice => (
                                <div key={notice._id} className="flex justify-between items-center mb-4 bg-white p-4 rounded-lg shadow-md cursor-pointer" onClick={() => toggleExpand(notice._id)}>
                                    <div className='w-full'>
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-lg font-semibold">{notice.title}</h2>
                                            <div className="flex gap-3 justify-end mt-2 p-2 w-[100px]">
                                                <Link to={`/admin-dashboard/notices/${notice._id}/edit`}>
                                                    <img className='h-6' src="/images/edit-text.png" alt="" />
                                                </Link>
                                                <button onClick={() => handleDelete(notice._id)}>
                                                    <img className='h-6' src="/images/delete.png" alt="" />
                                                </button>
                                            </div>
                                        </div>
                                        {expandedNotice === notice._id && (
                                            <div className="text-gray-600 mt-2">{notice.description}</div>
                                        )}

                                    </div>

                                </div>
                            ))}
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
            </div>
        </div>
    );
}

export default NoticeList;