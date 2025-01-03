import "../../styles/PatientStyle/Card.css"
import { toast } from "react-toastify"

const Card = (props) => {
    const formHandler = (id) => {
        props.setForm(true)
        props.setEmail(props.individual.email)
    }

    const onlineConsultation = () => {
        console.log(props.individual.email);

        toast.info("Under construction 🚧—cool stuff is on the way!")
    }
    return (
        <div className="eachCard">
            <div className="cardImg">
                <img src={props.individual.img} alt="props.individual.name"></img>
            </div>

            <div className="docDetails">
                <h1 className="DrName">{props.individual.name}</h1>
                <h3 className="docDegree">{props.individual.degrees}</h3>
                <h4>Speciality: {props.individual.specialist}</h4>
                <h4>Experience: {props.individual.experience}</h4>
                <h4>Address: {props.individual.address}</h4>
            </div>

            <div className="book">
                <h4>Consultation Fees: {props.individual.consultationFee}</h4>
                <div className="bookBtn">
                    <div className="Clinic" onClick={() => formHandler(props.individual.id)}>
                        <p className="btnText">Vital Visit</p>
                        <div className="btnTwo">
                            <p className="btnText2">BOOK</p>
                        </div>
                    </div>
                    {/* <button className="Clinic" onClick={()=> {formHandler(props.individual.id)}}>ClinicVisit</button> */}
                    <button className="Online" onClick={onlineConsultation}>Online Consultation</button>
                </div>
            </div>
        </div>
    )
}

export default Card