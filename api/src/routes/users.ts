// user router here
import Router from "express";
import passport from "passport";

import {
  createUserController,
  googleAuthenticateController,
  logInWithPasswordController,
  updateUserController,
} from "../controllers/user";

const router = Router();

// router.post("/", createUserController);
// router.post("/login", logInWithPasswordController);
// router.put(
//   "/:userId",
//   passport.authenticate("jwt", { session: false }),
//   updateUserController
// );
router.post(
  "/google-authenticate",
  passport.authenticate("google-id-token", { session: false }),
  googleAuthenticateController
);

export default router;
