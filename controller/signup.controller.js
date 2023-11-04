import user from "../models/signup.models.js";
import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";
export const signupapi = async (req, res) => {
  const usernamename = await user.findOne({ username: req.body.username });
  const useemail = await user.findOne({ email: req.body.email });
  
if (usernamename) {
  res.send({
    status: false,
    msg: "Email already exist.",
    data: {}
  })
} else if (useemail){
  res.send({
    status: false,
    msg: "Mobile already exist.",
    data: {}
 });
}
else{
  const passwordHash =await bcrypt.hash(req.body.password,10)
  req.body.password=passwordHash
  
  var createdata = await user.create(req.body);
if (createdata) {
  createdata.token = await jwt.sign({time:Date(),createdataID:createdata._id},"coaching")
  res.send({
    status: true,
    msg: "Signup Successfully.",
    data: createdata
 });
}

}
  
 
};

export const login = async (req, res) => {
  const loginapi = await user.findOne({ username: req.body.username });
 if (loginapi) {
  const checkpassword = await bcrypt.compare(req.body.password,loginapi.password)
  if (checkpassword) {
    loginapi.token = await jwt.sign({time:Date(),createdataID:loginapi._id},"coaching")
    res.send({
      status: true,
      msg: "Login Succesfully",
      data: loginapi
   })
  } else {
    res.send({
      status: false,
      msg: "Invalid Password given.",
      data: {}
   })
  }
 }else{
  res.send({
    status: false,
    msg: "Email not found",
    data: {}
 })
 }
  };
