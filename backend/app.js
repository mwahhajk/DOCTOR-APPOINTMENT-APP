import express, { urlencoded } from "express"
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnect } from "./database/dbConnection.js";
import userRouter from "./routes/userRoute.js";
import { errorMiddleware } from "./middleware/error.js";
import messageRouter from "./routes/messageRoute.js";
import appiontmentRouter from "./routes/appoimtmentRoute.js";
import fileUpload from "express-fileupload";

const app=express();

config({path:"./config/config.env"})

app.use(cors({
    origin:[process.env.DRONTEND_URL,process.env.DASHBOARD_URL],
    methods:["GET","POST","PUT","DELETE"],
    credientials:true
}))

app.use(cookieParser())
app.use(express.json())
app.use(urlencoded({extended:true}))

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// User Routes
app.use("/api/v1/user/",userRouter)

// message routes

app.use("/api/v1/message/",messageRouter)

// appointment route

app.use("/api/v1/appointment/",appiontmentRouter)

dbConnect();

app.use(errorMiddleware)

export default app;