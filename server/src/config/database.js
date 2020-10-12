import mongoose from "mongoose";
import { config } from "dotenv";
config();

const { MONGO_URL } = process.env;
const connectDb = () => {
  mongoose
    .connect(MONGO_URL, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(console.log("connected to database"));
};

export default connectDb;
