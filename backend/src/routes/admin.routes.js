import { Router } from "express"
import { loginAdmin, logoutAdmin, registerAdmin, refreshAccessToken, changeCurrentPassword, getCurrentAdmin, updateAccountDetails, updateProfilePicture, updateTeacherDetails, registerTeacher, getTeacherById, getAllTeachers, deleteTeacher } from "../controllers/admin.controller.js"
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/adminAuth.middleware.js"

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "profilePicture",
            maxCount: 1
        }
    ]),
    registerAdmin
)

router.route("/login").post(loginAdmin)

//secured routes
router.route("/logout").post(verifyJWT, logoutAdmin)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentAdmin)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)
router.route("/profile-picture").patch(verifyJWT, upload.single("profilePicture"), updateProfilePicture)

//teacher routes through admin access
router.route("/teacher/register").post(
    verifyJWT,
    upload.fields([
        {
            name: "profilePicture",
            maxCount: 1
        }
    ]),
    registerTeacher
)

router.route("/teachers/:id").get(verifyJWT, getTeacherById)
router.route("/teachers").get(verifyJWT, getAllTeachers)
router.route("/update-teacher/:id").patch(verifyJWT, updateTeacherDetails)
router.route("/delete-teacher/:id").delete(verifyJWT, deleteTeacher)

export default router