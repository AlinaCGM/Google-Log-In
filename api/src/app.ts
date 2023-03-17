import Express from "express";
import cors from "cors";

import userRouter from "./routes/users";
import passport from "passport";
import { jwtStrategy, googleStrategy } from "./config/passport";

const app = Express();

app.use(Express.json());

app.use(cors());
app.use(passport.initialize());
passport.use(jwtStrategy);
passport.use(googleStrategy);

app.use("/users", userRouter);

export default app;
