const validator = require('validator');
const moment = require('moment');

const {AuthorizationCode} = require('../proto/AuthorizationCode');
const {AccessToken} = require('../proto/AccessToken');
const {RefreshToken} = require('../proto/RefreshToken');
const {BackendError} = require('../proto/BackendError');

const userWrk = require('./workers/user');
const atWrk = require('./workers/accessToken');
const rtWrk = require('./workers/refreshToken');
const acWrk = require('./workers/authorizationCode');
const clientWrk = require('./workers/client');
const serviceWrk = require('./workers/service');

const getUserById = async id => {
  if(!Number.isInteger(id)) {
    throw new BackendError(401, 'id must be an integer');
  }
  let conn;
  try {
    conn = await pool.getConnection();
    return await userWrk.getUserById(conn, id);
  } catch(err) {
    throw err;
  } finally {
    if(conn) conn.end();
  }
};

const getUserByCredentials = async (mail, password) => {
  if(!validator.isEmail(mail)) {
    throw new BackendError(402, 'Invalid email address');
  }
  let conn;
  try {
    conn  = await pool.getConnection();
    return await userWrk.getUserByCredentials(conn, mail, password);
  } catch(err) {
    throw err;
  } finally {
    if(conn) conn.end();
  }
};

const createUser = async user => {
  let conn;
  try {
    conn = await pool.getConnection();
    conn.beginTransaction();
    const id = await userWrk.createUser(conn, user);
    const result = await userWrk.getUserById(conn, id);
    conn.commit();
    return result;
  } catch(err) {
    conn.rollback();
    throw err;
  } finally {
    if(conn) conn.end();
  }
};

const modifyUser = async user => {
  let conn;
  try {
    conn = await pool.getConnection();
    conn.beginTransaction();
    const id = await userWrk.modifyUser(conn, user);
    const result = await userWrk.getUserById(conn, id);
    conn.commit();
    return result;
  } catch(err) {
    conn.rollback();
    throw err;
  } finally {
    if(conn) conn.end();
  }
};

const deleteUser = async id => {
  let conn;
  try {
    conn = await pool.getConnection();
    conn.beginTransaction();
    const result = await userWrk.deleteUser(conn, id);
    conn.commit();
    return result;
  } catch(err) {
    conn.rollback();
    throw err;
  } finally {
    if(conn) conn.end();
  }
}

const getAccessToken = async at => {
  return await atWrk.getAccessToken(at);
};

const saveAccessToken = async at => {
  return await atWrk.saveAccessToken(at);
};

const getRefreshToken = async rt => {
  return await rtWrk.getRefreshToken(rt);
};

const saveRefreshToken = async rt => {
  return await rtWrk.saveRefreshToken(rt);
};

const deleteRefreshToken = async rt => {
  return await rtWrk.deleteRefreshToken(rt);
};

const getAuthorizationCode = async ac => {
  return await acWrk.getAuthorizationCode(ac);
};

const saveAuthorizationCode = async ac => {
  return await acWrk.saveAuthorizationCode(ac);
};

const deleteAuthorizationCode = async ac => {
  return await acWrk.deleteAuthorizationCode(ac);
};

const getClient = async (clientid, secret) => {
  return await clientWrk.getClient(clientid, secret);
};

const getService = async service => {
  return await serviceWrk.getService(service);
};

const getServices = async () => {
  return await serviceWrk.getServices();
};

saveAccessToken(new AccessToken(0, 'test', moment().toDate(), 'test', 1, 1)).then(data => {
  console.log(data);
  return getAccessToken('test');
}).then(at => console.log(at)).catch(e => console.log(e));

saveRefreshToken(new RefreshToken(0, 'test', moment().toDate(), 'test', 1, 1)).then(data => {
  console.log(data);
  return getRefreshToken('test');
}).then(at => console.log(at)).catch(e => console.log(e));

saveAuthorizationCode(new AuthorizationCode(0, 'test', moment().toDate(), null, 'test', 1, 1)).then(data => {
  console.log(data);
  return getAuthorizationCode('test');
}).then(at => console.log(at)).catch(e => console.log(e));

module.exports = {
  getUserById,
  getUserByCredentials,
  createUser,
  modifyUser,
  deleteUser,
  getAccessToken,
  saveAccessToken,
  getRefreshToken,
  saveRefreshToken,
  deleteRefreshToken,
  getAuthorizationCode,
  saveAuthorizationCode,
  deleteAuthorizationCode,
  getClient,
  getService,
  getServices
};