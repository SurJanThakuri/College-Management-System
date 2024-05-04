import mongoose from "mongoose";
import { Schema } from "mongoose";
const routineSchema = new Schema({
    faculty: {
        type: Schema.Types.ObjectId,
        ref: "Faculty",
        required: true
    },
    routineImage: {
        type: String,
        required: true
    },
},
    {
        timestamps: true
    })

export const Routine = mongoose.model("Routine", routineSchema)

