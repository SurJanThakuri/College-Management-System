import { Router } from "express";
import { getRoutineById, getAllRoutines, addRoutine, updateRoutineDetails, deleteRoutine } from "../controllers/routine.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/adminAuth.middleware.js";

const router = Router()

router.route("/").get(verifyJWT, getAllRoutines)
router.route("/:id").get(verifyJWT, getRoutineById)
router.route("/add").post(
    verifyJWT,
    upload.fields([
        {
            name: "routineImage",
            maxCount: 1
        }
    ]),
    addRoutine
)
router.route("/update/:id").patch(verifyJWT, updateRoutineDetails)
router.route("/delete/:id").delete(verifyJWT, deleteRoutine)

export default router