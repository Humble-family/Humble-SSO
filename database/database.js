const {AuthorizationCode} = require('../proto/AuthorizationCode');
const {AccessToken} = require('../proto/AccessToken');
const {RefreshToken} = require('../proto/RefreshToken');

const moment = require('moment');
const userWrk = require('./workers/user');
const atWrk = require('./workers/accessToken');
const rtWrk = require('./workers/refreshToken');
const acWrk = require('./workers/authorizationCode');
const clientWrk = require('./workers/client');
const serviceWrk = require('./workers/service');

const getUserById = async id => {
  return await userWrk.getUserById(id);
};

const getUserByCredentials = async (mail, password) => {
  return await userWrk.getUserByCredentials(mail, password);
};

const createUser = async user => {
  return await userWrk.createUser(user);
};

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