import mongoose from "mongoose";
import dotenv from "dotenv";

import app from "./app";

dotenv.config();

const port = 8000;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL as string)
  .then(() => {
    app.listen(port, () =>
      console.log(`The server is running on port ${port}`)
    );
  })
  .catch((error: Error) => {
    console.log("MongoDB connection error" + error);
    process.exit(1);
  });
