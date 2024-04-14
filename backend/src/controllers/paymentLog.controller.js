import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { PaymentLog } from "../models/paymentLog.model.js"

const getPaymentLogById = asyncHandler( async(req, res) => {
    const { id } = req.params
    const paymentLog = await PaymentLog.findById(id).populate('studentName', 'id name').populate('faculty', 'id name');
    if (!paymentLog) {
        throw new ApiError(404, "Payment Log not found")
    }
    return res.status(200).json(
        new ApiResponse(200, paymentLog, "Payment Log data fetched successfully")
    )
});

const getAllPaymentLogs = asyncHandler(async (req, res) => {
    try {
        const paymentLogs = await PaymentLog.find({}).populate('studentName', 'id name').populate('faculty', 'id name');
        return res.status(200).json(
            new ApiResponse(200, paymentLogs, "All payment logs data fetched successfully")
        )
    } catch (error) {
        throw new ApiError(500, "Something went wrong while getting all payment logs data");
    }
});

const addPaymentLog = asyncHandler(async (req, res) => {
    const { date, studentName, faculty, semester, amount } = req.body

    if ([date, studentName, faculty, semester, amount].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const createdPaymentLog = await PaymentLog.create({
        date,
        studentName,
        faculty,
        semester,
        amount,
    })

    return res.status(201).json(
        new ApiResponse(201, createdPaymentLog, "Payment Log created successfully")
    )
})

const updatePaymentLogDetails = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const { date, studentName, faculty, semester, amount } = req.body;

    if (!date || !studentName || !faculty || !semester || !amount) {
        throw new ApiError(400, "All fields are required")
    }

    const paymentLog = await PaymentLog.findByIdAndUpdate(
        id,
        {
            $set: {
                date: date,
                studentName: studentName,
                faculty: faculty,
                semester: semester,
                amount: amount
            }
        },
        { new: true }
    )
    return res
        .status(200)
        .json(new ApiResponse(200, paymentLog, "Payment Log details updated successfully"))
})

const deletePaymentLog = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const paymentLog = await PaymentLog.findByIdAndDelete(id);
    return res
        .status(200)
        .json(new ApiResponse(200, paymentLog, "Payment Log deleted successfully"))
})


export {
    getPaymentLogById,
    getAllPaymentLogs,
    addPaymentLog,
    updatePaymentLogDetails,
    deletePaymentLog
}