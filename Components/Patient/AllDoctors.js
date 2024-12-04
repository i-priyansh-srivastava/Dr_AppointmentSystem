import { useState, useEffect } from "react";
import axios from "axios";
import Speciality from "./Speciality";
import Cards from "./Cards";
import ClinicVisit from "./ClinicVisit";

const AllDoctors = () => {
    const [speciality, setSpeciality] = useState("All Doctors");
    const [showForm, setForm] = useState(false);
    const [formId, setFormId] = useState('');
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/allDoctor');

                setDoctors(response.data);
                console.log("Doctors data:", response.data);
            } 
            catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);


   
    return (
        <>
            {!showForm ? (
                <div>
                    <Speciality setSpeciality={setSpeciality} />
                    <Cards doctors={doctors} speciality={speciality} setForm={setForm} setFormId={setFormId} />
                </div>
            ) : (
                <div>
                    <ClinicVisit formId={formId} setForm={setForm} />
                </div>
            )}
        </>
    );
};

export default AllDoctors;
