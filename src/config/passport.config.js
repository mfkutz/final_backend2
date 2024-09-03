import passport from "passport";
import jwt from "passport-jwt";
import localStrategy from "passport-local";
import { userRepository } from "../repository/index.js";
import { verifyPassword, createHash } from "../utils/hash.functions.js";
import { config } from "../config/config.js";

const LocalStrategy = localStrategy.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

function initializePassport() {
  const cookieExtractor = (req, res) => {
    return req && req.cookies ? req.cookies.token : null;
  };

  // JWT Strategy
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([
          ExtractJWT.fromAuthHeaderAsBearerToken(),
          cookieExtractor,
        ]),
        secretOrKey: config.JWT_SECRET,
      },
      async (payload, done) => {
        try {
          const user = await userRepository.findOne({ email: payload.email }, { password: 0 });

          if (!user) {
            return done({ message: "User not found", status: 401 });
          }

          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
  //Login Strategy
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        try {
          const user = await userRepository.findOne({ email });

          if (!user) {
            return done(null, false, { message: "User not found" });
          }

          const isPasswordCorrect = await verifyPassword(password, user.password);

          if (!isPasswordCorrect) {
            return done(null, false, { message: "Incorrect password" });
          }

          return done(null, user);
        } catch (error) {
          return done(`Error: ${error.message}`);
        }
      }
    )
  );
  //Register Strategy
  passport.use(
    "register",
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const { first_name, last_name, age, role } = req.body;

          if (!first_name || !last_name || !email || !password || !age) {
            return done(null, false, {
              message: "All fields are required",
            });
          }

          const userExists = await userRepository.findOne({ email });

          if (userExists) {
            return done(null, false, { message: "User already exists" });
          }

          const hashPassword = await createHash(password);

          const user = await userRepository.create({
            first_name,
            last_name,
            email,
            age,
            role,
            password: hashPassword,
          });

          return done(null, user);
        } catch (error) {
          return done(null, false, { message: `Error: ${error.message}` });
        }
      }
    )
  );
}

export { initializePassport };
