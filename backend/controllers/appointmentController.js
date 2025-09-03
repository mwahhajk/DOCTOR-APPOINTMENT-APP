import { catchAsyncErrors } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/error.js";
import { User } from "../models/userSchema.js";
import {Appointment} from "../models/appointmentSchema.js"

export const createAppintment=catchAsyncErrors(async(req,res,next)=>{
    console.log("From create appiontment");
    const{firstName,lastName,email,phone,password,nic,dob,gender,appointment_date,department,doctor_firstname,doctor_lastname,hasVisited,address}=req.body
    
    if(!firstName||!lastName||!email||!phone||!nic||!dob||!gender||!appointment_date||!department||!doctor_firstname||!doctor_lastname||!address)
    {
        return next(new ErrorHandler("Please provide all required fields for appointment",400))
    }

    const doctorConflict=await User.find({
        firstName:doctor_firstname,
        lastName:doctor_lastname,
        doctorDepartment:department,
        role:"Doctor"

    })
    if(doctorConflict.length===0)
    {
        return next(new ErrorHandler("No Docotor Found",400))
    }
    else if(doctorConflict.length>1)
    {
        return next(new ErrorHandler("Doctor data is conflicted, book your appointment via email or phone call",400))
    }
    const doctorId=doctorConflict[0]._id;
    // console.log(doctorId);
    // return res.json({message:"ID"})
    const patientId = req.user._id;
  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor: {
      firstName: doctor_firstname,
      lastName: doctor_lastname,
    },
    hasVisited,
    address,
    doctorId,
    patientId,
  });
  res.status(200).json({
    success: true,
    appointment,
    message: "Appointment Send!",
  });
    
})

export const getAllAppintment=catchAsyncErrors(async(req,res,next)=>{
    console.log("From get all appiontment");
    const appointments = await Appointment.find();
    res.status(200).json({
    success: true,
    appointments,
  });
    
})

export const deleteAppintment=catchAsyncErrors(async(req,res,next)=>{
    console.log("From delete appiontment");
  const { id } = req.params;
  const appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment Not Found!", 404));
  }
  await appointment.deleteOne();
  res.status(200).json({
    success: true,
    message: "Appointment Deleted!",
  });
    
})

export const updateAppintment=catchAsyncErrors(async(req,res,next)=>{
    console.log("From update appiontment");
    const { id } = req.params;
    let appointment = await Appointment.findById(id);
    if (!appointment) {
      return next(new ErrorHandler("Appointment not found!", 404));
    }
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      message: "Appointment Status Updated!",
    });
  
    
})


