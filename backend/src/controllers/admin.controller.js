import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { Admin } from "../models/admin.model.js"
import { Teacher } from "../models/teacher.model.js"
import { Student } from "../models/student.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"

const generateAccessAndRefreshTokens = async (adminId) => {
    try {
        const admin = await Admin.findById(adminId)
        const accessToken = admin.generateAccessToken()
        const refreshToken = admin.generateRefreshToken()

        admin.refreshToken = refreshToken
        await admin.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const registerAdmin = asyncHandler(async (req, res) => {
    // get admin details from frontend
    const { name, email, address, password, phone } = req.body
    // console.log("email: ", email);

    // validation - not empty
    if ([name, email, address, password, phone].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    // check if account already exists - email
    const existedAdmin = await Admin.findOne({ email })
    if (existedAdmin) {
        throw new ApiError(409, "Admin with this email already exists")
    }

    // check for profile picture
    const profilePictureLocalPath = req.files?.profilePicture[0]?.path;
    if (!profilePictureLocalPath) {
        throw new ApiError(400, "Profile picture is required")
    }

    // upload profile picture to cloudinary
    const profilePicture = await uploadOnCloudinary(profilePictureLocalPath)

    if (!profilePicture) {
        throw new ApiError(500, "Failed to upload profile picture")
    }

    // create admin object - create entry in db
    const admin = await Admin.create({
        name,
        email,
        address,
        password,
        phone,
        profilePicture: profilePicture.url
    })

    // check for admin creation - remove password and refresh token field from response
    const createdAdmin = await Admin.findById(admin._id).select("-password -refreshToken")

    if (!createdAdmin) {
        throw new ApiError(500, "Failed to create admin")
    }

    // return response
    return res.status(201).json(
        new ApiResponse(200, createdAdmin, "Admin created successfully")
    )
})

const loginAdmin = asyncHandler(async (req, res) => {
    // req body -> data
    const { email, password } = req.body

    // check email
    if (!email) {
        throw new ApiError(400, "email is required")
    }

    // find the admin
    const admin = await Admin.findOne({ email })

    if (!admin) {
        throw new ApiError(404, "Admin with this email does not exist")
    }

    // passwordd check 
    const isPasswordValid = await admin.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid Credentials")
    }

    // access and refresh token
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(admin._id)

    //remove password and refresh token from response
    const loggedInAdmin = await Admin.findById(admin._id).select("-password -refreshToken")

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
                    admin: loggedInAdmin, accessToken, refreshToken
                },
                "Admin logged in successfully"
            )
        )

})

const logoutAdmin = asyncHandler(async(req, res) => {
  await Admin.findByIdAndUpdate(
    req.admin._id,
    {
        $set: {
            refreshToken: 1
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
 .json(new ApiResponse(200, {}, "Admin logged Out"))

})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const admin = await Admin.findById(decodedToken?._id)

        if (!admin) {
            throw new ApiError(401, "invalid refresh token")
        }

        if (incomingRefreshToken !== admin?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(admin._id)
        console.log(accessToken, refreshToken);

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken },
                    "Access Token Refreshed"
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body

    const admin = await Admin.findById(req.admin?._id)
    const isPasswordCorrect = await admin.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid Old Password")
    }

    admin.password = newPassword
    await admin.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(
        new ApiResponse(200, {}, "Password Changed Successfully")
    )
})

const getCurrentAdmin = asyncHandler(async(req, res) => {
    return res
    .status(200)
    .json(
        new ApiResponse(200, req.admin, "Current Admin Fetched Successfully")
    )
})

const updateAccountDetails = asyncHandler(async(req, res) => {
    const {name, email, phone, address} = req.body;

    if (!name || !email || !phone || !address) {
        throw new ApiError(400, "All fields are required")
    }

    const admin = await Admin.findByIdAndUpdate(
        req.admin?._id,
        {
            $set: {
                name: name,
                email: email,
                address: address,
                phone: phone,
            }
        },
        {new: true}
        ).select("-password")

        return res
        .status(200)
        .json(new ApiResponse(200, admin, "Account details updated successfully"))
})

const updateProfilePicture = asyncHandler(async(req, res) => {
    const profilePictureLocalPath = req.file?.path

    if (!profilePictureLocalPath) {
        throw new ApiError(400, "Profile Picture is missing")
    }

    const profilePicture = await uploadOnCloudinary(profilePictureLocalPath)

    //Todo: Delete old avatar image

    if (!profilePicture.url) {
        throw new ApiError(400, "Error while uploading on avatar")
    }

   const admin = await Admin.findByIdAndUpdate(
        req.admin?._id,
        {
            $set: {
                profilePicture: profilePicture.url
            }
        },
        {new: true}
    ).select("-password")
    return res
    .status(200)
    .json(new ApiResponse(200, admin, "Profile Picture updated successfully"))
})

//teacher controller through admin access
const getTeacherById = asyncHandler(async(req, res) => {
    const { id } = req.params
    const teacher = await Teacher.findById(id)
    if (!teacher) {
        throw new ApiError(404, "Teacher not found")
    }
    return res.status(200).json(
        new ApiResponse(200, teacher, "Teacher data fetched successfully")
    )
})

const getAllTeachers = asyncHandler(async (req, res) => {
    try {
        const teachers = await Teacher.find({}, "-password -refreshToken");
        const teachersData = teachers.map((teacher) => {
            return {
                id: teacher._id,
                name: teacher.name,
                email: teacher.email,
                address: teacher.address,
                phone: teacher.phone,
                bio: teacher.bio,
                course: teacher.course,
                shift: teacher.shift,
                profilePicture: teacher.profilePicture
            };
        });
        return res.status(200).json(
            new ApiResponse(200, teachersData, "All teachers data fetched successfully")
        )
    } catch (error) {
        throw new ApiError(500, "Something went wrong while getting all teachers data");
    }
});


const registerTeacher = asyncHandler(async (req, res) => {
    // get teacher details from frontend
    const { name, email, address, password, phone, bio, course, shift } = req.body

    // validation - not empty
    if ([name, email, address, password, phone, bio, course, shift].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    // check if account already exists - email
    const existedTeacher = await Teacher.findOne({ email })
    if (existedTeacher) {
        throw new ApiError(409, "Teacher with this email already exists")
    }

    //check if account already exist - phone number
    const existedTeacherWithNumber = await Teacher.findOne({ phone })
    if (existedTeacherWithNumber) {
        throw new ApiError(409, "Teacher with this phone number already exists")
    }

    // check for profile picture
    const profilePictureLocalPath = req.files?.profilePicture[0]?.path;
    if (!profilePictureLocalPath) {
        throw new ApiError(400, "Profile picture is required")
    }

    // upload profile picture to cloudinary
    const profilePicture = await uploadOnCloudinary(profilePictureLocalPath)

    if (!profilePicture) {
        throw new ApiError(500, "Failed to upload profile picture")
    }

    // create teacher object - create entry in db
    const teacher = await Teacher.create({
        name,
        email,
        address,
        password,
        phone,
        bio,
         course,
          shift,
        profilePicture: profilePicture.url
    })

    // check for teacher creation - remove password and refresh token field from response
    const createdTeacher = await Teacher.findById(teacher._id).select("-password -refreshToken")

    if (!createdTeacher) {
        throw new ApiError(500, "Failed to create teacher")
    }

    // return response
    return res.status(201).json(
        new ApiResponse(200, createdTeacher, "Teacher created successfully")
    )
})

const updateTeacherDetails = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const { name, email, phone, address, bio, course, shift } = req.body;

    if (!name || !email || !phone || !address || !bio || !course || !shift) {
        throw new ApiError(400, "All fields are required")
    }

    const teacher = await Teacher.findByIdAndUpdate(
        id,
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

const deleteTeacher = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const teacher = await Teacher.findByIdAndDelete(id);
    if (!teacher) {
        throw new ApiError(404, "Teacher not found");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, teacher, "Teacher deleted successfully"));

});

//Student controller through admin access
const getStudentById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const student = await Student.findById(id).populate('faculty', 'id name');
    if (!student) {
        throw new ApiError(404, "Student not found");
    }
    const studentData = {
        id: student._id,
        name: student.name,
        email: student.email,
        address: student.address,
        phone: student.phone,
        shift: student.shift,
        dob: student.dob,
        gender: student.gender,
        nationality: student.nationality,
        faculty: student.faculty,
        rollNo: student.rollNo,
        emergencyContact: student.emergencyContact,
        bloodGroup: student.bloodGroup,
        admissionYear: student.admissionYear,
        guardianName: student.guardianName,
        guardianRelation: student.guardianRelation,
        guardianPhone: student.guardianPhone,
        totalFee: student.totalFee
    };
    return res.status(200).json(
        new ApiResponse(200, studentData, "Student data fetched successfully")
    );
});


const getAllStudents = asyncHandler(async (req, res) => {
    try {
        const students = await Student.find({}, "-password -refreshToken").populate('faculty', 'id name');
        const studentsData = students.map((student) => {
            return {
                id: student._id,
                name: student.name,
                email: student.email,
                address: student.address,
                phone: student.phone,
                shift: student.shift,
                dob: student.dob,
                gender: student.gender,
                nationality: student.nationality,
                faculty: student.faculty, 
                rollNo: student.rollNo,
                emergencyContact: student.emergencyContact,
                bloodGroup: student.bloodGroup,
                admissionYear: student.admissionYear,
                guardianName: student.guardianName,
                guardianRelation: student.guardianRelation,
                guardianPhone: student.guardianPhone,
                totalFee: student.totalFee
            };
        });
        return res.status(200).json(
            new ApiResponse(200, studentsData, "All students data fetched successfully")
        )
    } catch (error) {
        throw new ApiError(500, "Something went wrong while getting all students data");
    }
});



const registerStudent = asyncHandler(async (req, res) => {
    // get student details from frontend
    const { name, email, address, password, phone, shift, dob, gender, nationality, faculty, rollNo, emergencyContact, bloodGroup, admissionYear, guardianName, guardianRelation, guardianPhone, totalFee } = req.body

    // validation - not empty
    if ([name, email, address, password, phone, shift, dob, gender, nationality, faculty, rollNo, emergencyContact, bloodGroup, admissionYear, guardianName, guardianRelation, guardianPhone, totalFee].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    // check if account already exists - email
    const existedStudent = await Student.findOne({ email })
    if (existedStudent) {
        throw new ApiError(409, "Student with this email already exists")
    }
    // check if account already exists - phone number
    const existedStudentWithPhone = await Student.findOne({ phone })
    if (existedStudentWithPhone) {
        throw new ApiError(409, "Student with this phone number already exists")
    }

    // create teacher object - create entry in db
    const student = await Student.create({
        name,
        email,
        address,
        password,
        phone,
        shift,
        dob,
        gender,
        nationality,
        faculty,
        rollNo,
        emergencyContact,
        bloodGroup,
        admissionYear,
        guardianName,
        guardianRelation,
        guardianPhone,
        totalFee
    })

    // check for student creation - remove password and refresh token field from response
    const createdStudent = await Student.findById(student._id).select("-password -refreshToken")

    if (!createdStudent) {
        throw new ApiError(500, "Failed to create student")
    }

    // return response
    return res.status(201).json(
        new ApiResponse(200, createdStudent, "Student created successfully")
    )
})

const updateStudentDetails = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const { name, email, phone, address, shift, dob, gender, nationality, faculty, rollNo, emergencyContact, bloodGroup, admissionYear, guardianName, guardianRelation, guardianPhone, totalFee } = req.body;

    if (!name || !email || !phone || !address || !shift || !dob || !gender  || !nationality || !faculty || !rollNo || !emergencyContact || !bloodGroup || !admissionYear || !guardianName || !guardianRelation || !guardianPhone || !totalFee) {
        throw new ApiError(400, "All fields are required")
    }

    const student = await Student.findByIdAndUpdate(
        id,
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
                guardianPhone: guardianPhone,
                totalFee: totalFee
            }
        },
        { new: true }
    ).select("-password")

    return res
        .status(200)
        .json(new ApiResponse(200, student, "Account details updated successfully"))
})

const deleteStudent = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const student = await Student.findByIdAndDelete(id);
    if (!student) {
        throw new ApiError(404, "Student not found");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, student, "Student deleted successfully"));

});

export {
    registerAdmin,
    loginAdmin,
    logoutAdmin,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentAdmin,
    updateAccountDetails,
    updateProfilePicture,

    getTeacherById,
    getAllTeachers,
    registerTeacher,
    updateTeacherDetails,
    deleteTeacher,

    getStudentById,
    getAllStudents,
    registerStudent,
    updateStudentDetails,
    deleteStudent
}