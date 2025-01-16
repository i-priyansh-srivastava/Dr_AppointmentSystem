import { useState, useEffect } from "react";
import axios from "axios";
import Speciality from "./Speciality.js";
import Cards from "./Cards.js";
import ClinicVisit from "./ClinicVisit.js";

const AllDoctors = (props) => {
    const [speciality, setSpeciality] = useState("All Doctors");
    const [showForm, setForm] = useState(false);
    const [formEmail, setEmail] = useState('');
    const [doctors, setDoctors] = useState([]);
    const userEmail = props.email;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/allDoctor');
                console.log(response);
                

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
                    <Cards doctors={doctors} speciality={speciality} setForm={setForm} setEmail={setEmail} />
                </div>
            ) : (
                <div>
                    <ClinicVisit setForm={setForm} userEmail={userEmail} formEmail={formEmail}/>
                </div>
            )}
        </>
    );
};

export default AllDoctors;
