import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/DrStyle/DrDashboard.css"
import drPic from "../../images/drPIC.avif"
import PatientHistory from './PatientHistory';
import DrContent from './DrContent';
import MyAppointments from './MyAppointments.js';
import DrSession from './DrSession.js'
import Setting from "./DrSetting.js";

const Dashboard = () => {
    const consultations = [
        { date: "2024-11-01", patient: "Dr. Smith", diagnosis: "Cold", treatment: "Rest and medication", phone: 8754124623 },
        { date: "2024-10-20", patient: "Dr. Adams", diagnosis: "Flu", treatment: "Flu vaccine and fluids", phone: 9641943168 },
        // Add more entries as needed
    ];

  
      const handleAccept = (appointment, date, time) => {
        console.log("Accepted appointment:", appointment);
        if (date && time) {
          console.log("Scheduled for:", date, time);
        }
      };
      
      const handleReject = (appointment) => {
        console.log("Rejected appointment:", appointment);
      };
      
      <MyAppointments onAccept={handleAccept} onReject={handleReject}/>
    
      let drID= `673492c16235013d47216c2b`;

    const featureMap = {
        DrContent: <DrContent />,
        PatientHistory: <PatientHistory consultations={consultations} />,
        UpApp: <MyAppointments/>,
        Sessions: <DrSession />,
        Setting: <Setting drID={drID}/>

    }

    const [DRfeature, setDrFeature] = useState("DrContent");

    const featureHandler = (argument) => {
        setDrFeature(argument);
    }


    return (
        <div className="DRdashboard">
            <div className="DRsidebar">
                <div className="DRprofile">
                    <img className="DRprofile-pic" src={drPic} alt="Profile" />
                    <div className='DrProfile'>
                        <h3>Test Doctor..</h3>
                        <p>doctor@edoc.com</p>
                    </div>
                </div>
                <Link to="/">
                    <button className="logout-btn">Log Out</button>
                </Link>
                <nav className="sidebar-nav">
                    <ul>
                        <li onClick={() => { featureHandler("DrContent") }}>Dashboard</li>
                        <li onClick={() => { featureHandler("UpApp") }}>My Appointments</li>
                        <li onClick={() => { featureHandler("Sessions") }}>My Sessions</li>
                        <li onClick={() => { featureHandler("PatientHistory") }}>My Patients</li>
                        <li onClick={() => { featureHandler("Setting") }}>Settings</li>
                    </ul>
                </nav>
            </div>

            <div>
                {featureMap[DRfeature]};
            </div>


        </div>
    );
};

export default Dashboard;
