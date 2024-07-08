
import User from "../Models/user.model.js";

export const Login = (req, res) => {
  res.send("Login completed.");
};

export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body.userData;
    if (!name || !email || !password) {
      return res.json({ success: false, error: "All fields are required." });
    }

    const newUser = new User({
      name: name,
      email: email,
      password,
    });

    const responseFromDb = await newUser.save();

    return res.json({
      success: true,
      responseFromDb,
      message: "Registeration Successfull.",
    });
  } catch (error) {
    console.log(error, "error");
    return res.json({ error: error, success: false });
  }
};