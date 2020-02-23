const yargs = require("yargs");
const notes = require("./notes");

// Customize add commands
yargs.command({
  command: "add",
  describe: "Add a new Note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string"
    },
    body: {
      describe: "Note Body",
      demandOption: true,
      type: "string"
    }
  },
  handler: argv => {
    notes.addNote(argv.title, argv.body);
  }
});

yargs.command({
  command: "remove",
  describe: "remove a new Note",
  builder: {
    title: {
      describe: "Note Title",
      type: "string",
      demandOption: true
    }
  },
  handler: argv => {
    notes.removeNote(argv.title);
  }
});

yargs.command({
  command: "read",
  describe: "read a new Note",
  builder: {
    title: {
      demandOption: true,
      type: "string"
    }
  },
  handler: argv => {
    notes.readNote(argv.title);
  }
});

yargs.command({
  command: "list",
  describe: "list a new Note",
  handler: () => {
    notes.listNotes();
  }
});

yargs.parse();
