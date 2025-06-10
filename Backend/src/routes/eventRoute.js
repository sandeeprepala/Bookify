import { getAllEventsForUsers } from "../controllers/event.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {deleteEvent} from "../controllers/admin.controller.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";
const eventRouter = Router();

eventRouter.route("/").get(verifyJWT, getAllEventsForUsers);
eventRouter.route("/delete-event/:eventId").delete(verifyJWT, isAdmin, deleteEvent);

export default eventRouter;
