import React from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.css";
const Pagination = ({ totalPages, currentPage, handlePageChange, disablePrevious, disableNext }) => {
  return (
    <div className="pagination-container">
    <ReactPaginate
      activeClassName={'item active '}
      breakClassName={'item break-me '}
      breakLabel={'...'}
      containerClassName={'pagination'}
      disabledClassName={'disabled-page'}
      marginPagesDisplayed={2}
      nextClassName={"item next "}
      onPageChange={handlePageChange}
      pageCount={totalPages}
      pageClassName={'item pagination-page '}
      pageRangeDisplayed={2}
      previousClassName={"item previous"}
      previousLabel={"Previous"}
      nextLabel={"Next"}
    />
  </div>
    
  );
};

export default Pagination;


