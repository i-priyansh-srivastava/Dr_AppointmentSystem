const UserData = require("../Models/userSchema");
const  jwt = require("jsonwebtoken");
const  bcrypt =require("bcrypt");
const dotenv =require('dotenv')
dotenv.config()

const signUp = async (req, res) => {
  try {
    const { email, username, password,role } = req.body;
    console.log(req.body)
    const user = await UserData.findOne({ email: email });
    
    if (user) 
        return res.status(201).json({ message: "user already exist" });
    else {
      const hashedpassword = await bcrypt.hash(password,10);

      console.log(hashedpassword)
      const newUser = new UserData({ email, username, password:hashedpassword,role });
      
      await newUser.save();
      
      const token = jwt.sign({ email },process.env.JWT_SECRET,{ expiresIn: '1h' });
      console.log(token);
      
      return res.status(200).json({ message: "user registered", user: newUser,token:token,role:newUser.role });
    }
  } catch (error) {
    return res.status(500).json({ message: "not auth", error });
  }
};

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserData.findOne({ email: email });
    if (!user)
      return res.status(201).json({ message: "user does not exist", status: -1 });
    else {
      const ispwdvalid = await bcrypt.compare(password,user.password);
      if(!ispwdvalid){
        return res.status(400).json({message:"Invalid email or password"},);
      }
      const token = jwt.sign({ email },process.env.JWT_SECRET,{ expiresIn:'1h' });
      return res.status(200).json({ message: "Login Successful",user, token,role:user.role });
    }
  } catch (error) {
    return res.status(500).json({ message: "not auth" });
  }
};

module.exports={
    logIn,
    signUp
}