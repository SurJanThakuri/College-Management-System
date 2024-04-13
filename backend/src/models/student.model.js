import mongoose from "mongoose";
import { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    address: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    shift: {
        type: String,
        required: true
    },
    faculty: {
        type: Schema.Types.ObjectId,
        ref: "Faculty",
        required: true
    },
    rollNo: {
        type: String,
        required: true
    },
    emergencyContact: {
        type: String
    },
    bloodGroup: {
        type: String
    },
    admissionYear: {
        type: String
    },
    guardianName: {
        type: String
    },
    guardianRelation: {
        type: String
    },
    guardianPhone: {
        type: String
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    refreshToken: {
        type: String
    }

},
    {
        timestamps: true
    });


studentSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
})

studentSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password)
}

studentSchema.methods.generateAccessToken = function(){
   return jwt.sign({
        _id: this._id,
        name: this.name,
        email: this.email,
    },
    
    process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}
studentSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id
    },
    
    process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
}

export const Student = mongoose.model("Student", studentSchema)

