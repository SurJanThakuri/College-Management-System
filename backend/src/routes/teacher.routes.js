import { Router } from "express"
import {
 loginTeacher, logoutTeacher, refreshAccessToken, changeCurrentPassword, getCurrentTeacher, updateAccountDetails, updateProfilePicture
} from "../controllers/teacher.controller.js"
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/teacherAuth.middleware.js"

const router = Router()

router.route("/login").post(loginTeacher)

//secured routes
router.route("/logout").post(verifyJWT, logoutTeacher)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentTeacher)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)
router.route("/profile-picture").patch(verifyJWT, upload.single("profilePicture"), updateProfilePicture)

export default router