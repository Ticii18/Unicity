import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  curriculumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Curriculum',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;