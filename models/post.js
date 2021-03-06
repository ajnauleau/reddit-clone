const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('./comment');

const PostSchema = new Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },
  subreddit: { type: String, required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
  summary: { type: String, required: true },
  anonymous: { type: Boolean, required: false },
  image: { data: Buffer, contentType: String, required: false },
  comments: [Comment.schema],
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  upVotes : [{ type: Schema.Types.ObjectId, ref: "User"}],
  downVotes : [{ type: Schema.Types.ObjectId, ref: "User"}],
  voteScore : {type: Number}
});

PostSchema.pre('save', next => {
  // SET createdAt AND updatedAt
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

//module.exports = mongoose.model('Post', PostSchema);
const Post = mongoose.model('post', PostSchema);
module.exports = Post;
