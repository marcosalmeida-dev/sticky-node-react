import express, { Router } from "express";
import {
  createSticky,
  getStickies,
  getStickyById,
  updateSticky,
  deleteSticky,
} from "../controllers/stickyController";
import { authenticateJWT } from "../middlewares/authMiddleware";

const router: Router = express.Router();

router.get(
  /*
            #swagger.tags = ['Sticky Notes']
            #swagger.summary = 'Get all sticky notes'
            #swagger.description = 'This endpoint retrieves a list of all sticky notes'
  */
  "/sticky/list", 
  getStickies
);

router.get(
  /*
            #swagger.tags = ['Sticky Notes']
            #swagger.summary = 'Get sticky note by ID'
            #swagger.description = 'This endpoint retrieves a sticky note by its ID'
  */
  "/sticky/:id/get", 
  getStickyById
);

router.post(
  /*
            #swagger.tags = ['Sticky Notes']
            #swagger.summary = 'Create a new sticky note'
            #swagger.description = 'This endpoint allows authenticated users to create a new sticky note'
  */
  "/sticky/create", 
  authenticateJWT, 
  createSticky
);

router.put(
  /*
            #swagger.tags = ['Sticky Notes']
            #swagger.summary = 'Update sticky note by ID'
            #swagger.description = 'This endpoint allows authenticated users to update an existing sticky note by its ID'
  */
  "/sticky/:id/update", 
  authenticateJWT, 
  updateSticky
);

router.delete(
  /*
            #swagger.tags = ['Sticky Notes']
            #swagger.summary = 'Delete sticky note by ID'
            #swagger.description = 'This endpoint allows authenticated users to delete a sticky note by its ID'
  */
  "/sticky/:id/delete", 
  authenticateJWT, 
  deleteSticky
);

export default router;
