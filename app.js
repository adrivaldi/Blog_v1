const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const port = 3000;

let loremDesc =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, nemo blanditiis. Iusto autem consequatur beatae obcaecati, doloremque tempore accusantium esse non sint cum enim, impedit est, fugit eveniet tempora! Architecto.";

let posts = [loremDesc, loremDesc];

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.set("views", "./views");
app.get("/", (req, res) => {
  let days = [];
  for (let i = 1; i <= posts.length; i++) {
    days = [...days, "Day " + i];
  }

  res.render("index.ejs", { posts: posts, days: days });
});

app.get("/posts", (req, res) => {
  //   res.render("posts.ejs", { posts: posts });
  res.render("posts.ejs");
});

app.get("/posts/post", (req, res) => {
  let days = [];
  for (let i = 1; i <= posts.length; i++) {
    days = [...days, "Day " + i];
  }
  const page = req.query.entry;
  res.render("post.ejs", {
    post: posts[days.indexOf(page)],
    day: days[days.indexOf(page)],
  });
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
