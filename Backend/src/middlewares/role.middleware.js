import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";

export const roleMiddleware = (...roles) => {
    return (req,res,next)=>{
        const userRole = req.user?.role; // Assuming userRole is set in the request object by an authentication middleware
        if(!userRole || !roles.includes(userRole)){
            // If the user role is not set or does not match the required roles, throw an error
            throw new ApiError("Unauthorized", 403);
        }
        next();
    }
}