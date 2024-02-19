import React from 'react';

function Pagination({ currentPage, setCurrentPage, ordersPerPage, setOrdersPerPage, totalOrders }) {

  
    const handlePreviousClick = () => {
      setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
    };
  
    const handleNextClick = () => {
      if (currentPage < totalOrders) {
        setCurrentPage(currentPage + 1);
    }
    };
  
    const handleOrdersPerPageChange = (event) => {
      setOrdersPerPage(event.target.value);
      setCurrentPage(1);
    };

  
    return (
      <div className="pagination-controls">
        <button onClick={handlePreviousClick} disabled={currentPage === 1}>Попередня</button>
        <select onChange={handleOrdersPerPageChange} value={ordersPerPage}>
          <option value="50">50</option>
          <option value="100">100</option>

        </select>
        <button onClick={handleNextClick}>Наступна</button>
      </div>
    );
  }
  

export default Pagination;