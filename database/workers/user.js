const queries = require('../queries/user');
const User = require('../../proto/User');
const BackendError = require('../../proto/BackendError');

const getUserById = async (conn, id) => {
  try {
    const [res] = await conn.query(queries.GET_USER_BY_ID, [parseInt(id)]);
    if(res) return new User(res.PK_User, res.username, res.avatar, res.isAdmin, res.mail, res.humblemail, res.apps, res.twofa, res.password).format(); 
    else throw new BackendError(404, `User with id ${id} not found`);
  } catch(err) {
    console.error(err);
    throw new BackendError(500, `Impossible to retrieve user with id ${id}`, err.message);
  }
};

const getUserByCredentials = async (conn, mail, password) => {
  try {
    const [res] = await conn.query(queries.GET_USER_BY_CREDENTIALS, [mail]);
    if(res) {
      const user = new User(res.PK_User, res.username, res.avatar, res.isAdmin, res.mail, res.humblemail, res.apps, res.twofa, res.password);
      const passwordMatch = await user.comparePassword(password);
      if(passwordMatch) return user.format();
      else throw new BackendError(403, 'Password is incorrect');
    }
  } catch(err) {
    console.error(err);
    throw new BackendError(500, `Impossible to retrieve user with mail ${mail}`, err.mesage);
  }
};

const createUser = async (conn, user) => {
  try {
    user = await user.cryptPassword();
    if(user) {
      const result = await conn.query(queries.ADD_USER, [
        user.username,
        user.avatar,
        user.isAdmin,
        user.mail,
        user.humblemail,
        JSON.stringify(user.apps),
        user.twofa,
        user.password
      ]);
      return result.insertId;
    } else {
      throw new BackendError(511, 'Password could not be crypted');
    }
  } catch(err) {
    console.error(err);
    throw new BackendError(500, 'Impossible to create a new user', err.message);
  }
};

const modifyUser = async (conn, user) => {
  try {
    user = await user.cryptPassword();
    if(user) {
      const result = await conn.query(queries.MODIFY_USER, [
        user.username,
        user.avatar,
        user.twofa,
        user.password,
        user.id
      ]);
      return result.insertId;
    } else {
      throw new BackendError(511, 'Password could not be crypted');
    }
  } catch(err) {
    console.error(err);
    throw new BackendError(500, `Impossible to modify the user with id ${user.id}`, err.message);
  }
};

const deleteUser = async (conn, id) => {
  try {
    const result = await conn.query(queries.DELETE_USER, [id]);
    return result.affectedRows === 1;
  } catch(err) {
    console.error(err);
    throw new BackendError(500, `Impossible to delete the user with id ${id}`, err.mesage);
  }
}

module.exports = {
  getUserById, getUserByCredentials, createUser, modifyUser, deleteUser
}