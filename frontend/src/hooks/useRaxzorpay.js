import axios from "axios";

function useRazorpay() {
    
  const startRazorpay = async (event, amount, productsId) => {
    event.preventDefault(); // Ensure event is handled properly
    const getProductsId = await productsId
    const amountInPaise = amount * 100;
    try {
      const res = await axios.post("http://localhost:8080/razorpay/payment", {
        amount: amountInPaise,
      });
      console.log(res)

      if (res && res.data.success) {
        const { id, currency } = res.data;
        const { name, email, phone, address, _id: userId } = JSON.parse(
          localStorage.getItem("auth")
        ).user;
      

        let options = {
          key: "rzp_test_uh338IdAwl8yi4",
          amount: amountInPaise,
          currency: currency,
          name,
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          order_id: id,
          handler: async function (response) {
            const paymentRes = await axios.post(
              "http://localhost:8080/razorpay/checkPayment",
              { response, userId, getProductsId}
            );
            if (paymentRes.data.success) {
              localStorage.removeItem("cart");
              window.location.href = "/dashboard/user/orders";
            }
          },
          prefill: {
            name,
            email,
            contact: phone,
            address,
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {
          alert(response.error.description);
        });

        rzp1.open();
      }
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  return startRazorpay;
}

export default useRazorpay;
