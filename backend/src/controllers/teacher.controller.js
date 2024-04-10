import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { Teacher } from "../models/teacher.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"

const generateAccessAndRefreshTokens = async (teacherId) => {
    try {
        const teacher = await Teacher.findById(teacherId)
        const accessToken = teacher.generateAccessToken()
        const refreshToken = teacher.generateRefreshToken()

        teacher.refreshToken = refreshToken
        await teacher.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const loginTeacher = asyncHandler(async (req, res) => {
    // req body -> data
    const { email, password } = req.body

    // check email
    if (!email) {
        throw new ApiError(400, "email is required")
    }

    // find the teacher
    const teacher = await Teacher.findOne({ email })

    if (!teacher) {
        throw new ApiError(404, "Teacher with this email does not exist")
    }

    // passwordd check 
    const isPasswordValid = await teacher.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid Credentials")
    }

    // access and refresh token
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(teacher._id)

    //remove password and refresh token from response
    const loggedInTeacher = await Teacher.findById(teacher._id).select("-password -refreshToken")

    // send cookies
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200,
                {
                    teacher: loggedInTeacher, accessToken, refreshToken
                },
                "Teacher logged in successfully"
            )
        )

})

const logoutTeacher = asyncHandler(async (req, res) => {
    await Teacher.findByIdAndUpdate(
        req.teacher._id,
        {
            $set: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true,
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "Teacher logged Out"))

})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized Request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const teacher = await Teacher.findById(decodedToken?._id)

        if (!teacher) {
            throw new ApiError(401, "invalid refresh token")
        }

        if (incomingRefreshToken !== teacher?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(teacher._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access Token Refreshed"
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body

    const teacher = await Teacher.findById(req.teacher?._id)
    const isPasswordCorrect = await teacher.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid Old Password")
    }

    teacher.password = newPassword
    await teacher.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "Password Changed Successfully")
        )
})

const getCurrentTeacher = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(
            new ApiResponse(200, req.teacher, "Current Teacher Fetched Successfully")
        )
})

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { name, email, phone, address, bio, course, shift } = req.body;

    if (!name || !email || !phone || !address || !bio || !course || !shift) {
        throw new ApiError(400, "All fields are required")
    }

    const teacher = await Teacher.findByIdAndUpdate(
        req.teacher?._id,
        {
            $set: {
                name: name,
                email: email,
                address: address,
                phone: phone,
                bio: bio,
                course: course,
                shift: shift
            }
        },
        { new: true }
    ).select("-password")

    return res
        .status(200)
        .json(new ApiResponse(200, teacher, "Account details updated successfully"))
})

const updateProfilePicture = asyncHandler(async (req, res) => {
    const profilePictureLocalPath = req.file?.path

    if (!profilePictureLocalPath) {
        throw new ApiError(400, "Profile Picture is missing")
    }

    const profilePicture = await uploadOnCloudinary(profilePictureLocalPath)

    //Todo: Delete old avatar image

    if (!profilePicture.url) {
        throw new ApiError(400, "Error while uploading on avatar")
    }

    const teacher = await Teacher.findByIdAndUpdate(
        req.teacher?._id,
        {
            $set: {
                profilePicture: profilePicture.url
            }
        },
        { new: true }
    ).select("-password")
    return res
        .status(200)
        .json(new ApiResponse(200, teacher, "Profile Picture updated successfully"))
})

export {
    loginTeacher,
    logoutTeacher,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentTeacher,
    updateAccountDetails,
    updateProfilePicture
}