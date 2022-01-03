const router = require('express').Router();
const fs = require('fs');

//npm package that adds a unique id
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

    res.json(newNote);
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

//deletes notes from db.json when user clicks on trash icon
router.delete('/notes/:id', (req, res) => {
  fs.readFile('db/db.json', (err, data) => {
    if(err) {
      return console.log(err);
    }

    let notes = JSON.parse(data);
    notes.forEach((note, i) => {
      if(note.id === req.params.id) {
        console.log(note);
        notes.splice(i, 1);
      }
    });

    fs.writeFile('db/db.json', JSON.stringify(notes, null, 2), (err) => {
      if(err) {
        return console.log(err);
      }
      res.send(console.log('Note removed from list'));
    });
  });
});

module.exports = router;
