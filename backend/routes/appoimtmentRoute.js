import express from "express"
import { createAppintment, deleteAppintment, getAllAppintment, updateAppintment } from "../controllers/appointmentController.js";
import { isAdminAuthenticted, isPatientAuthenticated } from "../middleware/auth.js";

const appiontmentRouter=express.Router();

appiontmentRouter.post("/create",isPatientAuthenticated,createAppintment)

appiontmentRouter.get("/getAllAppointment",isAdminAuthenticted,getAllAppintment)

appiontmentRouter.put("/update/:id",isAdminAuthenticted,updateAppintment);

appiontmentRouter.delete("/delete",isAdminAuthenticted,deleteAppintment)


export default appiontmentRouter;