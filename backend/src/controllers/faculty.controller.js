import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import {Faculty} from "../models/faculty.model.js"



const getFacultyById = asyncHandler(async(req, res) => {
    const { id } = req.params
    const faculty = await Faculty.findById(id)
    if (!faculty) {
        throw new ApiError(404, "Faculty not found")
    }
    return res.status(200).json(
        new ApiResponse(200, faculty, "Faculty data fetched successfully")
    )
})

const getAllFaculties = asyncHandler(async (req, res) => {
    try {
        const faculties = await Faculty.find({});
        return res.status(200).json(
            new ApiResponse(200, faculties, "All faculties data fetched successfully")
        )
    } catch (error) {
        throw new ApiError(500, "Something went wrong while getting all faculties data");
    }
});


const addFaculty = asyncHandler(async (req, res) => {
    // get faculty details from frontend
    const { name, description } = req.body

    // validation - not empty
    if ([name, description].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    // check if account already exists - email
    const existedFaculty = await Faculty.findOne({ name })
    if (existedFaculty) {
        throw new ApiError(409, "Faculty with this name already exists")
    }
    
    // check for course structure image
    const courseStructureImgLocalPath = req.files?.courseStructureImg[0]?.path;
    if (!courseStructureImgLocalPath) {
        throw new ApiError(400, "Course Structure Image is required")
    }

    // upload course structure image to cloudinary
    const courseStructureImg = await uploadOnCloudinary(courseStructureImgLocalPath)

    if (!courseStructureImg) {
        throw new ApiError(500, "Failed to upload course structure image")
    }
    // check for cover image
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if (!coverImageLocalPath) {
        throw new ApiError(400, "Cover Image is required")
    }

    // upload profile picture to cloudinary
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!coverImage) {
        throw new ApiError(500, "Failed to upload cover image")
    }

    // create faculty object - create entry in db
    const createdFaculty = await Faculty.create({
        name,
        description,
        courseStructureImg: courseStructureImg.url,
        coverImage: coverImage.url
    })

    if (!createdFaculty) {
        throw new ApiError(500, "Failed to create faculty")
    }

    // return response
    return res.status(201).json(
        new ApiResponse(200, createdFaculty, "Faculty created successfully")
    )
})

const updateFacultyDetails = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const { name, description } = req.body;

    if (!name || !description) {
        throw new ApiError(400, "All fields are required")
    }

    const faculty = await Faculty.findByIdAndUpdate(
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
