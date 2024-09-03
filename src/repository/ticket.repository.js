export class TicketRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async create(ticket) {
    return await this.dao.create(ticket);
  }
  async getAll() {
    return await this.dao.getAll();
  }

  async getById(id) {
    return await this.dao.getById(id);
  }

  async delete() {
    return await this.dao.delete();
  }
}
