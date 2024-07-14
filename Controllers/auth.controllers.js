
import User from "../Models/user.model.js";
import bcrypt from "bcrypt";

export const Login = async(req, res) => {

  try{
    const {email, password}=req.body?.userData;
    if(!email || !password){
      return res.json({success:true, error: "All fields are mandatory"});
    }

    const isUserExists= await User.findOne({email:email});
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

    const userData={name:isUserExists.name, email:isUserExists.email}
    return res.json({success:true, message: "Login Successful", userData});

  }

  catch(error){

    console.log(error);
    return res.json({success: false, error: error})
  }
  // res.send("Login completed.");
};

export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body.userData;
    if (!name || !email || !password) {
      return res.json({ success: false, error: "All fields are required." });
    }

    // checking email id is existing or not
    const emailexist=await User.findOne({email:email});
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


    const newUser = new User({
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