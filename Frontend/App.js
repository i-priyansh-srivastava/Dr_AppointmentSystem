import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import { useState } from 'react';

import Home from "./components/Homepage.js";
import Login from "./components/LoginSign.js";
import Dashboard from "./components/Patient/Dashboard.js"
import AdminDash from "./components/Admin/AdminDash.js"
import DrDashboard from "./components/Doctor/DrDashboard.js"




import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [isLogin, setLogin] = useState(true);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home setLogin={setLogin}/>} />
        <Route path="/login" element={<Login isLogin={isLogin}  setLogin={setLogin} />} />
        <Route path="/signup" element={<Login isLogin={isLogin} setLogin={setLogin}/>} /> 
        <Route path="/patient_dashboard" element={<Dashboard />} /> 
        <Route path="/admin_dashboard" element={<AdminDash />} /> 
        <Route path="/doctor_dashboard" element={<DrDashboard />} />
        {/* <Route path="/patient_dashboard/All_Doctors" element={<AllDoctors />} /> 
        <Route path="/patient_dashboard/bookings" element={<Bookings />} /> 
        <Route path="/patient_dashboard/documents" element={<Documents />} /> 
        <Route path="/patient_dashboard/notification" element={<Notification />} /> 
        <Route path="/patient_dashboard/call_ambulance" element={<Ambulance />} />  */}


      </Routes>
      
      <ToastContainer/>
    </Router>
  );
}

export default App;