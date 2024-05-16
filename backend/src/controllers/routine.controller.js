import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import {Faculty} from "../models/faculty.model.js"
import {Routine} from "../models/routine.model.js"



const getRoutineById = asyncHandler(async(req, res) => {
    const { id } = req.params
    const routine = await Routine.findById(id).populate('faculty', 'id name');
    if (!routine) {
        throw new ApiError(404, "Routine not found")
    }
    return res.status(200).json(
        new ApiResponse(200, routine, "Routine data fetched successfully")
    )
})

const getAllRoutines = asyncHandler(async (req, res) => {
    try {
        const routines = await Routine.find({}).populate('faculty', 'name');
        return res.status(200).json(
            new ApiResponse(200, routines, "All routines data fetched successfully")
        )
    } catch (error) {
        throw new ApiError(500, "Something went wrong while getting all routines data");
    }
});


const addRoutine = asyncHandler(async (req, res) => {
    const { faculty } = req.body
    if ([faculty].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const routineImageLocalPath = req.files?.routineImage[0]?.path;
    if (!routineImageLocalPath) {
        throw new ApiError(400, "Routine Image is required")
    }

    const routineImage = await uploadOnCloudinary(routineImageLocalPath)

    if (!routineImage) {
        throw new ApiError(500, "Failed to upload routine image")
    }

    const createdRoutine = await Routine.create({
        faculty,
        routineImage: routineImage.url
    })

    if (!createdRoutine) {
        throw new ApiError(500, "Failed to create routine")
    }

    return res.status(201).json(
        new ApiResponse(200, createdRoutine, "Routine created successfully")
    )
})

const updateRoutineDetails = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const { faculty } = req.body;

    if (!faculty) {
        throw new ApiError(400, "All fields are required")
    }

    const routine = await Routine.findByIdAndUpdate(
        id,
        {
            $set: {
                name: name,
                description: description
            }
        },
        { new: true }
    )
    return res
        .status(200)
        .json(new ApiResponse(200, faculty, "Faculty details updated successfully"))
})

const deleteRoutine = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const routine = await Routine.findByIdAndDelete(id);
    if (!routine) {
        throw new ApiError(404, "Routine not found");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, routine, "Routine deleted successfully"));

});


export {
    getRoutineById,
    getAllRoutines,
    addRoutine,
    updateRoutineDetails,
    deleteRoutine
}
