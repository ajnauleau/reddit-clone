// Validate your forms with express-validator
const express = require('express');
const Comment = require('../models/comment');
const Post = require('../models/post');

const app = app => {
  // CREATE Comment
  app.post('/posts/:postId/comments', function(req, res) {
    // INSTANTIATE INSTANCE OF MODEL
    const comment = new Comment(req.body);

    // SAVE INSTANCE OF Comment MODEL TO DB
    comment
      .save()
      .then(comment => {
        return Post.findById(req.params.postId);
      })
      .then(post => {
        post.comments.unshift(comment);
        return post.save();
      })
      .catch(err => {
        console.log(err);
      });
  });
};

module.exports = app;
