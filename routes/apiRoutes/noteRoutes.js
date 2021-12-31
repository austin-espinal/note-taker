const router = require('express').Router();
var uniqid = require('uniqid');
const { notes } = require('../../db/db.json');

router.get('/api/notes', (req, res) => {
  // let results = notes;
  // if (req.query) {
  //   results = filterByQuery(req.query, results);
  // }
  // res.json(results);
});

router.post('/api/notes', (req, res) => {
  // set id using uniqid npm package
  req.body.id = uniqid();

});

module.exports = router;
