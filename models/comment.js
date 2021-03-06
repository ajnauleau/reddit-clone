const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema();

CommentSchema.add({
  content: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  replies: [CommentSchema],
});

module.exports = mongoose.model('Comment', CommentSchema);

/*
Post: comment ref -> Comment: [Replies],
                              [Replies],
                              [Replies: Reply: [Comments]]
                                              [Comments]
                                              [Comments: Comment: [Replies]]
 */
