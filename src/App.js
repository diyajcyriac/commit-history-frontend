import React, { useState, useEffect } from "react";
import Pagination from "./components/Pagination/Pagination";
import Search from "./components/search/Search";
import DataTable from "./components/table/table";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import { AuthContext } from "./context";

const getToken = () => {
  let token = localStorage.getItem("token");
  return token && token.trim() ? token : false;
};

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
  
  const onStorageChangeHandler = ()=>{
    setIsLoggedIn(false)
  }
  useEffect(()=>{
    document.addEventListener("storageEvent",onStorageChangeHandler);
    return ()=>{
      document.addEventListener("storageEvent",onStorageChangeHandler);
    }
  },[]);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = search(fdata).slice(startIndex, endIndex);
  const disablePrevious = currentPage === 0;
  const disableNext = currentPage === totalPages - 1;
  const [isLoggedin, setIsLoggedIn] = useState(getToken());
  if (!isLoggedin) {
    return (
      <>
        <Navbar setIsLoggedIn={setIsLoggedIn} />
        <Login setIsLoggedIn={setIsLoggedIn} />
      </>
    );
  }

  return (
    <AuthContext.Provider value={{ isLoggedin  }}>
     
      <Navbar setIsLoggedIn={setIsLoggedIn} />
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
    </AuthContext.Provider>
  );
}

export default App;
