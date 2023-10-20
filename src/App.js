import React, { useState, useEffect } from "react";
import Pagination from "./components/Pagination/Pagination";
import Search from "./components/search/Search";
import DataTable from "./components/table/table";

function App() {
  const [query, setQuery] = useState("");
  const [fdata, setData] = useState([]);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const search = (data) => {
    return data.filter((item) =>
      item.project.toLowerCase().includes(query.toLowerCase())
    );
  };

  const getData = () => {
    fetch("http://localhost:5000/projects")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setCurrentPage(0);
    setTotalPages(Math.ceil(search(fdata).length / itemsPerPage));
  }, [query, fdata]);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = search(fdata).slice(startIndex, endIndex);
  const disablePrevious = currentPage === 0;
  const disableNext = currentPage === totalPages - 1;


  return (
    <>
      <div className="second-container">
        <Search query={query} setQuery={setQuery} />
        <DataTable items={subset} />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          disablePrevious={disablePrevious}
          disableNext={disableNext}
        />
      </div>
    </>
  );
}

export default App;
