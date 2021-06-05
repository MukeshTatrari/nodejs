const Blog = require("../models/blog");
const { v4: uuidv4 } = require("uuid");

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blogs/index", { blogs: result, title: "All blogs" });
    })
    .catch((err) => {
      res.render("404", { title: "Blog not found" });
    });
};

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      if (result) {
        res.render("blogs/details", { blog: result, title: "Blog Details" });
      } else {
        res.render("404", { title: "Blog not found" });
      }
    })
    .catch((err) => {
      res.render("404", { title: "Blog not found" });
    });
};

const blog_create_get = (req, res) => {
  res.render("blogs/create", { title: "Create a new blog" });
};

const blog_create_post = (req, res) => {
  // console.log(req.body);
  let data = req.body;
  data._id = uuidv4();
  const blog = new Blog(data);
  console.log("blog :::: ", blog);
  blog
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      res.render("404", { title: "Blog not found" });
    });
};

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      res.render("404", { title: "Blog not found" });
    });
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
};
