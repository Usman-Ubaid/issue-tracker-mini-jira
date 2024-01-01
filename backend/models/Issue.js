import mongoose from "mongoose";

const issueTypes = ["Epic", "Story", "Task"];

const IssueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: issueTypes,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Issue = mongoose.model("Issue", IssueSchema);
export default Issue;
