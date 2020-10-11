import express, { json } from "express";
import { config } from "dotenv";
import cors from "cors";
import morgan from "morgan";
import blogRouter from "./routes/blogRouter";
import usersRouter from "./routes/usersRouter";
import connectDb from "./config/database";
import errorRes from "./helpers/errorHandler";

config();
const app = express();
app.use(json());
app.use(cors());
app.use(morgan("dev"));
connectDb();

app.use("/superblog", blogRouter);
app.use("/users", usersRouter);

app.use((req, res) => {
  errorRes(res, 404, "not found");
});

const port = process.env.PORT;
app.listen(port, console.log("Server is running on port:", port));
