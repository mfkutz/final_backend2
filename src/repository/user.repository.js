export class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getAll() {
    return await this.dao.getAll();
  }

  async getById(id) {
    return await this.dao.getById(id);
  }

  async findOne({ email }, proyection = {}) {
    return await this.dao.findOne(email, proyection);
  }

  async create(user) {
    return await this.dao.create(user);
  }

  async findOneAndDelete(id) {
    return await this.dao.findOneAndDelete(id);
  }

  async update(id, user) {
    return await this.dao.update(id, user);
  }
}
