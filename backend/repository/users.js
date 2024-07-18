const UserModel = require('../models/users')

class Users {
  async findOne(query, projection = {}) {
    const user = await UserModel.findOne(query).select(projection)
    return user
  }

  async insertOne(data) {
    try {
      const user = new UserModel(data); 
      const savedUser = await user.save(); 
      return savedUser;
    } catch (error) {
      if (error.name === 'ValidationError') {
        for (let field in error.errors) {
          console.error(`Validation error for ${field}: ${error.errors[field].message}`);
        }
      } else {
        console.error('Error saving user:', error);
      }
      throw error;
    }
  }

  async updateOne(query, update, options = {}) {
    return await UserModel.findOneAndUpdate(query, update, options);
  }

  async deleteOne(query) {
    return await UserModel.deleteOne(query);
  }

  async find(query, projection = {}) {
    return await UserModel.find(query, projection);
  }
}

module.exports = Users