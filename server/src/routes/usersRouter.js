import express from "express";
import { login, register } from "../controllers/usersController";

const usersRouter = express.Router();
usersRouter.route("/register").post(register);
usersRouter.route("/login").post(login);
export default usersRouter;
