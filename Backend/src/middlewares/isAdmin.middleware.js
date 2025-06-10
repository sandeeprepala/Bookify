import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const isAdmin = asyncHandler(async (req, res, next) => {    
    // Check if the user has admin role
    if (req.user?.role !== 'admin') {
        throw new ApiError("Access denied: Admins only", 403);
    }
    next();
});
export { isAdmin };