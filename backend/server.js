import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import RazorpayFn from "./routes/paymentRazorpay.js";

// Configure environment variables
dotenv.config();

// Database connection
connectDB();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increase limit to 10MB
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
res.send("API is running....");
})
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// Root endpoint
app.use("/razorpay", RazorpayFn);


// Port configuration
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white
  );
});

