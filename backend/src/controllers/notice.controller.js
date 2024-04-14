import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Notice } from "../models/notice.model.js"

const getNoticeById = asyncHandler(async(req, res) => {
    const { id } = req.params
    const notice = await Notice.findById(id)
    if (!notice) {
        throw new ApiError(404, "Notice not found")
    }
    return res.status(200).json(
        new ApiResponse(200, notice, "Notice data fetched successfully")
    )
})

const getAllNotices = asyncHandler(async (req, res) => {
    try {
        const notices = await Notice.find({});
        return res.status(200).json(
            new ApiResponse(200, notices, "All notices data fetched successfully")
        )
    } catch (error) {
        throw new ApiError(500, "Something went wrong while getting all notices data");
    }
});

const addNotice = asyncHandler(async (req, res) => {
    const { date, title, description } = req.body

    if ([date, title, description].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const createdNotice = await Notice.create({
        date,
        title,
        description
    })

    if (!createdNotice) {
        throw new ApiError(500, "Failed to create notice")
    }

    // return response
    return res.status(201).json(
        new ApiResponse(200, createdNotice, "Notice created successfully")
    )
})

const updateNoticeDetails = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const { date, title, description } = req.body;

    if (!date || !title || !description) {
        throw new ApiError(400, "All fields are required")
    }

    const notice = await Notice.findByIdAndUpdate(
        id,
        {
            $set: {
                date: date,
                title: title,
                description: description
            }
        },
        { new: true }
    )
    return res
        .status(200)
        .json(new ApiResponse(200, notice, "Notice details updated successfully"))
})

const deleteNotice = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const notice = await Notice.findByIdAndDelete(id);
    return res
        .status(200)
        .json(new ApiResponse(200, notice, "Notice deleted successfully"))
})


export {
    getNoticeById,
    getAllNotices,
    addNotice,
    updateNoticeDetails,
    deleteNotice
}