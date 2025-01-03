import "../../styles/PatientStyle/Dashboard.css";
import { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';

import Profile from "./Profile.js";
import AllDoctors from "./AllDoctors.js";
import Bookings from "./Bookings.js";
import Documents from "./Documents.js";
import Notification from "./Notifications.js";
import Ambulance from "./Ambulance.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faUserMd, faClipboardList, faFileAlt, faBell, faAmbulance, faSignOutAlt, faBars } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
    const location = useLocation();
    const email = location.state?.email;

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

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [email]);

    const [isNavVisible, setNavVisible] = useState(window.innerWidth > 768);

    const toggleNavigation = () => {
        setNavVisible(prev => !prev);
    };

    const selectedBtnMap = {
        Profile: <Profile email={email} />,
        AllDoctors: <AllDoctors email={email} />,
        Bookings: <Bookings email={email} />,
        Documents: <Documents email={email} />,
        Notification: <Notification />,
        Ambulance: <Ambulance />,
    };

    const [selectedBtn, setBtn] = useState("Profile");
    const btnAction = (pressed) => {
        setBtn(pressed);
        if (window.innerWidth <= 768) setNavVisible(false);
    };

    return (
        <div className="DashboardContainer">
            <button className="hamburger" onClick={toggleNavigation}>
                <FontAwesomeIcon icon={faBars} />
            </button>

            <div className={`navigation ${!isNavVisible ? "hiddenNavigation" : ""}`}>
                <button className="naviBtn" onClick={() => btnAction("AllDoctors")}><FontAwesomeIcon icon={faUserMd} />All Doctors</button>
                <button className="naviBtn" onClick={() => btnAction("Bookings")}><FontAwesomeIcon icon={faClipboardList} />My Bookings</button>
                <button className="naviBtn" onClick={() => btnAction("Documents")}><FontAwesomeIcon icon={faFileAlt} />Documents</button>
                <button className="naviBtn" onClick={() => btnAction("Notification")}><FontAwesomeIcon icon={faBell} />Notification</button>
                <button className="naviBtn" onClick={() => btnAction("Ambulance")}><FontAwesomeIcon icon={faAmbulance} />Ambulance Service</button>
                <Link to="/"><button className="naviBtn"><FontAwesomeIcon icon={faSignOutAlt} />Logout</button></Link>
            </div>

            <div className="RHS">
                <div className="profileNavi">
                    <button className="profile" onClick={() => btnAction("Profile")}>Profile <FontAwesomeIcon icon={faAddressCard} /></button>
                </div>

                <div className="details">
                    {selectedBtnMap[selectedBtn]}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
