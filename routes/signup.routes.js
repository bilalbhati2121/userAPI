import { login, signupapi } from "../controller/signup.controller.js";
import Express  from "express";
export const router = Express.Router()
router.route("/signup/api").get(signupapi)
router.route("/login/api").post(login)
export default router;