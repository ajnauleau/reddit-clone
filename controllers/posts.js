// Validate your forms with express-validator
const express = require('express');
const Post = require('../models/post');

const app = app => {
  /**********************************************
   / Posts Route: Get
   /**********************************************/

  app.get('/posts/new', function(req, res) {
    res.render('posts-new');
  });

  //error with Post.find({})
  app.get('/posts', (req, res) => {
    Post.find({})
      .then(posts => {
        res.render('reddit.hbs', { posts });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  app.get('/posts/:id', function(req, res) {
    // LOOK UP THE POST
    Post.findById(req.params.id)
      .populate('comments')
      .then(post => {
        res.render('post-show.hbs', { post });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  // SUBREDDIT
  app.get('/n/:subreddit', function(req, res) {
    console.log(req.params.subreddit);
    Post.findById(req.params.id)
      .then(post => {
        res.render('post-show.hbs', { post });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  /**********************************************
   / Posts Route: Post
   /**********************************************/

  // CREATE
  app.post('/posts/new', function(req, res) {
    const postBody = req.body;
    console.log(postBody);

    // INSTANTIATE INSTANCE OF POST MODEL
    var post = new Post(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB
    post.save((err, post) => {
      // REDIRECT TO THE ROOT
      return res.redirect(`/posts`);
    });
  });

  // SUBREDDIT
  app.post('/n/:subreddit', function(req, res) {
    Post.find({ subreddit: req.params.subreddit })
      .then(posts => {
        res.render('reddit.hbs', { posts });
      })
      .catch(err => {
        console.log(err);
      });
  });
};

module.exports = app;

/*
module.exports = app => {
  Post.find({})
    .then(feed => {
      res.render('posts-index.hbs', { posts });
    })
    .catch(err => {
      console.log(err.message);
    });

  // CREATE
  app.post('/posts', (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    var post = new Post(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB
    post.save((err, post) => {
      // REDIRECT TO THE ROOT
      return res.redirect(`/`);
    });
  });
};
*/
