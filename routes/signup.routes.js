import { Delete, getall, login, signupapi, update } from "../controller/signup.controller.js";
import Express  from "express";
export const router = Express.Router()
router.route("/signup/api").get(signupapi)
router.route("/login/api").post(login)
router.route("/get/api").get(getall)
router.route("/updata/api").put(update)
router.route("/delete/api").delete(Delete)
export default router;