import React, { useState, useEffect } from 'react';
import "../../styles/AdminStyle/AdminDash.css";
import axios from 'axios';
import AdminContent from './AdminContent.js';
import AdminDr from './AdminDr.js';
import AdminAllDocs from "./AdminAllDocs.js";
import AdminAppointment from "./AdminAppointment.js";
import AdminPatient from "./AdminPatient.js";
import { Link } from 'react-router-dom';
import adminPic from "../../images/adminProfile.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUserSecret } from "@fortawesome/free-solid-svg-icons";

const AdminDash = () => {
    const [btnPress, setBtn] = useState("Dashboard");
    const [DrData, setDrData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isNavVisible, setNavVisible] = useState(window.innerWidth > 768);

    const toggleNavigation = () => {
        setNavVisible(prev => !prev);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/allDoctor');
                setDrData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setNavVisible(false);
            } else {
                setNavVisible(true);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const featureMap = {
        Dashboard: <AdminContent />,
        Doctor: <AdminDr DrData={DrData} />,
        Documents: <AdminAllDocs />,
        Appointment: <AdminAppointment />,
        Users: <AdminPatient />
    };

    const handleBtnPress = (choice) => {
        setBtn(choice);
        if (window.innerWidth <= 768) setNavVisible(false);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }


    return (
        <div className="adminDashboard">
            <button className="Hamburger" onClick={toggleNavigation}>
                <FontAwesomeIcon icon={faBars} />
            </button>
            <div className={`adminSidebar ${!isNavVisible ? "hiddensidebar" : ""}`}>
                <div className="adminprofile">
                    <p><FontAwesomeIcon icon={faUserSecret} size="5x" className="custom-icon"/></p>
                    <div className='AdminDetails'>
                        <h3>Admin</h3>
                <Link to="/">
                    <button className="logout-btn">Log Out</button>
                </Link>
                    </div>
                </div>
                <button className="navigBtn" onClick={() => handleBtnPress("Dashboard")}>Dashboard</button>
                <button className="navigBtn" onClick={() => handleBtnPress("Doctor")}>Doctors</button>
                <button className="navigBtn" onClick={() => handleBtnPress("Documents")}>Documents</button>
                <button className="navigBtn" onClick={() => handleBtnPress("Appointment")}>Appointment</button>
                <button className="navigBtn" onClick={() => handleBtnPress("Users")}>Users</button>
            </div>

            <div className='rightPane'>
                <div className='RightContent'>
                    {featureMap[btnPress]}
                </div>
            </div>
        </div>


    );
};

export default AdminDash;
