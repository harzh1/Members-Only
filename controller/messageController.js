import asyncHandler from "express-async-handler";
import Message from "../models/Message.js";

export const index = asyncHandler(async (req, res) => {
  const all_messages = await Message.find({}, "title message author timestamp")
    .sort({ timestamp: -1 })
    .populate("author")
    .exec();

  res.render("index", { title: "Express", allMessages: all_messages });
});

export const message_post = asyncHandler(async (req, res, next) => {
  const message = new Message({
    title: req.body.title,
    message: req.body.message,
    author: req.user._id,
    timestamp: new Date(),
  });
  try {
    await message.save();
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
});

// export const all_message_get = asyncHandler(async (req, res, next) => {
//   const all_messages = await Message.find({}, "title message author")
//     .sort({ timestamp: -1 })
//     .populate("author")
//     .exec();
//   res.render("chats", { title: "All Messages", allMessages: all_messages });
// });
