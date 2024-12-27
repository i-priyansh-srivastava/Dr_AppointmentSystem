import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/AdminStyle/AdminUser.css"
const AdminPatient = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/v1/get_users_by_role");
                setUsers(response.data.users);
            } catch (err) {
                console.error("Error fetching users:", err);
                setError(err.response?.data?.message || "Failed to fetch users");
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="userListContainer">
            <h2>All Users</h2>
            {error && <p className="error">{error}</p>}
            <div className="userList">
                {users.map((user) => (
                    <div className="userCard" key={user._id}>
                        <p><strong>Name:</strong> {user.username}</p>
                        <p><strong>Age:</strong> {user.age}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default AdminPatient