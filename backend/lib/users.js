const UsersRepo = require('../repository/users');

class Users {
  async initialize() {
    this.repo = new UsersRepo();
  }

  async findUser(query, projection = {}) {
    const user = await this.repo.findOne(query, projection);
    return user;
  }

  async createUser(data) {
    const user = await this.repo.insertOne(data);
    return user;
  }

  async updateUser(query, update, options = {}) {
    const user = await this.repo.updateOne(query, update, options);
    return user;
  }

  async deleteUser(query) {
    await this.repo.deleteOne(query);
  }
  
  async findUsers(query, projection = {}) {
    const users = await this.repo.find(query, projection);
    return users;
  }
}

module.exports = Users;
