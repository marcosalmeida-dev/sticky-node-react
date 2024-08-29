import express, { Router } from "express";
import { registerUser, loginUser } from "../controllers/authController";
import { body } from "express-validator";

const router: Router = express.Router();

router.post(
  /*
            #swagger.tags = ['Auth']
            #swagger.summary = 'Register User'
            #swagger.description = 'This endpoint will register the user'
  */
  "/auth/register",
  [
    body("username")
      .isLength({ min: 4 })
      .withMessage("Username must be at least 4 characters long"),
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  registerUser
);

router.post(
  /*
            #swagger.tags = ['Auth']
            #swagger.summary = 'Login User'
            #swagger.description = 'This endpoint will login the user'
  */
  "/auth/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password").exists().withMessage("Password is required"),
  ],
  loginUser
);

export default router;
