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

  export const getall = async(req,res)=>{
    var where ={}
    if (req.query.email) {
      where.email = req.query.email
    }
    if (req.query.username) {
      where.username =req.query.username
    }
    const date = await user.find(where)
    if (date.length > 0) {
      res.send({
         status: true,
         msg: "User data fetch successfully.",
         data: date
      })
   } else {
      res.send({
         status: false,
         msg: "No data found",
         data: []
      })
   }
    res.send(date)

  }

export const update = async(req,res)=>{
  const data = await user.findByIdAndUpdate({_id:req.body.id},req.body)
  if (data) {
    res.send({
      status: true,
      msg: "update successfully.",
      data: {}
    })
  } else {
    res.send({
      status: false,
      msg: "data found with given id or something wrong with update",
      data: {}
   })
  }

}

export const Delete = async(req,res)=>{
 const data = await user.findByIdAndDelete({_id:req.body.id})
 if (data) {
  res.send({
     status: true,
     msg: "Deleted successfully.",
     data: {}
  })
} else {
  res.send({
     status: false,
     msg: "data found with given id",
     data: {}
  })
}
}