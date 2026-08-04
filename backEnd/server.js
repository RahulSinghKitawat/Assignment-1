import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./db.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cookieParser());

connectDB();

app.get("/",(req,res)=>{
    res.send("api is running..");
});

app.use("/api/auth",authRoutes);
app.use("/api/product",productRoutes);

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
});
