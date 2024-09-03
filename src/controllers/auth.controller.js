import { generateToken } from "../utils/jwtFunctions.js";

class AuthController {
  async login(req, res) {
    const payload = {
      email: req.user.email,
      role: req.user.role,
    };

    const token = generateToken(payload);
    res.cookie("token", token, {
      maxAge: 1000 * 60 * 30,
      httpOnly: true,
    });

    return res.status(200).json({ message: "Login ok" });
  }

  async register(req, res) {
    res.status(200).json({ message: "User registered" });
  }

  async current(req, res) {
    res.status(200).json({ message: "Current user", user: req.user });
  }

  async logout(req, res) {
    res.clearCookie("token", { httpOnly: true, path: "/" });
    return res.send("Logged out successfully");
  }
}

export const authController = new AuthController();
