const Doctor = require('../Models/DoctorData');

const deleteDoc = async (req, res) => {
    try {
        const  Id  = req.params.id; 

        if (!Id) {
            return res.status(400).json({ message: "Doctor ID is required" });
        }

        const deletedDoctor = await Doctor.findByIdAndDelete(Id);

        if (!deletedDoctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }


        res.status(200).json({
            message: "Doctor deleted successfully",
            deletedDoctor, 
        });
    } catch (error) {
        console.error("Error deleting doctor:", error);
        res.status(500).json({ message: "Server error. Unable to delete doctor." });
    }
};


module.exports = deleteDoc
