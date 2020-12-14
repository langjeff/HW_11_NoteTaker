// file for data store and retrieval
const dbNotes = require("../db/db.json");
const cuid = require("cuid");
const util = require("util");
const fs = require("fs");
const express = require("express");
const app = express();
app.use(express.json());

//takes fs.readfile and allows you to use promises on it.
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//Routing
module.exports = (app) => {
  //get request for when user visits page.
  // in get route use readFileAsync, parse json, and then pass it.
  app.get("/api/notes", (req, res) => {
    readFileAsync("./db/db.json", "utf-8").then((data) => {
      // let newData = JSON.parse(data);
      res.json(JSON.parse(data));
      res.end();
    });
  });
  //post request for when user saves a note.
  app.post("/api/notes", (req, res) => {
    let id = cuid();
    let note = req.body;
    note.id = id;

    readFileAsync("./db/db.json", "utf-8").then((data) => {
      let newData = JSON.parse(data);
      // console.log(newData);
      // take data and use spread operator
      let updatedData = [...newData, note];
      // console.log(updatedData);
      //writefileAsync for updated
      writeFileAsync("./db/db.json", JSON.stringify(updatedData));
    });
    res.end();
  });
  // working on delete request, but it seems issues with index.js with buttons not working.
  app.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id;
    console.log(req.params.id);
    readFileAsync("./db/db.json", "utf-8").then((data) => {
      let newData = JSON.parse(data);
      let updatedData = newData.filter((note) => note.id !== id);
      writeFileAsync("./db/db.json", JSON.stringify(updatedData));
    });
    res.json(dbNotes);
    res.end();
  });
};
