import jwt from "jsonwebtoken";
import User from "../Models/user.model.js";
import Admin from "../Models/admin.model.js";
export async function checkIsUserValid(req, res, next) {
  try {
    // console.log("inside middleware");
    const token = req.cookies.token;
    // console.log(token, "token");
    // console.log(process.env.JWT_SECRET, "process.env.JWT_SECRET");
    const data = await jwt.verify(token, process.env.JWT_SECRET);
    // console.log(data,"data")
    const user = await User.findById(data?.userId);
    if (!user) {
      return res.json({ success: false, error: "User not valid." });
    }
    req.userId = data.userId;
    next();
  } catch (error) {
    console.log(error, "error jere");
    return res.json({ success: false, error });
  }
}

export async function checkIsAdminValid(req, res, next) {
  try {
    // console.log("inside middleware");
    const token = req.cookies.token;
    // console.log(token, "token");
    // console.log(process.env.JWT_SECRET, "process.env.JWT_SECRET");
    const data = await jwt.verify(token, process.env.JWT_SECRET);
    // console.log(data,"data")
    const admin = await Admin.findById(data?.adminId  );
    if (!admin) {
      return res.json({ success: false, error: "Admin not valid." });
    }
    req.userId = data.adminId;
    next();
  } catch (error) {
    console.log(error, "error here");
    return res.json({ success: false, error });
  }
}