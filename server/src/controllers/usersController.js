import bcrypt from "bcrypt";
import errorRes from "../helpers/errorHandler";
import successHandler from "../helpers/success";
import User from "../models/usersModel";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const passwordValidation = (password) =>
    password.length > 6 ? errorRes(res, 500, "password is too short") : true;

  const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const emailValidation = (eamil) =>
    email.match(validEmail) ? true : "your email is not valid";

  try {
    if (!passwordValidation || !emailValidation || name.length < 1) {
      errorRes(res, 500, "Check your fields and try again");
    }
    await bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        console.log("This is the error you are seearching for:", err);
        throw new Error();
      }
      const user = await User.create({
        name,
        email,
        password: hash,
      });
      await successHandler(res, 201, "Created Successfully", user);
    });
  } catch (error) {
    errorRes(res, 500, "There was problem Registering");
  }
};
