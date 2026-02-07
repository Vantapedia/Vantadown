const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;

const APIRouter = require("./route/api.js");
const { info } = require("./setting.js");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


app.get("/", (req, res) => {
  res.render("id/index", {
    ...info
  })
});

app.get("/en", (req, res) => {
  res.render("en/index", {
    ...info
  })
});

app.get("/id", (req, res) => {
  res.render("id/index", {
    ...info
  })
});

app.get("/spa", (req, res) => {
  res.render("spa/index", {
    ...info
  })
});

app.use("/api", APIRouter);
app.use((req, res) => res.status(404).render("404"));

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
