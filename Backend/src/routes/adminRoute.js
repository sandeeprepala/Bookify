import { Router } from "express";
import { createEvent, editEvent, getAllEventsForAdmins,totalEventWiseRevenue } from "../controllers/admin.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const adminRouter = Router();
adminRouter.route("/create-event").post(verifyJWT, isAdmin ,upload.single("coverImage"), createEvent);
adminRouter.route("/edit-event/:eventId").put(verifyJWT, isAdmin, upload.single("coverImage"), editEvent);

adminRouter.route("/events").get(verifyJWT, isAdmin, getAllEventsForAdmins);
// adminRouter.route("/events").get(verifyJWT, isAdmin, getAllEventsForUsers);
adminRouter.route('/revenue').post(verifyJWT, isAdmin, totalEventWiseRevenue);

export default adminRouter;