import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

export const login = async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await User.find({ email });
  if (foundUser) {
    try {
      await bcrypt.compare(password, foundUser[0].password, (err, result) => {
        if (err) {
          errorRes(res, 500, "invalid password ");
        }
        if (result) {
          const token = jwt.sign(
            { email: foundUser[0].email, id: foundUser[0]._id },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );
          successHandler(res, 200, "succesfull loged in", {
            user: foundUser,
            token,
          });
        }
      });
    } catch (error) {
      errorRes(res, 500, "Failed to login");
    }
  } else {
    errorRes(res, 404, "Email or password is invalid");
  }
};
