import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/DrStyle/PatientHistory.css";

const PatientHistory = ({ email }) => {
  const [appointmentList, setList] = useState([]);
  const [Patient, setPatient] = useState(null);
  const [documents, setDocuments] = useState([]); // State to store patient's documents

  useEffect(() => {
    const fetchPatientList = async () => {
      try {
        const allPatient = await axios.get(
          "http://localhost:5000/api/v1/patient_request",
          {
            params: { DrEmail: email, Status: ["Pending", "Accepted"] },
          }
        );
        const myPatient = allPatient.data.filter(
          (it) =>
            it.DrEmail === email && ["Pending", "Accepted"].includes(it.Status)
        );
        setList(myPatient);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchPatientList();
  }, [email]);

  const handleShowPatientCard = async (patient) => {
    setPatient(patient);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/get_documents/${patient.PatientEmail}`,
      );
      setDocuments(response.data); 
    } catch (error) {
      console.error("Error fetching patient documents:", error);
      setDocuments([]); 
    }
  };

  const handleClosePatientCard = () => {
    setPatient(null);
    setDocuments([]); 
  };

  return (
    <div className="my-appointments">
      <h2>Requested Appointments</h2>
      <table className="appointment-table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Patient Card</th>
            <th>Contact No</th>
          </tr>
        </thead>
        <tbody>
          {appointmentList.map((it, index) => (
            <tr key={index}>
              <td>
                <div>{it.PatientName}</div>
              </td>
              <td>
                <button
                  className="button-82-pushable"
                  onClick={() => handleShowPatientCard(it)}
                >
                  Show Patient Card
                </button>
              </td>
              <td>{it.ContactNo}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {Patient && (
        <div className="patient-details-overlay">
          <div className="patient-details">
            <h2>Patient Details</h2>
            <p>
              <strong>Name:</strong> {Patient.PatientName}
            </p>
            <p>
              <strong>Contact No:</strong> {Patient.ContactNo}
            </p>
            <p>
              <strong>Status:</strong> {Patient.Status}
            </p>
            <p>
              <strong>Reason for Visit:</strong> {Patient.Symptoms}
            </p>
            <p>
              <strong>Documents:</strong>
            </p>
            {documents.length > 0 ? (
              <ul>
                {documents.map((doc, index) => (
                  <li key={index}>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >{doc.DocName}</a>

                    <button className="viewBtn">View</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No documents available</p>
            )}
            <button className="closeBtn" onClick={handleClosePatientCard}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientHistory;
