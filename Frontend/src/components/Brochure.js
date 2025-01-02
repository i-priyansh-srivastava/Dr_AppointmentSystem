import '../styles/Brochure.css'
import { Link } from 'react-router-dom';
import bgImg from "../images/brochureImg.jpg"


const Brochure = (props) => {
    const SIgnFreeHandler = () => {
        props.setLogin(false)
    }
    return (
        <div className="brochure">
            <div>
                <img className="image" src={bgImg} alt="doctor"></img>
            </div>

            <div className='homeContent'>
                <h2>Seamless Healthcare at Your Fingertips</h2>
                <h3>Your Health, Our Priority</h3>
                <button className='Signbtn' onClick={SIgnFreeHandler}><Link to="/login">Sign up FREE today </Link></button>

            </div>
            <div>
            </div>
        </div>
    )
}


export default Brochure;