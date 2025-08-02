import { catchAsyncErrors } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/error.js";
import { Message } from "../models/messageSchema.js";

export const createMessage=catchAsyncErrors(async(req,res,next)=>{
    console.log("From create message route");
    const{firstName,lastName,email,phone,message}=req.body;
    if(!firstName ||!lastName ||!email ||!phone||!message)
    {
        return next(new ErrorHandler("All fields are required",400))
    }
    const createdMessage=await Message.create({
        firstName,lastName,email,phone,message
    })
    return res.status(201).json({
        success:true,
        message:"Message Created Successfully",
        createdMessage
    })
    
})

export const getAllMessages=catchAsyncErrors(async(requestAnimationFrame,res,next)=>{
    console.log("Get Alll message routes");
    const getAllMessages=await Message.find();

    return res.status(200).json({
        success:true,
        messageList:getAllMessages
    })
    
})