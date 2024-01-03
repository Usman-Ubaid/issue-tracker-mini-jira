import mongoose from "mongoose";

const IssueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  issueType: {
    type: String,
    required: true,
    enum: ["Epic", "Story", "Task"],
  },
  state: {
    type: String,
    default: "ToDo",
    enum: ["ToDo", "InProgress", "Done"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Issue = mongoose.model("Issue", IssueSchema);

export default Issue;
