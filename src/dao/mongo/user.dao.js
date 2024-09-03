import { userModel } from "../../models/user.model.js";

export class UserDao {
  async getAll() {
    return await userModel.find();
  }

  async getById(id) {
    return await userModel.findById(id);
  }

  async findOne(email, proyection = {}) {
    return await userModel.findOne({ email }, proyection);
  }

  async create(user) {
    return await userModel.create(user);
  }

  async findOneAndDelete(id) {
    return await userModel.findOneAndDelete({ _id: id });
  }

  async update(id, user) {
    return await userModel.findByIdAndUpdate(id, user, { new: true });
  }
}
