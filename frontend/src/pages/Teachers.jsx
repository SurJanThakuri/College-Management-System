import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';

const teachersData = [
    {
        id: 1,
        name: 'Marry Copper',
        email: 'marry.copper@example.com',
        phone: '980-436-0990',
        imageUrl: 'https://i.pinimg.com/474x/3b/3f/a1/3b3fa1a2db40f8f2610b9cd691cfe8e2.jpg',
    },
    {
        id: 2,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpR_6GJUO442noPeWzNqzgNkrlH8rYR0IChw&usqp=CAU',
    },
    {
        id: 3,
        name: 'Marry Copper',
        email: 'marry.copper@example.com',
        phone: '980-436-0990',
        imageUrl: 'https://i.pinimg.com/474x/3b/3f/a1/3b3fa1a2db40f8f2610b9cd691cfe8e2.jpg',
    },
    {
        id: 4,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpR_6GJUO442noPeWzNqzgNkrlH8rYR0IChw&usqp=CAU',
    },
    {
        id: 5,
        name: 'Marry ',
        email: 'marry.copper@example.com',
        phone: '980-436-0990',
        imageUrl: 'https://i.pinimg.com/474x/3b/3f/a1/3b3fa1a2db40f8f2610b9cd691cfe8e2.jpg',
    },
    {
        id: 6,
        name: 'John ',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpR_6GJUO442noPeWzNqzgNkrlH8rYR0IChw&usqp=CAU',
    },
    {
        id: 7,
        name: 'Marry ',
        email: 'marry.copper@example.com',
        phone: '980-436-0990',
        imageUrl: 'https://i.pinimg.com/474x/3b/3f/a1/3b3fa1a2db40f8f2610b9cd691cfe8e2.jpg',
    },
    {
        id: 8,
        name: 'John ',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpR_6GJUO442noPeWzNqzgNkrlH8rYR0IChw&usqp=CAU',
    },
    // Add more teachers as needed
];

function Teachers() {
    const [searchQuery, setSearchQuery] = useState('');
    const [offset, setOffset] = useState(0);
    const [perPage] = useState(8); // Change the number of items per page here

    const handleSearch = (query) => {
        setSearchQuery(query);
        setOffset(0); // Reset offset when search query changes
    };

    const filteredTeachers = teachersData.filter(teacher =>
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
        || teacher.email.toLowerCase().includes(searchQuery.toLowerCase())
        || teacher.phone.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                <div className="w-5/6 p-4 bg-[#F0F1F3] absolute right-0 pt-0">
                    <Header title="Admin" />
                    <div className="flex justify-between">
                    <div className="flex justify-center gap-8 items-center">
                                    <h1 className="text-2xl font-bold mb-4">Teachers</h1>
                                    <SearchBar onSearch={handleSearch} />
                                </div>
                        <Link to="/admin-dashboard/teachers/add">
                            <Button children="Add Teacher" type='button' className='px-4' />
                        </Link>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {teachersToShow.map((teacher) => (
                            <Link key={teacher.id} to={`/admin-dashboard/teachers/teacher`}>
                                <div className="bg-white rounded-lg p-4 shadow-md">
                                    <img className="w-20 h-20 rounded-full mx-auto mb-4" src={teacher.imageUrl} alt={teacher.name} />
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
