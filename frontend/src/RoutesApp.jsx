import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";

function RoutesApp() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Login />} />
          <Route path="/Login" element={<Login />} />
          {token ? (
            <Route path="/home" element={<Home />} />
          ) : (
            <Route path="/home" element={<Navigate to="/" replace />} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default RoutesApp;
