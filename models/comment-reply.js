const mongoose = require('mongoose');
const Reply = require('./reply');
const Schema = mongoose.Schema;

const CommentSchema = new Schema();

CommentSchema.add({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  replies: [Reply.ReplySchema],
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = { Comment, CommentSchema };

/*
Post: comment ref -> Comment: [Replies],
                              [Replies],
                              [Replies: Reply: [Comments]]
                                              [Comments]
                                              [Comments: Comment: [Replies]]
 */
