// Validate your forms with express-validator
const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');

const app = app => {
  // CREATE Comment
  app.post('/posts/:postId/comments', function(req, res) {
    // INSTANTIATE INSTANCE OF MODEL
    const comment = new Comment(req.body);

    const currentUser = req.user;
    // SAVE INSTANCE OF Comment MODEL TO DB

    comment.author = req.user._id;
    //comment.author = req.user._id;

    comment
      .save()
      .then(comment => {
        return Post.findById(req.params.postId);
      })
      .then(post => {
        post.comments.unshift(comment);
        // Temp fix wrong user should be postId's user
        //post.author = req.user_id;
        return post.save();
      })
      .then(comment => {
        return User.findById(req.user._id);
      })
      .then(user => {
        user.comments.unshift(comment);
        user.save();
        // REDIRECT TO THE NEW POST
        res.redirect(`/posts/${req.params.postId}`);
      })
      .catch(err => {
        console.log(err);
      });
  });
};

module.exports = app;
