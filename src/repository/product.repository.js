export class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async create(product) {
    return await this.dao.create(product);
  }

  async update(id, updateFields) {
    return await this.dao.update(id, updateFields);
  }

  async delete(id) {
    return await this.dao.delete(id);
  }

  async getAll() {
    return await this.dao.getAll();
  }

  async getById(id) {
    return await this.dao.getById(id);
  }

  async paginate(queries, options) {
    return await this.dao.paginate(queries, options);
  }

  async discountStock(id, quantity) {
    return await this.dao.discountStock(id, quantity);
  }
}
