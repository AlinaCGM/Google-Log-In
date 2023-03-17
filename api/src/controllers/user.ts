import { Request, Response } from "express";
import UserServices from "../services/user";
import jwt from "jsonwebtoken";
import User, { UserDocument } from "../models/User";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

export const getUserByIdController = async (
  request: Request,
  response: Response
) => {
  {
    try {
      const userIdFromRequest = request.params.userId;
      const userInfo = await UserServices.getUserById(userIdFromRequest);
      if (!userInfo) {
        response.json({ message: `No user with id ${request.params.userId}` });
        return;
      }
      response.json(userInfo);
    } catch (error) {
      console.log(error);
    }
  }
};
export const createUserController = async (
  request: Request,
  response: Response
) => {
  try {
    const { email, password, firstName, lastName } = request.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return response.status(400).json("This email is already registered");
    }
    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      age: request.body.age,
      email: email,
    });
    const user = await UserServices.createUser(newUser);

    response.status(200).json({
      _id: user._id,
      userName: user.firstName,
      email: user.email,
    });
  } catch (err) {
    response.status(500).json("Server error");
  }
};
export const updateUserController = async (
  request: Request,
  response: Response
) => {
  try {
    const newInformation = request.body;
    const userId = request.params.userId;
    const newUser = await UserServices.updateUserById(userId, newInformation);
    response.json(newUser);
  } catch (error) {
    console.log(error);
  }
};

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

export const logInWithPasswordController = async (
  request: Request,
  response: Response
) => {
  try {
    const userData = await UserServices.findUserByEmail(request.body.email);
    if (!userData) {
      response.json({ message: `cant find user ${request.body.email}` });
      return;
    }
    const token = jwt.sign(
      {
        email: request.body.email,
        _id: userData._id,
        firstName: userData.firstName,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    response.json({ userData, token });
  } catch (error) {
    console.log(error);
  }
};
//
export const googleAuthenticateController = async (
  request: Request,
  response: Response
) => {
  try {
    //access data from passport:done(null,user)
    console.log(request, "request");
    const userData = request.user as UserDocument;

    if (!userData) {
      response.json({ message: "Can't find user with the email" });
      return;
    }
    const token = jwt.sign(
      {
        email: request.body.email,
        firstName: userData.firstName,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    response.json({ token, userData });
  } catch (error) {
    console.log(error);
  }
};
