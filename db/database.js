require('dotenv').config();
const mongoose = require('mongoose');

const { User } = require('./models/User');
const { AccessToken } = require('./models/AccessToken');
const { RefreshToken } = require('./models/RefreshToken');
const { AuthorizationCode } = require('./models/AuthorizationCode');
const { Service } = require('./models/Service');
const { Client } = require('./models/Client');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_HOST, {
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.once('open', () => {
  console.log('connected');
});

const getUserById = id => {
  User.findById(id).then(user => {
    return user.toJSON();
  }).catch(err => {
    console.error(err);
    return undefined;
  });
};

const getUserByCredentials = (mail, password) => {
  User.findByCredentials(mail, password).then(user => {
    return user.toJSON();
  }).catch(err => {
    console.error(err);
    return undefined;
  });
};

const createUser = user => {
  user.save().then(user => {
    return user._id;
  }).catch(err => {
    console.error(err);
    return false;
  });
};

const getAccessToken = at => {
  AccessToken.findOne({ accessToken: at }).then(token => {
    return token.toJSON();
  }).catch(err => {
    console.error(err);
    return undefined;
  });
};

const getRefreshToken = rt => {
  RefreshToken.findOne({ refreshToken: rt }).then(token => {
    return token.toJSON();
  }).catch(err => {
    console.error(err);
    return undefined;
  });
};

const getAuthorizationCode = ac => {
  AuthorizationCode.findOne({ authorizationCode: ac }).then(authorizationCode => {
    return authorizationCode.toJSON();
  }).catch(err => {
    console.error(err);
    return undefined;
  });
};

const getClient = (id, secret) => {
  Client.findById(id).then(client => {
    if(secret && secret !== client.secret) return undefined;
    return client;
  }).catch(err => {
    console.error(err);
    return undefined;
  });
};

const saveAccessToken = accessToken => {
  accessToken.save().then(ac => {
    return ac;
  }).catch(err => {
    console.error(err);
    return undefined;
  });
};

const saveRefreshToken = refreshToken => {
  refreshToken.save().then(rt => {
    return rt;
  }).catch(err => {
    console.error(err);
    return undefined;
  });
};

const saveAuthorizationCode = authorizationCode => {
  authorizationCode.save().then(ac => {
    return ac;
  }).catch(err => {
    console.error(err);
    return undefined;
  });
};

module.exports = () => {
  getUserById, getUserByCredentials, createUser, getAccessToken, getRefreshToken,
  getAuthorizationCode, getClient, saveAccessToken, saveRefreshToken, saveAuthorizationCode
};