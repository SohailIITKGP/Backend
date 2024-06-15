import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true 
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";

app.use("/api/v1/users", userRouter); 

export default app;



//routes declaration 
//(ab router ko lane ke liye middle ware lana padega , kyuki chize segregate kr di hai, router ko nikal ke alg le gye hai isliye)

//http://localhost:8000/api/v1/users/register
// /user pr koi bhi ayega toh app user router ko pass in kr dega 