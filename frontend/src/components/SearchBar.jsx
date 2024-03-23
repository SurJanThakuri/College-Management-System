import React, { useState } from 'react';
import PropTypes from 'prop-types';

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center mb-4">
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search..."
                className="px-3 py-1 border border-gray-300 rounded-l-md focus:outline-none "
            />
            <button type="submit" className="px-3 py-1 border border-black bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none">
               <img src="/images/search.png" alt="" className='h-6 invert' />
            </button>
        </form>
    );
}

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
