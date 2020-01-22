const validator = require('validator');

const pool = require('../pool');
const queries = require('../queries/user');
const {User} = require('../../proto/User');

const getUserById = async id => {
  if(!Number.isInteger(id)) {
    console.error('Id is not an integer');
    return undefined;
  }
  let conn;
  try {
    conn = await pool.getConnection();
    const [res] = await conn.query(queries.GET_USER_BY_ID, [parseInt(id)]);
    if(res) return new User(res.PK_User, res.username, res.avatar, res.isAdmin, res.mail, res.humblemail, res.apps, res.twofa, res.password).format(); 
    else return undefined;
  } catch(err) {
    console.error(err);
    return undefined;
  } finally {
    if(conn) conn.end();
  }
};

const getUserByCredentials = async (mail, password) => {
  if(!validator.isEmail(mail)) {
    console.error('Mail is not a valid email');
    return undefined;
  }
  let conn;
  try {
    conn = await pool.getConnection();
    const [res] = await conn.query(queries.GET_USER_BY_CREDENTIALS, [mail]);
    if(res) {
      const user = new User(res.PK_User, res.username, res.avatar, res.isAdmin, res.mail, res.humblemail, res.apps, res.twofa, res.password);
      const passwordMatch = await user.comparePassword(password);
      if(passwordMatch) {
        return user.format();
      } else {
        console.error('Password does not match');
        return undefined;
      }
    }
  } catch(err) {
    console.error(err);
    return undefined;
  } finally {
    if(conn) conn.end();
  }
};

const createUser = async user => {
  let conn;
  try {
    conn = await pool.getConnection();
    conn.beginTransaction();
    user = await user.cryptPassword();
    if(user) {
      const result = await conn.query(queries.ADD_USER, [
        user.username, user.avatar, user.isAdmin, user.mail, user.humblemail, JSON.stringify(user.apps), user.twofa, user.password
      ]);
      if(result.affectedRows === 1) {
        conn.commit();
        const [res] = await conn.query(queries.GET_USER_BY_ID, [parseInt(result.insertId)]);
        if(res) {
          return new User(res.PK_User, res.username, res.avatar, res.isAdmin, res.mail, res.humblemail, res.apps, res.twofa, res.password).format();
        } else {
          console.error('No result received (user.createUser)');
          return undefined;
        }
      } else {
        console.error(result);
        return undefined;
      }
    } else {
      console.error('Problem during password crypting (user.createUser)');
      conn.rollback();
      return undefined;
    }
  } catch(err) {
    console.error(err);
    if(conn) conn.rollback();
    return undefined;
  } finally {
    if(conn) conn.end();
  }
};

module.exports = {
  getUserById, getUserByCredentials, createUser
};