import React from 'react';

const SearchQuery = ({searchQuery, setSearchQuery, placeHolder, type}) => {

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
    return (
        <div className='search_wrap_input'>
            <input
                type={type}
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder={placeHolder}
            />
        </div>
    );
};

export default SearchQuery;