import { Router } from "express"
import { loginStudent, logoutStudent, refreshAccessToken, changeCurrentPassword, getCurrentStudent, updateAccountDetails } from "../controllers/student.controller.js"
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/studentAuth.middleware.js"

const router = Router()

router.route("/login").post(loginStudent)

//secured routes
router.route("/logout").post(verifyJWT, logoutStudent)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentStudent)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)

export default router