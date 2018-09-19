// Validate your forms with express-validator
const express = require('express');
const Post = require('../models/post');
const User = require('../models/user');

const app = app => {
  /**********************************************
   / Posts Route: Get
   /**********************************************/

  app.get('/posts/new', function(req, res) {
    const currentUser = req.user;
    res.render('posts-new', { currentUser });
  });

  app.get('/posts', (req, res) => {
    const currentUser = req.user;
    Post.find({})
      .populate('author')
      .then(posts => {
        res.render('reddit.hbs', { posts, currentUser });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  app.get('/posts/:id', function(req, res) {
    const currentUser = req.user;

    // LOOK UP THE POST
    Post.findById(req.params.id)
      .then(post => {
        res.render('post-show.hbs', { post, currentUser });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  // SUBREDDIT
  app.get('/n/:subreddit', function(req, res) {
    const currentUser = req.user;
    console.log(req.params.subreddit);
    Post.findById(req.params.id)
      .then(post => {
        res.render('post-show.hbs', { post, currentUser });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  /**********************************************
   / Posts Route: Post
   /**********************************************/

  // CREATE
  app.post('/posts', (req, res) => {
    if (req.user) {
      const postBody = req.body;
      console.log(postBody);

      // INSTANTIATE INSTANCE OF POST MODEL
      const post = new Post(req.body);
      post.author = req.user._id;

      // SAVE INSTANCE OF POST MODEL TO DB
      post
        .save()
        .then(post => {
          return User.findById(req.user._id);
        })
        .then(user => {
          user.posts.unshift(post);
          user.save();
          // REDIRECT TO THE NEW POST
          res.redirect('/posts/' + post._id);
        })
        .catch(err => {
          console.log(err.message);
        });
    } else {
      return res.status(401); // UNAUTHORIZED
    }
  });

  // CREATE
  app.post('/posts/new', function(req, res) {
    if (req.user) {
      const postBody = req.body;
      console.log(postBody);

      // INSTANTIATE INSTANCE OF POST MODEL
      const post = new Post(req.body);
      post.author = req.user._id;

      // SAVE INSTANCE OF POST MODEL TO DB
      post
        .save()
        .then(post => {
          return User.findById(req.user._id);
        })
        .then(user => {
          user.posts.unshift(post);
          user.save();
          // REDIRECT TO THE NEW POST
          res.redirect('/posts/' + post._id);
        })
        .catch(err => {
          console.log(err.message);
        });
    } else {
      return res.status(401); // UNAUTHORIZED
    }
  });

  // SUBREDDIT
  app.post('/n/:subreddit', function(req, res) {
    const currentUser = req.user;
    Post.find({ subreddit: req.params.subreddit })
      .then(posts => {
        res.render('reddit.hbs', { posts, currentUser });
      })
      .catch(err => {
        console.log(err);
      });
  });
};

module.exports = app;
