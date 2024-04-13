import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { Student } from "../models/student.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"

const generateAccessAndRefreshTokens = async (studentId) => {
    try {
        const student = await Student.findById(studentId)
        const accessToken = student.generateAccessToken()
        const refreshToken = student.generateRefreshToken()

        student.refreshToken = refreshToken
        await student.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const loginStudent = asyncHandler(async (req, res) => {
    // req body -> data
    const { email, password } = req.body

    // check email
    if (!email) {
        throw new ApiError(400, "email is required")
    }

    // find the student
    const student = await Student.findOne({ email })

    if (!student) {
        throw new ApiError(404, "Student with this email does not exist")
    }

    // passwordd check 
    const isPasswordValid = await student.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid Credentials")
    }

    // access and refresh token
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(teacher._id)

    //remove password and refresh token from response
    const loggedInStudent = await Student.findById(student._id).select("-password -refreshToken")

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
                    student: loggedInStudent, accessToken, refreshToken
                },
                "Student logged in successfully"
            )
        )

})

const logoutStudent = asyncHandler(async (req, res) => {
    await Student.findByIdAndUpdate(
        req.student._id,
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
        .json(new ApiResponse(200, {}, "Student logged Out"))

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

        const student = await Student.findById(decodedToken?._id)

        if (!student) {
            throw new ApiError(401, "invalid refresh token")
        }

        if (incomingRefreshToken !== student?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(student._id)

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

    const student = await Student.findById(req.student?._id)
    const isPasswordCorrect = await student.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid Old Password")
    }

    student.password = newPassword
    await student.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "Password Changed Successfully")
        )
})

const getCurrentStudent = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(
            new ApiResponse(200, req.teacher, "Current Student Fetched Successfully")
        )
})

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { name, email, phone, address, dob, gender, shift, nationality, faculty, rollNo, emergencyContact, bloodGroup, admissionYear, guardianName, guardianRelation, guardianPhone } = req.body;

    if (!name || !email || !phone || !address || !shift || !dob || !gender  || !nationality || !faculty || !rollNo || !emergencyContact || !bloodGroup || !admissionYear || !guardianName || !guardianRelation || !guardianPhone) {
        throw new ApiError(400, "All fields are required")
    }

    const teacher = await Student.findByIdAndUpdate(
        req.student?._id,
        {
            $set: {
                name: name,
                email: email,
                address: address,
                phone: phone,
                shift: shift,
                dob: dob,
                gender: gender,
                nationality: nationality,
                faculty: faculty,
                rollNo: rollNo,
                emergencyContact: emergencyContact,
                bloodGroup: bloodGroup,
                admissionYear: admissionYear,
                guardianName: guardianName,
                guardianRelation: guardianRelation,
                guardianPhone: guardianPhone
            }
        },
        { new: true }
    ).select("-password")

    return res
        .status(200)
        .json(new ApiResponse(200, teacher, "Account details updated successfully"))
})


export {
    loginStudent,
    logoutStudent,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentStudent,
    updateAccountDetails
}