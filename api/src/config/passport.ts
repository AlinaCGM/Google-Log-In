// google passport here
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";
import GoogleTokenStrategy from "passport-google-id-token";

import UserServices from "../services/user";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;
const CLIENT_ID = process.env.CLIENT_ID as string;
export const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: JWT_SECRET,
    //the token is taken from the user and check if its maches to the one in DB
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload, done) => {
    const email = payload.email;
    const foundUser = await UserServices.findUserByEmail(email);
    if (!foundUser) {
      return "no user";
    }
    done(null, foundUser);
  }
);

//google authenticate
//name:passport-google-id-token
export const googleStrategy = new GoogleTokenStrategy(
  { clientID: CLIENT_ID },
  //parsedToken: all the userInfo
  //done function: 1.this midle ware is done, you can go to controller 2.to send all we are passing
  async function (parsedToken, googleId: string, done) {
    console.log(parsedToken, "parsedToken");
    const userPayload = {
      //email
      //create new user
      firstName: parsedToken.payload.given_name,
      lastName: parsedToken.payload.family_name,
      email: parsedToken.payload.email,
    };
    //createOrFindByEmail
    const user = await UserServices.createOrFindUserByEmail(userPayload);
    done(null, user);
  }
);
