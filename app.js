"use strict";
const express = require("express");
const multer = require("multer");
const app = express();
const fs = require("fs");
app.use(multer().none());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const INVALID_REQUEST = 400;
const PORT_NUMBER = 8000;

app.get("/update", (req, res) => {
  let data = fs.readFileSync("./data.txt");
  if (data.length === 0) {
    doCmd("r");
    data = fs.readFileSync("./data.txt");
  }
  res.type("text");
  res.send(data);
  fs.writeFileSync("./data.txt", "");
});

app.get("/send/:cmd", (req, res) => {
  let cmd = req.params.cmd;
  console.log(cmd);
  doCmd(cmd);
  res.send("").status(200);
});

function doCmd(cmd){
   fs.writeFileSync("./cmd.txt", cmd);
}

app.use(express.static("public"));
const PORT = process.env.PORT || PORT_NUMBER;
app.listen(PORT);