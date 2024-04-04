import { Router } from "express"
import { loginAdmin, logoutAdmin, registerAdmin, refreshAccessToken, changeCurrentPassword, getCurrentAdmin, updateAccountDetails, updateProfilePicture } from "../controllers/admin.controller.js"
import {upload} from "../middlewares/multer.middleware.js"
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

export default router