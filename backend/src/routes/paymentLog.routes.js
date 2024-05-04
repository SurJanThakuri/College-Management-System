import { Router } from "express";
import { getPaymentLogById, getPaymentLogsByStudentId, getAllPaymentLogs, addPaymentLog, updatePaymentLogDetails, deletePaymentLog } from "../controllers/paymentLog.controller.js";
import { verifyJWT } from "../middlewares/adminAuth.middleware.js";

const router = Router()

router.route("/").get(verifyJWT, getAllPaymentLogs)
router.route("/:id").get(verifyJWT, getPaymentLogById)
router.route("/student/:id").get(verifyJWT, getPaymentLogsByStudentId)
router.route("/add").post(verifyJWT, addPaymentLog)
router.route("/update/:id").patch(verifyJWT, updatePaymentLogDetails)
router.route("/delete/:id").delete(verifyJWT, deletePaymentLog)

export default router