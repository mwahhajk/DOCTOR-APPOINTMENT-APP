import mongoose from "mongoose";

export const dbConnect=()=>{
    mongoose.connect("mongodb://localhost:27017/",{dbName:"DOCTORS_APPOINTMENT_SYSTEM"})
    .then(()=>{console.log("DB Connected Successfully")})
    .catch(err=>{console.log(err);
    })

}