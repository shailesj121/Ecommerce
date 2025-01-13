import crypto from 'crypto';
import orderModel from '../models/orderModel.js';

// Razorpay configuration
const RazorpaySuccessFn = async (req, res) => {
const {userId} = req.body
    const {razorpay_payment_id, razorpay_order_id, razorpay_signature} = req.body.response
    const produtsId = req.body.getProductsId
// Replace with actual values   
const razorpayOrderId = razorpay_order_id;
const razorpayPaymentId = razorpay_payment_id;
const signature = razorpay_signature;
const secret = process.env.RAZORPAY_KEY_SECRET;

// Signature verification logic
const body = razorpayOrderId + "|" + razorpayPaymentId;
const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body.toString())
    .digest('hex');

if (expectedSignature === signature) {
    console.log("Payment verified successfully");
    for(let i=0; i < produtsId.length; i++){
        const order = new orderModel({
            products: produtsId[i],
            payment: "paid",
            buyer: userId,
            // status: "paid",
          }).save();
          
    }
    res.send({
        success: true,
        status: "Paid"
    })
    
        //   order.updateOne({ orderId: razorpayOrderId }, { status: 'Paid' })
    // .then(() => {console.log("Order status updated successfully")
    //     res.send({
    //         success: true,
    //         status: "Paid"
    //     })
    // })
    // .catch(err => console.error("Error updating order status:", err));
    
} else {
    console.error("Payment verification failed");
    res.send({
        success: false
    })
}
};

export default RazorpaySuccessFn;



