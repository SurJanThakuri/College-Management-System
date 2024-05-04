import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import {Faculty} from "../models/faculty.model.js"
import {Routine} from "../models/routine.model.js"



const getRoutineById = asyncHandler(async(req, res) => {
    const { id } = req.params
    const routine = await Routine.findById(id)
    if (!routine) {
        throw new ApiError(404, "Routine not found")
    }
    return res.status(200).json(
        new ApiResponse(200, routine, "Routine data fetched successfully")
    )
})

const getAllRoutines = asyncHandler(async (req, res) => {
    try {
        const routines = await Faculty.find({});
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
        throw new ApiError(400, "Course Structure Image is required")
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

const deleteFaculty = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const faculty = await Faculty.findByIdAndDelete(id);
    if (!faculty) {
        throw new ApiError(404, "Faculty not found");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, faculty, "Faculty deleted successfully"));

});

const updateCoverImage = asyncHandler(async (req, res) => {
    const coverImageLocalPath = req.file?.path

    if (!coverImageLocalPath) {
        throw new ApiError(400, "Cover Image is missing")
    }

    const coverImage = await uploadOnCloudinary(coverImageLocalPath)


    if (!coverImage.url) {
        throw new ApiError(400, "Error while uploading on cloudinary")
    }
    const { id } = req.params
    const updatedCoverImage = await Faculty.findByIdAndUpdate(
        id,
        {
            $set: {
                coverImage: coverImage.url
            }
        },
        { new: true }
    )
    return res
        .status(200)
        .json(new ApiResponse(200, updatedCoverImage, "Cover Image updated successfully"))
})
const updateCourseStructImg = asyncHandler(async (req, res) => {
    const courseStructImgLocalPath = req.file?.path

    if (!courseStructImgLocalPath) {
        throw new ApiError(400, "Course Structure Image is missing")
    }

    const courseStructImg = await uploadOnCloudinary(courseStructImgLocalPath)


    if (!courseStructImg.url) {
        throw new ApiError(400, "Error while uploading on cloudinary")
    }
    const { id } = req.params
    const updatedCourseStructImg = await Faculty.findByIdAndUpdate(
        id,
        {
            $set: {
                courseStructureImg: courseStructImg.url
            }
        },
        { new: true }
    )
    return res
        .status(200)
        .json(new ApiResponse(200, updatedCourseStructImg, "Cover Image updated successfully"))
})

export {
    getFacultyById,
    getAllFaculties,
    addFaculty,
    updateFacultyDetails,
    deleteFaculty,
    updateCoverImage,
    updateCourseStructImg
}
