const { ObjectId } = require('mongodb');
const Users = require('../lib/users');
const users = new Users();

exports.getAllUsers = async (ctx) => {
  console.log('getAllUsers called');
  try {
    const allUsers = await users.findUsers({});
    ctx.status = 200;
    ctx.body = allUsers;
  } catch (err) {
    console.error('Error in getAllUsers:', err);
    ctx.status = err.status || 500;
    ctx.message = err.message || 'Internal server error';
  }
};

exports.getUserById = async (ctx) => {
  console.log('getUserById called with ID:', ctx.params.id);
  const { id } = ctx.params;
  try {
    const user = await users.findUser({ _id: new ObjectId(id) });
    ctx.status = 200;
    ctx.body = user;
  } catch (err) {
    console.error('Error in getUserById:', err);
    ctx.status = err.status || 500;
    ctx.message = err.message || 'Internal server error';
  }
};

exports.createUser = async (ctx) => {
  console.log('createUser called');
  try {
    const newUser = ctx.request.body;
    if (newUser.manager) {
      const manager = await users.findUser({ firstName: newUser.manager });
      if (manager) {
        newUser.manager = manager._id;
      } else {
        ctx.status = 400;
        ctx.body = { message: 'Manager not found' };
        return;
      }
    } else {
      newUser.manager = null;
    }

    const createdUser = await users.createUser(newUser);
    ctx.status = 201;
    ctx.body = createdUser;
  } catch (err) {
    console.error('Error in createUser:', err);
    ctx.status = err.status || 500;
    ctx.message = err.message || 'Internal server error';
  }
};

exports.updateUser = async (ctx) => {
  console.log('updateUser called with ID:', ctx.params.id);
  const { id } = ctx.params;
  try {
    const updatedUser = ctx.request.body;
    console.log('Update data:', updatedUser);
    const user = await users.updateUser({ _id: new ObjectId(id) }, updatedUser);
    ctx.status = 200;
    ctx.body = user;
  } catch (err) {
    console.error('Error in updateUser:', err);
    ctx.status = err.status || 500;
    ctx.message = err.message || 'Internal server error';
  }
};

exports.deleteUser = async (ctx) => {
  console.log('deleteUser called with ID:', ctx.params.id);
  const { id } = ctx.params;
  try {
    await users.deleteUser({ _id: new ObjectId(id) });
    ctx.status = 204;
    ctx.body = null;
  } catch (err) {
    console.error('Error in deleteUser:', err);
    ctx.status = err.status || 500;
    ctx.message = err.message || 'Internal server error';
  }
};

exports.getManagerAndEmployees = async (ctx) => {
  console.log('getManagerAndEmployees called with ID:', ctx.params.id);
  const { id } = ctx.params;
  try {
    const manager = await users.findUser({ _id: new ObjectId(id) });
    const employees = await users.findUsers({ manager: new ObjectId(id) });
    ctx.status = 200;
    ctx.body = { manager, employees };
  } catch (err) {
    console.error('Error in getManagerAndEmployees:', err);
    ctx.status = err.status || 500;
    ctx.message = err.message || 'Internal server error';
  }
};

async function initialize() {
  await users.initialize();
}

initialize();
