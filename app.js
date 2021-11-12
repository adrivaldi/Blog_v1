const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const port = 3000;

let loremDesc =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, nemo blanditiis. Iusto autem consequatur beatae obcaecati, doloremque tempore accusantium esse non sint cum enim, impedit est, fugit eveniet tempora! Architecto.";

let posts = [loremDesc, loremDesc];

console.log("here0");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("views", "./views");
app.get("/", (req, res) => {
  let days = [];
  for (let i = 1; i <= posts.length; i++) {
    days = [...days, "Day " + i];
    console.log("here1");
    console.log("Length posts: " + posts.length);
    console.log("i: " + i);
    console.log(days);
  }
  console.log("here2");
  res.render("index.ejs", { posts: posts, days: days });
});

app.get("/posts", (req, res) => {
  //   res.render("posts.ejs", { posts: posts });
  res.render("posts.ejs");
});

app.post("/posts", (req, res) => {
  const entry = req.body.textArea;
  if (entry.length) {
    posts = [...posts, entry];
    res.redirect("/");
  } else {
    res.redirect("/posts");
  }
});

app.listen(port, () => {
  console.log("Server up and running.");
});
