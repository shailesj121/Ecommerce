import express from "express";
import RazorpayFn from "../config/razorpay.js";
import RazorpaySuccessFn from "../config/razorpaySuccess.js"


//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/payment", RazorpayFn);
router.post("/checkPayment", RazorpaySuccessFn)

export default router