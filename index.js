import  express  from "express";
import db from "./config/db.js";
import router from "./routes/signup.routes.js";
const app = express();
app.use(express.json())
db()
app.use(router)
app.listen(process.env.PORT || 4001,(req,res)=>{
    console.log("server");
})