import { userRepository } from "../repository/index.js";

class UserController {
  async getAll(req, res) {
    try {
      const users = await userRepository.getAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const user = await userRepository.getById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const user = await userRepository.findOneAndDelete(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json({ Message: "Success", message: "User deleted", user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { first_name, last_name, email, age, role } = req.body;
    try {
      const user = await userRepository.update(id, {
        first_name,
        last_name,
        email,
        age,
        role,
      });
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json({ Message: "Success", message: "User updated", user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAllPurchases(req, res) {
    try {
      const userId = req.user._id;

      const user = await userRepository.getById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      const tickets = user.purchases;
      res.status(200).json({ message: "Success", tickets });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export const userController = new UserController();
