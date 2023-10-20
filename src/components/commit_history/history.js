import React, { useState, useEffect } from "react";
import HistoryTable from "./HistoryTable";
import { Link, useLocation, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./history.css";
import Pagination from "../Pagination/Pagination";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";
import moment from "moment";
import { Button } from "@mui/material";

const History = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  let { id } = useParams();
  const [pdata, setPData] = useState([]);
  const [headerData, setHeaderData] = useState([]);

  async function getProjectData() {
    try {
      const date = new Date();
      const formattedStartDate = moment(date)
        .subtract(7, "days")
        .format("DD-MM-YYYY");
      const formattedEndDate = moment(date).format("DD-MM-YYYY");
      console.log(date, formattedStartDate, formattedEndDate);

      const response = await fetch(
        `http://localhost:5000/history/filterDate?startDate=${formattedStartDate}&endDate=${formattedEndDate}&id=${id}`
      );
      const data = await response.json();
      setPData(data);
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  }
  async function getHeaderData() {
    try {
      const response = await fetch(
        `http://localhost:5000/history/header/?id=${id}`
      );
      const data = await response.json();
      setHeaderData(data);
    } catch (error) {
      console.error("Error fetching header data:", error);
    }
  }
  async function getFilteredProjectData() {
    try {
      const formattedStartDate = moment(startDate).format("DD-MM-YYYY");
      const formattedEndDate = moment(endDate)
        .add(1, "day")
        .format("DD-MM-YYYY");
      const response = await fetch(
        `http://localhost:5000/history/filterDate?startDate=${formattedStartDate}&endDate=${formattedEndDate}&id=${id}`
      );
      const data = await response.json();
      setPData(data);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
  }

  useEffect(() => {
    getProjectData();
    getHeaderData();
  }, []);

  useEffect(() => {
    if (moment(startDate).isValid() && moment(endDate).isValid()) {
      getFilteredProjectData();
    }
  }, [startDate, endDate]);

  useEffect(() => {
    setTotalPages(Math.ceil(pdata.length / itemsPerPage));
  }, [pdata]);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const subset = pdata.slice(startIndex, endIndex);
  const disablePrevious = currentPage === 0;
  const disableNext = currentPage === totalPages - 1;

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const projectDetails = headerData[0];

  return (
    <div>
      <div className="second-container">
        <Card sx={{ minWidth: 275, paddingTop: 3, paddingBottom: 3 }}>
          <CardContent>
            <div style={{ paddingLeft: "30px" }}>
              {projectDetails && (
                <>
                  <Typography variant="h3" component="div">
                    {projectDetails.project}
                  </Typography>
                  <Link
                    to={projectDetails.link}
                    style={{
                      fontSize: "16px",
                      textDecoration: "none",
                      color: "blue",
                      cursor: "pointer",
                    }}
                  >
                    <Typography variant="h6" component="div">
                      {projectDetails.link}
                    </Typography>
                  </Link>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="second-container">
        <Box p={3} display="flex" alignItems="center" padding={0}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box marginLeft="auto">
              <div style={{ paddingRight: "20px" }}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  renderInput={(params) => <input {...params.inputProps} />}
                  format="dd-MM-yyyy"
                />
              </div>
            </Box>
            <div>
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={handleEndDateChange}
                renderInput={(params) => <input {...params.inputProps} />}
                format="dd-MM-yyyy"
              />
            </div>
          </LocalizationProvider>
        </Box>
        {moment(startDate).isValid() && moment(endDate).isValid() ? (
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            *Data for the given dates
          </Typography>
        ) : (
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            *Data for the past week
          </Typography>
        )}

        <HistoryTable items={subset} />
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        disablePrevious={disablePrevious}
        disableNext={disableNext}
      />
    </div>
  );
};

export default History;
