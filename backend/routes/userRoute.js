import express from "express";
import { addNewAdmin, getAllDoctors, loginUser, logoutAdmin, logoutPatient, registerUser } from "../controllers/userController.js";
import { isAdminAuthenticted } from "../middleware/auth.js";


const userRouter=express.Router();

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.post("/add/admin",isAdminAuthenticted,addNewAdmin)
userRouter.get("/getAllDoctors",getAllDoctors)
userRouter.get("/logout/patient",logoutPatient);
userRouter.get("/logout/admin",isAdminAuthenticted,logoutAdmin)

export default userRouter;