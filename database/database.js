const {User} = require('../proto/User');
const userWrk = require('./workers/user');

const getUserById = async id => {
  return await userWrk.getUserById(id);
};

const getUserByCredentials = async (mail, password) => {
  return await userWrk.getUserByCredentials(mail, password);
};

const createUser = async user => {
  return await userWrk.createUser(user);
}

createUser(new User(0, 'test', '', false, 'test@test.com', 'test@humble.ch', ['test'], false, 'Emf12345')).then(res => {
  console.log('create', res);
  return getUserById(1);
}).then(res => {
  console.log('byId', res);
  return getUserByCredentials('test@test.com', 'Emf12345');
}).then(res => console.log('byCredentials', res))
.catch(err => console.log(err));

module.exports = {
  getUserById, getUserByCredentials, createUser
};