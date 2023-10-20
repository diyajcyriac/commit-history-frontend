import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import History from "./components/commit_history/history";
import "./styles.css";
import Navbar from "./components/Navbar/Navbar";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <App />
            </>
          }
        />
        <Route path="/history/:id" element={
            <>
              <Navbar />
              <History />
            </>
          } />
      </Routes>
    </BrowserRouter>
);
