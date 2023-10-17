import express  from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import adminRoute from "./routes/adminRoute.js";



const app=express();
app.use(cors());
app.use(express.json());
const port=3000;

app.use("/admin", adminRoute);
app.use("/user", userRoute);

mongoose.connect('mongodb+srv://yash:kanta329@cluster0.hqqebvf.mongodb.net/courses');
app.listen(port,()=>{console.log(`you are listing to port ${port}`)});