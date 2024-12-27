import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/AdminStyle/AdminAllBookings.css"

const AdminAppointment = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/v1/bookings");
                setBookings(response.data);
            } catch (error) {
                setError("Failed to fetch bookings. Please try again.");
                console.error(error);
            }
        };

        fetchBookings();
    }, []);


    const getStatusClass = (status) => {
        if (status.toLowerCase() === 'accepted') return 'status accepted';
        if (status.toLowerCase() === 'pending') return 'status pending';
        if (status.toLowerCase() === 'rejected') return 'status rejected';
        return 'status';
    };
    
    return (
        <div className="adminBookingsContainer">
            <h2>All Bookings</h2>
            {error && <p className="error">{error}</p>}
            {bookings.length > 0 ? (
                <table className="bookingsTable">
                    <thead>
                        <tr>
                            <th>Patient Name</th>
                            <th>Doctor Name</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id}>
                                <td>{booking.PatientName}</td>
                                <td>{booking.DoctorName}</td>
                                <td>{new Date(booking.AppointmentDate).toLocaleDateString()}</td>
                                <td className={getStatusClass(booking.Status)}>{booking.Status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No bookings found.</p>
            )}
        </div>
    );
};

export default AdminAppointment