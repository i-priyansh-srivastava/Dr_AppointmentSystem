import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/DrStyle/SettingStyle.css";

const Settings = ({ drID }) => {
    const [displayName, setDisplayName] = useState("");
    const [new_Fee, setConsultationFee] = useState("");
    const [new_address, setAddress] = useState("");
    const [new_experience, setExperience] = useState("");
    const [new_email, setEmail] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctorSettings = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`http://localhost:5000/api/v1/getDr_profile/${drID}`);
                console.log(response.data);
                
                const { name, consultationFee, address, experience, email, img  } = response.data;
                console.log(consultationFee + "  " + experience);
                

                setDisplayName(name);
                setConsultationFee(consultationFee);
                setAddress(address);
                setExperience(experience);
                setEmail(email);
                // setImage(img);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching settings:", error);
                toast.error("Failed to load settings.");
            }
        };
        console.log(drID);
        

        if (drID) 
            fetchDoctorSettings();
    }, [drID]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleSubmit = async (e) => {
        console.log("Submit clicked");
        
        e.preventDefault();

        if (!displayName || !new_Fee || !new_address || !new_experience || !new_email) {
            toast.warn("Please fill in all required fields.");
            return;
        }

        const formData = new FormData();
        formData.append("name", displayName);
        formData.append("consultationFee", new_Fee);
        formData.append("address", new_address);
        formData.append("experience", new_experience);
        formData.append("email", new_email);
        if (image && typeof image !== "string") {
            formData.append("img", image);
        }

        try {
            await axios.put(`http://localhost:5000/api/v1/getDr_profile/${drID}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Settings updated successfully!");
        } catch (error) {   
            console.error("Error updating settings:", error);
            toast.error("Failed to update settings. Please try again.");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="settings">
            <h2>Update Your Profile</h2>
            <form onSubmit={handleSubmit} className="settings-form">
                <label htmlFor="displayName">Display Name:</label>
                <input
                    type="text"
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Enter your name"
                    required
                />

                <div className="sameline">
                    <label htmlFor="experience">Experience (in years):</label>
                    <input
                        type="number"
                        id="experience"
                        value={ new_experience }
                        onChange={(e) => setExperience(e.target.value)}
                        placeholder="Enter your experience"
                        required
                    />
                
                    <label htmlFor="consultationFee">Consultation Fee:</label>
                    <input
                        type="number"
                        id="consultationFee"
                        value={new_Fee}
                        onChange={(e) => setConsultationFee(e.target.value)}
                        placeholder="Enter fee in USD"
                        required
                    />
                </div>


                <label htmlFor="address">Address:</label>
                <textarea
                    id="address"
                    value={new_address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your address"
                    rows="3"
                    required
                ></textarea>

                

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={new_email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                />

                <label htmlFor="image">Profile Image:</label>
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                {image && typeof image === "string" && (
                    <img src={image} alt="Current Profile" className="current-image" />
                )}

                <button type="submit" className="submit-btn">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default Settings;


// const GetProfile = async (req, res) => {
//     console.log("hello");
    
//     try {
//         const doctorId = req.params.id;

//         if (!doctorId) {
//             return res.status(400).json({ error: 'Doctor ID is required' });
//         }

//         const profile = await DrSchema.findById(doctorId);

//         if (!profile) {
//             return res.status(404).json({ error: 'Doctor not found' });
//         }

//         res.status(200).json(profile);
//     }
//     catch (error) {
//         console.error('Error fetching doctor profile:', error);
//         res.status(500).json({ error: 'Failed to fetch doctor profile', details: error.message });
//     }
// };

// controller is not accessed since console("hello") is coming up