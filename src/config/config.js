import dotenv from "dotenv";
dotenv.config();

export const config = {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT,
  PERSISTENCE: process.env.PERSISTENCE,
  JWT_SECRET: process.env.JWT_SECRET,
  SIGN_COOKIE_SECRET: process.env.SIGN_COOKIE_SECRET,

  mailer: {
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    from: process.env.MAILER_FROM,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASSWORD,
    },
  },
};
