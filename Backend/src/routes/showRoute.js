import express from 'express';
import {
  addShowToTheatre,
  getShowsByTheatre,
  updateShow,
  deleteShow
} from '../controllers/show.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { isAdmin } from '../middlewares/isAdmin.middleware.js';
const showRouter = express.Router();
// Add a new show to a theatre
showRouter.post('/:theatreId', verifyJWT, isAdmin, addShowToTheatre);
// Get all shows of a theatre
showRouter.get('/:theatreId', verifyJWT, getShowsByTheatre);
// Update a specific show in a theatre
showRouter.put('/:theatreId/:showId', verifyJWT, isAdmin, updateShow);
// Delete a specific show in a theatre
showRouter.delete('/:theatreId/:showId', verifyJWT, isAdmin, deleteShow);

export default showRouter;
