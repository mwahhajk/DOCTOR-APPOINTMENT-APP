import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"Name should more tha three characters"]

    },
        lastName:{
        type:String,
        required:true,
        minLength:[3,"Name should more tha three characters"]

    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"Provide a Valid Email"]
    },
    phone:{
        type:String,
        required:true,
        minLength: [11, "Phone Number Must Contain Exact 11 Digits!"],
        maxLength: [11, "Phone Number Must Contain Exact 11 Digits!"],
    },
    nic:{
        type:String,
        required:[true,"NIC Required"],
        minLength: [13, "NIC Must Contain Only 13 Digits!"],
        maxLength: [13, "NIC Must Contain Only 13 Digits!"],
    },
    dob:{
        type:String,
        required:[true,"DOB is required"]
    },
    gender:{
        type:String,
        require:true,
        enmu:["Male","Female","Others"]
    },
    password:{
        type:String,
        required: [true, "Password Is Required!"],
        minLength: [8, "Password Must Contain At Least 8 Characters!"],
    },
    role:{
        type:String,
        required:[true,"Role is required"],
        enum:["Doctor","Patient","Admin"]
    },
    doctorDepartment:{
        type:String
    },
    docAvatar:{
        public_id:String,
        url:String
    }

})

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const User = mongoose.model("User", userSchema);