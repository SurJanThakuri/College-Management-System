import mongoose from "mongoose";
import { Schema } from "mongoose";
const facultySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    courseStructureImg: {
        type: String,
    },
    coverImage: {
        type: String,
    }
},
    {
        timestamps: true
    })

export const Faculty = mongoose.model("Faculty", facultySchema)

