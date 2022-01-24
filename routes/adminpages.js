let express = require("express");
let Router = express.Router();
let Page = require('../models/page')
let mongodb = require('mongodb')
let mongoose = require('mongoose')

/*get pages index */

Router.get("/", (req, res, next) => {
  res.send("admin area");
});

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
      console.log(errors)
    res.render("admin/add_page", {
      errors: errors,
      title: title,
      slug: slug,
      content: content,
      pageTitle: "Admin | Add a Page",
    });
  }else{
      Page.findOne({slug:slug}, (err, page) => {
        if(page){
            req.flash('danger', 'Page slug exists, choose another')
            res.render("admin/add_page", {
                title: title,
                slug: slug,
                content: content,
                pageTitle: "Admin | Add a Page",
              });
        }else{
            let page = new Page({
                title, 
                slug,
                content,
                sorting: 0
            })

            page.save()
            .then(result => {
                
                res.redirect('/admin/pages')})
            .catch(err => console.log(err))
        }

      })
  }
});

Router.get("/", (req, res, next) => {
  res.send("admin area");
});

module.exports = Router;
