const mongoose = require('mongoose');
const Comment = require('./comment');
const Schema = mongoose.Schema;

const ReplySchema = new Schema();

ReplySchema.add({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [Comment.CommentSchema],
});

const Reply = mongoose.model('Reply', ReplySchema);

module.exports = { Reply, ReplySchema };
