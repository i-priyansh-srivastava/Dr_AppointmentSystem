import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/PatientStyle/Documents.css";
import { Link } from "react-router-dom";

const Documents = (props) => {
    const email = props.email;
    const [documents, setDocuments] = useState([]);
    const [file, setFile] = useState(null);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/get_documents/${email}`);
                setDocuments(response.data);
            } catch (error) {
                console.error("Error fetching documents:", error);
            }
        };

        fetchDocuments();
    }, [email]);

    const handleFileUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("email", email);
        formData.append("DocName", file.name);
        

        try {
            const response = await axios.post("http://localhost:5000/api/v1/documents/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("File uploaded successfully!");
            setDocuments([...documents, response.data.document]);
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Failed to upload file.");
        }
    };

    const handleDelete = async (fileName) => {
        try {
            await axios.delete(`http://localhost:5000/api/v1/documents/${fileName}`);
            alert("File deleted successfully!");
            setDocuments(documents.filter((doc) => doc.DocName !== fileName));
        } catch (error) {
            console.error("Error deleting file:", error);
            alert("Failed to delete file.");
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div className="docContainer">
            <h1 className="head">My Documents</h1>
            <div className="docList">
                {documents.map((doc, index) => (
                    <div key={index} className="eachDocContainer">
                        <div className="eachDoc">
                            <h4>{doc.DocName}</h4>
                            <p>{doc.DocDate}</p>
                        </div>
                        <button
                            className="ViewBtn"
                            onClick={() => window.open(doc.DocUrl, "_blank")}
                        >
                           <Link to="/download/:fileName">View</Link></button>
                        <button className="delBtn" onClick={() => handleDelete(doc.DocName)}>
                            &#xf5de;
                        </button>
                    </div>
                ))}
            </div>
            <div>
                <h6>Upload Your File</h6>
                <form onSubmit={handleFileUpload}>
                    <input type="file" id="fileUpload" name="fileUpload" onChange={handleFileChange}></input>
                    <input type="submit" value="Upload"></input>
                </form>
            </div>
        </div>
    );
};

export default Documents;

