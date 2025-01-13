import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import useRazorpay from "../hooks/useRaxzorpay";



const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const razorpayFn = useRazorpay();

  const getProductsId = async () => {
    const products = await JSON.parse(
      localStorage.getItem("cart")
    );
    return products.map((product) => product._id);
  }


 
  // Total price calculation
  const totalPrice = () => {
    if (!cart || !Array.isArray(cart)) return "₹0.00"; // Handle invalid or missing cart
  
    const total = cart.reduce((sum, item) => {
      return sum + (item.price || 0); // Add price or 0 if price is missing
    }, 0);
   
    return total.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  };

  const totalPriceAmounnt = () => {
    if (!cart || !Array.isArray(cart)) return "₹0.00"; // Handle invalid or missing cart
  
    const total = cart.reduce((sum, item) => {
      return sum + (item.price || 0); // Add price or 0 if price is missing
    }, 0);
    return total
  };

  // Remove item from cart
  const removeCartItem = (pid) => {
    const myCart = cart.filter((item) => item._id !== pid);
    setCart(myCart);
    localStorage.setItem("cart", JSON.stringify(myCart));
  };

  // Get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/product/braintree/token");
      console.log("Client Token:", data?.clientToken); // Debug log
      setClientToken(data?.clientToken);
    } catch (error) {
      console.error("Failed to fetch client token:", error); // Debug log
    }
  };

  // useEffect(() => {
  //   // getToken();
  // }, [auth?.token]);


  // Handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("http://localhost:8080/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.error("Payment error:", error.response ? error.response.data : error.message); // Detailed error log
      setLoading(false);
      toast.error("Payment failed. Please try again."); // Notify the user of failure
    }
  };
  

  return (
    <Layout>
      <div className="container-fluid" style={{ background: "linear-gradient(90deg, #CC95C0, #DBD4B4, #7AA1D2)", paddingTop: '5rem' }}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout"}`
                : " Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row mb-2 p-3 card flex-row" key={p._id}>
                <div className="col-md-4">
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="100px"
                    height={"100px"}
                  />
                </div>
                <div className="col-md-8">
                  <p>{p.name}</p>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>Price: {p.price}</p>
                  <button className="btn btn-danger" onClick={() => removeCartItem(p._id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total: {totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button className="btn btn-secondary" onClick={() => navigate("/dashboard/user/profile")}>Update Address</button>
                  <div>
                  <button id="rzp-button1" className="btn btn-secondary" onClick={(event)=>razorpayFn(event, totalPriceAmounnt(), getProductsId())} >Pay</button>
                  </div>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button className="btn btn-outline-warning" onClick={() => navigate("/dashboard/user/profile")}>Update Address</button>
                  
                ) : (
                  <button className="btn btn-outline-warning" onClick={() => navigate("/login", { state: "/cart" })}>Please Login to checkout</button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => {
                      console.log("DropIn Instance:", instance); // Debug log
                      setInstance(instance);
                    }}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
