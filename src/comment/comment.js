
var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	authorId:mongoose.Schema.Types.ObjectId,
	content:String,
	username:String,
	email:String,
	blogId:mongoose.Schema.Types.ObjectId
});
var Comment = mongoose.model('comments',CommentSchema);

module.exports = Comment;

