import express from 'express';
import { createTheatre, getAllTheatres,getTheatreById } from '../controllers/theatre.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { isAdmin } from '../middlewares/isAdmin.middleware.js';
const theatreRouter = express.Router();

// Implement routes for theatre-related operations here

theatreRouter.post('/',verifyJWT, isAdmin, createTheatre);
theatreRouter.get('/:theatreId', getTheatreById);
theatreRouter.get('/',getAllTheatres);

export default theatreRouter;