import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    //steps
        // 1. Extract token from cookies or Authorization header
        // 2. Verify the token using the secret key
        // 3. If the token is valid, find the user by ID from the decoded token
        // 4. If the user exists, attach the user to the request object
        // 5. If any step fails, throw an ApiError with appropriate message

    try {
        // const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
        const token = req.headers.authorization?.split(" ")[1]; // Only use header for now

        if (!token) {
        throw new ApiError("Authentication token is required", 401);
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if(!decoded || !decoded._id) {
            throw new ApiError("decoded token is invalid", 401);
        }
        const user = await User.findById(decoded?._id).select("-password -refreshToken");
        if (!user) {
            throw new ApiError("User not found", 404);
        }
        req.user = user; // Attach user to request object
        next();
    } catch (error) {
        throw new ApiError("JWT verification failed: " + error.message, 401);
    }

});
