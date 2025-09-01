import { catchAsyncErrors } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/error.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary"


export const registerUser=catchAsyncErrors(async(req,res,next)=>{
    const {firstName,lastName, email, phone, nic, dob, gender, password}=req.body;

    if(!firstName ||!lastName|| !email ||!phone ||!nic ||!dob ||!gender|| !password){
        return next(new ErrorHandler(400,"All fields are required"))
    }
    const findUser=await User.findOne({email})
    if(findUser)
    {
        return next(new ErrorHandler(400,"User already create"))
    }
    const createdUser=await User.create({
        firstName,lastName, email, phone, nic, dob, gender, password,role:"Patient"
    })

    generateToken(createdUser,"User Created successfully",201,res)

    // console.log(createdUser);
    

    // return res.status(201).json({
    //     success:true,
    //     message:"User Created Successfully",
    //     createdUser
    // })
})

export const loginUser=catchAsyncErrors(async(req,res,next)=>{
    const{email,password,confirmPassword,role}=req.body;
    console.log(email,password,confirmPassword,role);

    if(password!==confirmPassword)
    {
        return next(new ErrorHandler(400,"Password does not match"))
    }
    const existingUser=await User.findOne({email})
    if(!existingUser)
    {
        return next(new ErrorHandler(400,"User Does not exist"))
    }
    const comparePassword=await existingUser.comparePassword(password);
    if(!comparePassword)
    {
        return next(new ErrorHandler(400,"Invalid Username or Password"))
    }
    if(role!==existingUser.role)
    {
        return next(new ErrorHandler(400,"Please provide correct role"))
    }
     generateToken(existingUser,"User Login successfully",200,res)
})


export const addNewAdmin=catchAsyncErrors(async (req,res,next)=>{

    const {firstName,lastName, email, phone, nic, dob, gender, password}=req.body;
    console.log(firstName);

    if(!firstName ||!lastName|| !email ||!phone ||!nic ||!dob ||!gender|| !password){
        return next(new ErrorHandler(400,"All fields are required"))
    }

    const registeredUser=await User.findOne({email});
    if(registeredUser)
    {
        return next(new ErrorHandler(`User with this email already exist`))
    }

    const newAdmin=await User.create({firstName,lastName, email, phone, nic, dob, gender, password,role:"Admin"});

    return res.status(201).json({
        success:true,
        message:"Admin Created Successfully",
        newAdmin
    })
    

})

export const addNewDoctor=catchAsyncErrors(async(req,res,next)=>{
  // console.log(req.files);
  
    if(!req.files || Object.keys(req.files).length===0)
    {
        return next(new ErrorHandler("Picture required ... ",400))
    }
    const allowedFormats=["image/jpeg","image/png","image/webp"]

    const{docAvatar}=req.files;

    console.log(docAvatar);
    

    if(!allowedFormats.includes(docAvatar.mimetype))
    {
        return next(new ErrorHandler("Please provide image in valid format",400))
    }
    
    const{    
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    doctorDepartment}=req.body;

      if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password ||
    !doctorDepartment ||
    !docAvatar
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  const isRegisterd=await User.findOne({email});
  if(isRegisterd)
  {
    return next(new ErrorHandler("Doctor already registered",400))
  }
  const cloudinaryResponse=cloudinary.uploader.upload(
    docAvatar.temFilePath
  )
    if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(
      new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500)
    );
  }
  const createdDoctor=await User.create({
    firstName,
    lastName ,
    email, 
    phone,
    nic,
    dob ,
    gender,
    role:"Doctor",
    password, 
    doctorDepartment ,
    docAvatar:{
       public_id:cloudinaryResponse.public_id,
       url:cloudinaryResponse.secure_url 
    }
})

  res.status(200).json({
    success: true,
    message: "New Doctor Registered",
    createdDoctor,
  });

})

export const getAllDoctors=catchAsyncErrors(async(req,res,next)=>{
    const allDoctors=await User.find({role:'Doctor'})
    return res.status(200).json({
        success:true,
        doctors:allDoctors
    })
})

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const logoutPatient=catchAsyncErrors(async(req,res,next)=>{
    res.cookie("patientToken","",{
        expires:new Date(Date.now())

    }).json({
        success:true,
        message:"Patient Logout successsfully"
    })
})

export const logoutAdmin=catchAsyncErrors(async(req,res,next)=>{
    res.cookie("adminToken","",{
        expires:new Date(Date.now())

    }).json({
        success:true,
        message:"Admin Logout successsfully"
    })
})