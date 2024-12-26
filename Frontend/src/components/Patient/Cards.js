import Card from "./Card.js";
import "../../styles/PatientStyle/Card.css"

const Cards = (props) => {
    console.log(props.doctors);
    
    const filteredData = props.speciality === "All Doctors" ? props.doctors : props.doctors.filter(
        (individual) => individual.specialist === props.speciality
    );
    
    
    const setForm = props.setForm
    const setEmail= props.setEmail

    return (

        <div className="cardContainer">
            {filteredData.map((individual) => (
                <Card key={individual.id} individual={individual} setForm={setForm} setEmail={setEmail} />
            ))}
        </div>


    );
};

export default Cards;
