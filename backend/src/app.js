import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes - import
import adminRouter from "./routes/admin.routes.js"
import teacherRouter from "./routes/teacher.routes.js"
import studentRouter from "./routes/student.routes.js"
import facultyRouter from "./routes/faculty.routes.js"
import paymentLogRouter from "./routes/paymentLog.routes.js"
import noticeRouter from "./routes/notice.routes.js"

//routes declaration
app.use("/api/v1/admins", adminRouter)
app.use("/api/v1/teachers", teacherRouter)
app.use("/api/v1/students", studentRouter)
app.use("/api/v1/admin/faculties", facultyRouter)
app.use("/api/v1/admin/payment-logs", paymentLogRouter)
app.use("/api/v1/admin/notices", noticeRouter)

export { app }