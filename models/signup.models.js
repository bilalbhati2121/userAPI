import mongoose from "mongoose";
const signupSchme = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
email:{
  type:String,
  required:true
},
password:{
  type:String,
  required:true
},
  mobile: {
    type: Number,
    required: true,
  },
  token:{
    type:String,
    required:false
},
});
const user= mongoose.model("signupSchmes",signupSchme)
export default user;