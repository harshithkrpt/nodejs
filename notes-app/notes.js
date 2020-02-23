const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.filter(note => {
    return note.title === title;
  });
  if (duplicateNotes.length === 0) {
    notes.push({
      title,
      body
    });
    saveNotes(notes);
    console.log(chalk.green("Notes Added"));
  } else {
    console.log(chalk.red("Note Title Taken!"));
  }
};

const removeNote = title => {
  const notes = loadNotes();

  const notesToKeep = notes.filter(note => {
    return note.title !== title;
  });
  if (notesToKeep.length === notes.length) {
    console.log(chalk.red("Note Not Found"));
  } else {
    // Save Notes
    saveNotes(notesToKeep);
    console.log(chalk.green("Note Deleted"));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.red("Your Notes"));
  console.log("-----------------");
  notes.forEach(note => {
    console.log(chalk.gray("Title :"), chalk.green(note.title));
    console.log(chalk.gray("Body  :"), chalk.green(note.body));
    console.log("-----------------");
  });
};

const readNote = title => {
  const notes = loadNotes();

  const note = notes.find(note => note.title === title);
  if (note) {
    console.log(chalk.gray("Title :"), chalk.green(note.title));
    console.log(chalk.gray("Body  :"), chalk.green(note.body));
  } else console.log(chalk.red("Note Not Found!"));
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote
};
