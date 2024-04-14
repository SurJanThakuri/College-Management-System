import { Router } from "express";
import { getNoticeById, getAllNotices, addNotice, updateNoticeDetails, deleteNotice } from "../controllers/notice.controller.js";
import { verifyJWT } from "../middlewares/adminAuth.middleware.js";

const router = Router()

router.route("/").get(verifyJWT, getAllNotices)
router.route("/:id").get(verifyJWT, getNoticeById)
router.route("/add").post(verifyJWT, addNotice)
router.route("/update/:id").patch(verifyJWT, updateNoticeDetails)
router.route("/delete/:id").delete(verifyJWT, deleteNotice)

export default router