import "../../styles/PatientStyle/Profile.css"
import profilePic from "../../images/photograph.jpg"
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = (props) => {
  const email = props.email;

  const [user, setUser] = useState(null); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/getUser/${email}`);
        setUser(response.data.user); 
      } catch (e) {
        console.error("Error fetching user:", e);
      }
    };

    fetchUser(); 
  }, [email]);

  console.log(user);
  
  if (!user) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="patProfileContainer">
      <div className="patProfielTab">
        <div className="patcontent">
          <h2>{user.username}</h2>
          <h5>Age: {user.age}</h5>
          <h5>Gender: {user.gender}</h5>
          <h5>Blood Group: {user.bloodGroup}</h5>
        </div>

        <div>
          <img className="patProfilePic" src={profilePic} alt="Profile" />
        </div>
      </div>
      <button className="patEditBtn">Edit</button>
    </div>
  );
};

export default Profile;
