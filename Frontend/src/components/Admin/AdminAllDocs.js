import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../../styles/AdminStyle/AdminAllDocs.css"

const AdminAllDocs = () => {
    const [documents, setDocuments] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/allDocuments');
                setDocuments(response.data);
            } catch (err) {
                console.error('Error fetching documents:', err);
                setError('Failed to fetch documents. Please try again later.');
            }
        };

        fetchDocuments();
    }, []);

    return (
        <div className="documentsListContainer">
            <h2>All Documents</h2>
            {error && <p className="error">{error}</p>}
            {documents.length > 0 ? (
                <table className="documentsTable">
                    <thead>
                        <tr>
                            <th>Document ID</th>
                            <th>Owner's Email</th>
                            <th>Document Title</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.map((doc) => (
                            <tr key={doc._id}>
                                <td><button>View</button></td>
                                <td>{doc.UserEmail}</td>
                                <td>{doc.DocName}</td> 
                                <td>{new Date(doc.DocDate).toLocaleDateString()}</td> 
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No documents found.</p>
            )}
        </div>
    );
};

export default AdminAllDocs