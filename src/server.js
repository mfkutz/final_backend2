import express from "express";
import morgan from "morgan";
import routes from "./routes/index.js";
import { config } from "./config/config.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.SIGN_COOKIE_SECRET));
app.use(morgan("dev"));

initializePassport();
app.use(passport.initialize());

app.use("/api", routes);
app.use((req, res) => {
  res
    .status(404)
    .json({ error: "Not found", message: "The requested URL was not found on the server." });
});

app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
