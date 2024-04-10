import mongoose from "mongoose";
import { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const teacherSchema = new Schema({
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
    phone: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        required: true
    },
    shift: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    }, 
    bio: {
        type: String,
        required: true
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
    })

teacherSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
})

teacherSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password)
}

teacherSchema.methods.generateAccessToken = function(){
   return jwt.sign({
        _id: this._id,
        name: this.name,
        email: this.email,
    },
    
    process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}
teacherSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id
    },
    
    process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
}

export const Teacher = mongoose.model("Teacher", teacherSchema)

