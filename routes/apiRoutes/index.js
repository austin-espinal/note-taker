const router = require('express').Router();
const fs = require('fs');
const path = require('path');

var uniqid = require('uniqid');
const { notes } = require('../../db/db.json');

//function to add new note to db.json
function createNote(body, noteArray) {
  const newNote = body;
  noteArray.push(newNote);
  fs.writeFile(
    path.join(__dirname, '../../db/db.json'),
    JSON.stringify({ notes }, null, 2)
  );
  return newNote;
}


router.get('/api/notes', (req, res) => {
  fs.readFile('../../db/db.json', 'utf8', (err, data => {
    if (err) {
      return console.error(err);
    }
    
    res.json(data);
  }))
});

router.post('/api/notes', (req, res) => {
  // set id using uniqid npm package
  req.body.id = uniqid();
  
  const note = createNote(req.body, notes);
  console.log(note);
  res.json(note);
});

module.exports = router;
