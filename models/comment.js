const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: { type: String, required: true },
  author : { type: Schema.Types.ObjectId, ref: 'User', required: true },
  replies: { type: Schema.Types.ObjectId, ref: 'Reply' }
});

const RepliesSchema = new Schema({
  content: { type: String, required: true },
  author : { type: Schema.Types.ObjectId, ref: 'User', required: true },
  replies: [ RepliesSchema ]
});

module.exports = {
    mongoose.model('Comment', CommentSchema);
    mongoose.model('Reply', RepliesSchema);
};
