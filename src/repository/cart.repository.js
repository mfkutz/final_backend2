export class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getAll() {
    return await this.dao.getAll();
  }

  async create(cart) {
    return await this.dao.create(cart);
  }

  async getById(id) {
    return await this.dao.getById(id);
  }

  async delete() {
    return await this.dao.delete();
  }
}
