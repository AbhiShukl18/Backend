import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../Models/admin.model.js";

export const AdminLogin = async(req, res) => {

  try{
    const {email, password}=req.body?.AdminuserData;
    if(!email || !password){
      return res.json({success:false, error: "All fields are mandatory"});
    }

    const isUserExists= await Admin.findOne({email:email});
    if(!isUserExists){
      return res.json({success:false, error:"Email not found"});
    }
    const isPasswordCorrect= await bcrypt.compare(
      password,
      isUserExists.password
    );
    console.log(isPasswordCorrect,"isPasswordCorrect");
    if(!isPasswordCorrect){
      return res.json({success:false, error: "Password is incorrect"});
    }

    const userData={name:isUserExists.name, email:isUserExists.email};
    const token= await jwt.sign(
      {userId:isUserExists._id},
      process.env.JWT_SECRET
    );
    res.cookie("token", token);
    return res.json(
      {
        success:true, 
        message: "Login Successful", 
        userData,
        
      }
    );

  } 


 
  catch(error){

    console.log(error);
    return res.json({success: false, error: error})
  }
  // res.send("Login completed.");
};
// Register
export const RegisterAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body.AdminuserData;
    if (!name || !email || !password) {
      return res.json({ success: false, error: "All fields are required." });
    }

    // checking email id is existing or not
    const emailexist=await Admin.findOne({email:email});
    console.log(emailexist,"emailexist");

    if(emailexist){

      return res.json(
        {
          
          success:false,
          error:"Email id already exist, try with different details"
        }
      )
    }

    const encryptedPassword= await bcrypt.hash(password,10);


    const newUser = new Admin({
      name: name,
      email: email,
      password:encryptedPassword,
    });

    
    const responseFromDb = await newUser.save();

    return res.json({
      encryptedPassword,
      emailexist,
      success: true,
      responseFromDb,
      message: "Registeration Successfull.",
    });
  } catch (error) {
    console.log(error, "error");
    return res.json({ error: error, success: false });
  }
};

export const getCurrentAdmin = async (req, res) => {
  try {
    const token = req.cookies.token;
    // console.log(token, "token");
    const data = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(data, "data");
    const user = await Admin.findById(data?.userId);
    if (!user) {
      return res.json({ success: false });
    }
    const AdminuserData = { name: user.name, email: user.email };
    return res.json({ success: true, userData });
  } catch (error) {
    return res.json({ success: false, error });
  }
};

export const logoutAdmin = async (req, res) => {

  try{

    const token = req.cookies.token;
    res.clearCookie('token');
    return res.json({ success: true, message: 'Logged out successfully' });

  }

  catch(error){

    return res.json({ success: false, error });
  }


}