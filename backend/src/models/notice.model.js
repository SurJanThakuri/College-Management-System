import mongoose from "mongoose";
import { Schema } from "mongoose";
const noticeSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    })

export const Notice = mongoose.model("Notice", noticeSchema)