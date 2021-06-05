const { v4: uuidv4 } = require("uuid");
const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const blogController = require("../controllers/blogController");

// blog routes
router.get("/add-blog", (req, res) => {
  const blog = new Blog({
    _id: uuidv4(),
    title: "new blog",
    snippet: "about my new blog",
    body: "more about my new blog",
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/single-blog", (req, res) => {
  Blog.findById("5ea99b49b8531f40c0fde689")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
