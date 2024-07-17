import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  last_name: { type: String, requestAnimationFrame: true, maxLength: 100 },
  username: { type: String, required: true, maxLength: 100 },
  password: { type: String, required: true },
  membership_status: { type: Boolean, default: false },
  admin: { type: Boolean, default: false },
});

// Virtual for user's full name
UserSchema.virtual("name").get(function () {
  return this.first_name + " " + this.last_name;
});

// Virtual for user's URL
UserSchema.virtual("url").get(function () {
  return "/users/" + this._id;
});

// Export model
export default mongoose.model("User", UserSchema);
