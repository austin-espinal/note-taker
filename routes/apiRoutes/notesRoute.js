const router = require('express').Router();
const fs = require('fs');

var uniqid = require('uniqid');

//get that receives db.json data
router.get('/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      return console.error(err);
    }
    res.send(JSON.parse(data));
  });
});

//post that deals with saving notes and adding them to db.json
router.post('/notes', (req, res) => {
  fs.readFile('db/db.json', (err, data) => {
    if(err) {
      return console.log(err);
    }

    let notes = JSON.parse(data);

    let newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uniqid(),
    };

    notes.push(newNote);
    console.log(notes);

    fs.writeFile('db/db.json', JSON.stringify(notes, null, 2), (err) => {
      if(err) {
        return console.log(err);
      }
      console.log('Note added to list');
    });
  });
});

module.exports = router;
