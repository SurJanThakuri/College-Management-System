import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import ReactPaginate from 'react-paginate';

function NoticeList() {
    const [notices, setNotices] = useState([
        { id: 1, title: 'hi', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, necessitatibus.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, necessitatibus.' },
        { id: 2, title: 'hello', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, necessitatibus.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, necessitatibus.' },
        { id: 3, title: 'first', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, necessitatibus.' },
        { id: 4, title: 'second', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, necessitatibus.' },
        { id: 5, title: 'holiday', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, necessitatibus.' },
        { id: 6, title: 'leave', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, necessitatibus.' },
        { id: 7, title: 'public holiday', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, necessitatibus.' },
        { id: 8, title: 'more', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, necessitatibus.' },
        { id: 9, title: 'exam', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, necessitatibus.' },
        { id: 10, title: 'fee', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, necessitatibus.' },
        { id: 11, title: 'exam routine published', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, necessitatibus.' },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [offset, setOffset] = useState(0);
    const [perPage] = useState(5);

    const handleDelete = (id) => {
        setNotices(notices.filter(notice => notice.id !== id));
    };

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
                                <div key={notice.id} className="flex justify-between items-center mb-4 bg-white p-4 rounded-lg shadow-md cursor-pointer" onClick={() => toggleExpand(notice.id)}>
                                    <div className='w-full'>
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-lg font-semibold">{notice.title}</h2>
                                            <div className="flex gap-3 justify-end mt-2 p-2 w-[100px]">
                                                <Link to={`/admin-dashboard/notices/${notice.id}/edit`}>
                                                    <img className='h-6' src="/images/edit-text.png" alt="" />
                                                </Link>
                                                <button onClick={() => handleDelete(notice.id)}>
                                                    <img className='h-6' src="/images/delete.png" alt="" />
                                                </button>
                                            </div>
                                        </div>
                                        {expandedNotice === notice.id && (
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