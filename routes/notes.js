const notes = require('express').Router();
// Helper method for generating unique ids
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// GET Route for retrieving all the feedback
notes.get('/', (req, res) => {
  const data = fs.readFileSync('./db/db.json')
   res.json(JSON.parse(data))
}
   );

notes.post('/', (req, res) => {
    const { text, title } = req.body;

    if(text && title) {
        const newNote = {
            text,
            title,
            id: uuidv4()
        }

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if(err) {
                console.log(err);
            } else {
                const parsedNote = JSON.parse(data);

                parsedNote.push(newNote);

                fs.writeFile('./db/db.json', JSON.stringify(parsedNote, null, 4),
                (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated notes!')
        );
        
            }
        });
        const response = {
            status: 'success',
            body: newNote,
          };
      
          console.log(response);
          res.status(201).json(response);
        } else {
          res.status(500).json('Error in posting notes');
        }
    });
  
    notes.delete('/:id', (req, res) => {
      const data = fs.readFileSync('./db/db.json');
      const notes = JSON.parse(data);
      const filterNotes = notes.filter(note=> note.id !== req.params.id);
      fs.writeFile('./db/db.json', JSON.stringify(filterNotes, null, 4),
                (writeErr) => {
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated notes!')
                  res.end();
                });
    })

module.exports = notes;