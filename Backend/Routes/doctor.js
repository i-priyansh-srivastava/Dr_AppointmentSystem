
const express =require('express')
const  { logIn, signUp, updateUser } =require('../Controllers/userController')
const { getUserByEmail, getUsersByRole }= require("../Controllers/GetUserDetails")
const  getAllDoctors =require('../Controllers/AllDoctors')
const deleteDoc = require("../Controllers/DeleteDr")
const { addDr } = require("../Controllers/AddDr")
const BookDr= require("../Controllers/BookDr")
const{ getMyBooking, cancelBooking }= require('../Controllers/GetBooking')
const { PatList , StatusUpdate } = require( "../Controllers/PatientList")
const { PutProfile, GetProfile } = require('../Controllers/UpdateDrProfile')
const { getRandomDriver } = require("../Controllers/Ambulance")

const { uploadDocument, getDocuments, getAllDocuments, deleteDocument } = require("../Controllers/DocumentHandler")

const { createOrder } = require('../Controllers/Razorpay')


const multer = require("multer");
const router = express.Router();

const upload = multer({ dest: 'uploads/' }); // Temporary storage for file upload



router.post('/login',logIn);
router.post('/signup',signUp);

router.get("/getUser/:email", getUserByEmail);
router.get("/get_users_by_role" , getUsersByRole)

router.patch("/updateUser/:email" , updateUser);


router.get('/allDoctor',getAllDoctors); 
router.delete('/allDoctor/:id', deleteDoc);
router.post('/add_doctor', addDr)

router.get('/bookings',getMyBooking);
router.delete('/cancel_booking/:id', cancelBooking)

router.post('/patient_dashboard', BookDr);

router.get('/patient_request', PatList);
router.put('/patient_request/:id', StatusUpdate);

router.get('/getDr_profile/:id', GetProfile)
router.put('/getDr_profile/:id', PutProfile)


router.get('/call-ambulance', getRandomDriver);


router.post('/documents/upload', upload.single('file'), uploadDocument);
router.get('/allDocuments', getAllDocuments);
router.get('/get_documents/:email', getDocuments);
router.delete('/documents/:fileName', deleteDocument);

router.post('/create-order', createOrder);



module.exports= router;