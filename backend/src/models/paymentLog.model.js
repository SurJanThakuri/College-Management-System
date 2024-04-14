import mongoose from "mongoose";
import { Schema } from "mongoose";
const paymentLogSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    studentName: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    faculty: {
        type: Schema.Types.ObjectId,
        ref: "Faculty",
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    })

export const PaymentLog = mongoose.model("PaymentLog", paymentLogSchema)