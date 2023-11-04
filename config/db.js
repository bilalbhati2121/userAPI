import mongoose from "mongoose";
export const db =async()=>{
    const conn =await mongoose.connect(
        "mongodb+srv://prod:mWxFbsFDbJ0l2SEb@cluster0.lwfrsfa.mongodb.net/?retryWrites=true&w=majority"
    )
    console.log("Host----",conn.connection.host)
}


export default db;