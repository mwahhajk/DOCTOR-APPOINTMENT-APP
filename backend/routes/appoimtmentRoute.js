import express from "express"
import { createAppintment, deleteAppintment, getAllAppintment, updateAppintment } from "../controllers/appointmentController.js";
import { isPatientAuthenticated } from "../middleware/auth.js";

const appiontmentRouter=express.Router();

appiontmentRouter.post("/create",isPatientAuthenticated,createAppintment)

appiontmentRouter.get("/getAllAppointment",getAllAppintment)

appiontmentRouter.put("/update",updateAppintment);

appiontmentRouter.delete("/delete",deleteAppintment)


export default appiontmentRouter;