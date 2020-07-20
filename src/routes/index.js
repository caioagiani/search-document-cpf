const express = require("express");
const SearchController = require("../app/controllers/SearchController");

const app = express();

app.use(express.json());

app.get("/", SearchController.show);

module.exports = app;
