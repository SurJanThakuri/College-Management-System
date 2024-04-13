import { Router } from "express";
import { getAllFaculties, getFacultyById, addFaculty, updateFacultyDetails, updateCoverImage, updateCourseStructImg, deleteFaculty } from "../controllers/faculty.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/adminAuth.middleware.js";

const router = Router()

router.route("/").get(verifyJWT, getAllFaculties)
router.route("/:id").get(verifyJWT, getFacultyById)
router.route("/add").post(
    verifyJWT,
    upload.fields([
        {
            name: "courseStructureImg",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    addFaculty
)
router.route("/update/:id").patch(verifyJWT, updateFacultyDetails)
router.route("/update-cover-image/:id").patch(verifyJWT, upload.single("coverImage"), updateCoverImage)
router.route("/update-course-struct-image/:id").patch(verifyJWT, upload.single("courseStructureImg"), updateCourseStructImg)
router.route("/delete/:id").delete(verifyJWT, deleteFaculty)

export default router