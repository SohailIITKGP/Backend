import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from './routes/user.routes.js'

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true 
}));

app.use(express.json({ limit: "20mb" })); // Adjust the limit as per your requirement
app.use(express.urlencoded({ extended: true, limit: "20mb" })); // Adjust the limit as per your requirement
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1/users", userRouter); 

// Error handling middleware for JSON parsing errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    // Handle JSON parsing error
    return res.status(400).json({ error: "Invalid JSON" });
  }
  next();
});

export default app;








//routes declaration 
//(ab router ko lane ke liye middle ware lana padega , kyuki chize segregate kr di hai, router ko nikal ke alg le gye hai isliye)

//http://localhost:8000/api/v1/users/register
// /user pr koi bhi ayega toh app user router ko pass in kr dega 