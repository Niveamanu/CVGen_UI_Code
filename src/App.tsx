import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { MsalProvider } from "@azure/msal-react";
import { getMsalInstance } from "./config/msalConfig";
import { UserProvider } from "./contexts/UserContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateCV from "./pages/CreateCV";
import CVBuilder from "./pages/CVBuilder";
import { ToastContainer } from "react-toastify";  
import React from 'react';
import NavRoutes from "./routes/Routes";

function App() {
  return (
    <MsalProvider instance={getMsalInstance()}>
      <UserProvider>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        
       <NavRoutes />
      </UserProvider>
    </MsalProvider>
  );
}
export default App;