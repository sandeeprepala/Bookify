
/*
In Express, if an async function throws an error (like in await db.save()), it won't automatically go to your error handler.
 You’d have to use try/catch in every route. This helper saves you from writing repetitive try/catch blocks.
*/
// utils/asyncHandler.js
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export { asyncHandler };

