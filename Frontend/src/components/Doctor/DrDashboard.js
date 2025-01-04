import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import "../../styles/DrStyle/DrDashboard.css"
import drPic from "../../images/drPIC.avif"
import PatientHistory from './PatientHistory.js';
import DrContent from './DrContent.js';
import MyAppointments from './MyAppointments.js';
import DrSession from './DrSession.js'
import Setting from "./DrSetting.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {

    const location = useLocation();
    const email = location.state?.email;
    const [isNavVisible, setNavVisible] = useState(window.innerWidth > 768);

    const toggleNavigation = () => {
        setNavVisible((prev) => !prev);
    };

    useEffect(() => {
        if (email) {
            console.log("Email for this user:", email);
        }

        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setNavVisible(false);
            } else {
                setNavVisible(true);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };

    }, [email]);

    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!email) {
            console.error("Email is undefined. Cannot fetch user data.");
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/getUser/${email}`);
                setUser(response.data.user);
            } catch (e) {
                console.error("Error fetching user:", e);
            }
        };

        fetchUser();
    }, [email]);


    const handleAccept = (appointment, date, time) => {
        console.log("Accepted appointment:", appointment);
        if (date && time) {
            console.log("Scheduled for:", date, time);
        }
    };

    const handleReject = (appointment) => {
        console.log("Rejected appointment:", appointment);
    };

    <MyAppointments onAccept={handleAccept} onReject={handleReject} />

    const featureMap = {
        DrContent: <DrContent  />,
        PatientHistory: <PatientHistory email={email} />,
        UpApp: <MyAppointments email={email} />,
        Sessions: <DrSession email={email} />,
        Setting: <Setting email={email} />

    }

    const [DRfeature, setDrFeature] = useState("DrContent");

    const featureHandler = (argument) => {
        setDrFeature(argument);
        if (window.innerWidth <= 768) setNavVisible(false);
    }


    return (
        <div className="DRdashboard">
            <button className="hamburger" onClick={toggleNavigation}><FontAwesomeIcon icon={faBars} /></button>
            
            <div className={`DRsidebar ${!isNavVisible ? "hiddenNavigation" : ""}`}>
                <div className="DRprofile">
                    <img className="DRprofile-pic" src={drPic} alt="Profile" />
                    <div className='DrProfile'>
                        {user ? (
                            <>
                                <h3>{user.username}</h3>
                                <p>{user.email}</p>
                            </>
                        ) : (
                            <p>Loading profile...</p>
                        )}
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
                        <li onClick={() => { featureHandler("Setting") }}>Update Profile</li>
                    </ul>
                </nav>
            </div>

            <div className='content'>
                {featureMap[DRfeature]}
            </div>


        </div>
    )
}

export default Dashboard;
