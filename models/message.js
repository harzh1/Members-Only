import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true, maxLength: 100 },
  message: { type: String, required: true, maxLength: 1000 },
  timestamp: { type: Date, default: Date.now },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

// Virtual for message's URL
MessageSchema.virtual("url").get(function () {
  return "/messages/" + this._id;
});

// Export model
export default mongoose.model("Message", MessageSchema);
