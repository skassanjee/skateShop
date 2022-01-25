let express = require("express");
let Router = express.Router();
let Page = require("../models/page");
let mongodb = require("mongodb");
let mongoose = require("mongoose");

/*get pages index */

Router.get("/admin/pages", (req, res, next) => {
  res.send("admin area");
});

//get add pages
Router.get("/pages/add-pages", (req, res, next) => {
  let title = "";
  let slug = "";
  let content = "";

  res.render("admin/add_page", {
    title: title,
    slug: slug,
    content: content,
    pageTitle: "Admin | Add a Page",
  });
});

//post add pages
Router.post("/pages/add-pages", (req, res, next) => {
  req.checkBody("title", "Title must have a value.").notEmpty();
  req.checkBody("content", "Content must have a value.").notEmpty();

  let title = req.body.title;
  let content = req.body.content;

  let slug = req.body.slug.replace(/\s+/g, "-").toLowerCase();
  if (slug === "") {
    slug = title.replace(/\s+/g, "-").toLowerCase();
  }

  let errors = req.validationErrors();

  if (errors) {
    console.log(errors);
    res.render("admin/add_page", {
      errors: errors,
      title: title,
      slug: slug,
      content: content,
      pageTitle: "Admin | Add a Page",
    });
  } else {
    Page.findOne({ slug: slug }, (err, page) => {
      if (page) {
        req.flash("danger", "Page slug exists, choose another");
        res.render("admin/add_page", {
          title: title,
          slug: slug,
          content: content,
          pageTitle: "Admin | Add a Page",
        });
      } else {
        let page = new Page({
          title,
          slug,
          content,
          sorting: 100,
        });

        page
          .save()
          .then((result) => {
            req.flash("success", "page added");
            res.redirect("/admin/pages");
          })
          .catch((err) => console.log(err));
      }
    });
  }
});

//get main index
Router.get("/pages", (req, res, next) => {
  Page.find({})
    .sort({ sorting: 1 })
    .exec((err, pages) => {
      res.render("admin/pages", {
        pageTitle: "Admin | Pages",
        pages: pages,
      });
    });
});

module.exports = Router;
