import "../../styles/PatientStyle/Profile.css"
import profilePic from "../../images/photograph.jpg"
const Profile = () => {
    return (
        <div className="patProfileContainer">
            <div className="patProfielTab">
                <div className="patcontent">
                    <h2>Priyansh Srivastava</h2>
                    <h5>Age: 22 yrs</h5>
                    <h5>Gender: Male</h5>
                    <h5>Blood Group: AB+</h5>
                </div>

                <div>
                    <img className="patProfilePic" src={profilePic} alt="4040"></img>
                </div>
            </div>
            <button className="patEditBtn">Edit</button>
        </div>
    )
}

export default Profile