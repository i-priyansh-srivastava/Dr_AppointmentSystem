import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../styles/DrStyle/PatientHistory.css";

const PatientHistory = ({ email }) => {
  const [appointmentList, setList] = useState([]);
  const [Patient, setPatient] = useState(null);

  useEffect(() => { 
    const fetchPatientList = async () => {
      try {
        const allPatient = await axios.get('http://localhost:5000/api/v1/patient_request', {
          params: { DrEmail: email, Status: ["Pending", "Accepted"] },
        });
        const myPatient = allPatient.data.filter(it => it.DrEmail === email && ['Pending', 'Accepted'].includes(it.Status));
        setList(myPatient);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchPatientList();
  }, [email]);

  const handleShowPatientCard = (patient) => {
    setPatient(patient);
  };

  const handleClosePatientCard = () => {
    setPatient(null);
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
                <Link 
                  className="show-patient-card-btn"
                  to="#"
                  onClick={() => handleShowPatientCard(it)}
                >
                  Show Patient Card
                </Link>
              </td>
              <td>{it.ContactNo}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {Patient && (
        <div className="patient-details">
          <h2>Patient Details</h2>
          <p><strong>Name:</strong> {Patient.PatientName}</p>
          <p><strong>Contact No:</strong> {Patient.ContactNo}</p>
          <p><strong>Status:</strong> {Patient.Status}</p>
          <p><strong>Reason for Visit:</strong> {Patient.Symptoms}</p>
          <p><strong>Documents:</strong></p>
          {/* <ul>
            {Patient.documents.map((doc, index) => (
              <li key={index}><a href={doc.url} target="_blank" rel="noopener noreferrer">{doc.name}</a></li>
            ))}
          </ul> */}
          <button onClick={handleClosePatientCard}>Close</button>
        </div>
      )}
    </div>
  );
};

export default PatientHistory;
