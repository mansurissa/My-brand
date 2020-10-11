import express from "express";
import { register } from "../controllers/usersController";

const usersRouter = express.Router();
usersRouter.route("/register").post(register);
export default usersRouter;
