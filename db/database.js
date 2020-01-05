require('dotenv').config();
const mongoose = require('mongoose');

const { User } = require('./User');

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

module.exports = router => {
  router.get('/queryUserById/:id', (req, res) => {
    User.findById(req.params.id).then(user => {
      res.send(user.toJSON());
    }).catch(err => {
      res.status(404).send(`User with id ${req.params.id} not found`);
    });
  });

  router.post('/queryUserByCredentials', (req, res) => {
    User.findByCredentials(req.body.mail, req.body.password).then(user => {
      res.send(user);
    }).catch(err => {
      res.status(404).send(err);
    })
  });
  
  router.post('/createUser', (req, res) => {
    const { username, mail, password, token } = req.body;
    const user = new User({
      username, mail, password, token, humblemail: `${username}@humble.ch`
    });
    user.save().then(user => {
      res.send(user._id);
    }).catch(err => {
      res.status(404).send(err);
    });
  });
};