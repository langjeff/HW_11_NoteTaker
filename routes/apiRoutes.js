// file for data store and retrieval
const dbNotes = require("../db/db.json");

//Routing
module.exports = (app) => {
  //get request for when user visits page.
  app.get("/api/notes", (req, res) => res.json(dbNotes));
  //post request for when user saves a note.
  app.post("/api/notes", (req, res) => {
    dbNotes.push(req.body);
    console.log(req.body);
  });
  app.delete("/api/notes", (req, res) => {
    let index = dbNotes.findIndex((item) => item.id === req.query.id);
    dbNotes.splice(index, 1);
    console.log(req.id);
  });
};
