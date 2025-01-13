import Razorpay from "razorpay";


// Razorpay configuration
const RazorpayFn = async(req, res)=>{
  const{amount} = req.body;
const razorpayment = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  // console.log(razorpayment.orders);
  
  const orderIn = {
    amount: amount, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
    payment_capture: 1,
  }
  razorpayment.orders.create(orderIn, (err, order) => {
    if (err) {
      console.log(err);
    } else {
      console.log(order)
      order? res.send({...order, success: true}): res.send('empty');
    }
  });

  
}

export default RazorpayFn;