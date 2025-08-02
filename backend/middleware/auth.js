import { catchAsyncErrors } from "./catchAsyncError.js";
import jwt from "jsonwebtoken"
import ErrorHandler from "./error.js";
import { User } from "../models/userSchema.js";


export const isAdminAuthenticted=catchAsyncErrors(async(req,res,next)=>{
    const token=req.cookies.adminToken
    // console.log(token);
    if(!token)
    {
        return next(new ErrorHandler("User is not authenticated as Admin",400))
    }
    const decoded=await jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user=await User.findById(decoded.id);

    if(req.user.role!=='Admin')
    {
        return next(new ErrorHandler("Role is not matched",400))
    }
    next()
    
})

export const isPatientAuthenticated=catchAsyncErrors(async(req,res,next)=>{
    const token=req.cookies.patientToken;
    if(!token)
    {
        return next(new ErrorHandler("User is not authenticated as Admin",400))
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.user=await User.findById(decoded.id)
    if(req.user.role!=="Patient")
    {
        return next(new ErrorHandler("Role is not matched",400))
    }
    next()
})

