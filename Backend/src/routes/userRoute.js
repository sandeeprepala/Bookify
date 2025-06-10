import { Router } from "express";
import { registerUser,loginUser,LogoutUser,getUserDetails } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(verifyJWT, LogoutUser);
userRouter.route("/profile").get(verifyJWT, getUserDetails);

export default userRouter;