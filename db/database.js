require('dotenv').config();

module.exports = router => {
  router.get('/db', (req, res) => {
    res.send('SALUT');
  });
};