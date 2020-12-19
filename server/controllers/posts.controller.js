const { PostMessage } = require("../models");
const mongoose = require("mongoose");

class PostsController {
  static async getPosts(req, res) {
    try {
      const postMessages = await PostMessage.find();
      res.status(200).json(postMessages);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async createPost(req, res) {
    const post = req.body;

    const newPost = new PostMessage(post);
    try {
      await newPost.save();
      res.status(201).json(newPost);
    } catch (err) {
      res.status(409).json({ message: err.message });
    }
  }

  static async updatePost(req, res) {
    const { id: _id } = req.params;
    const post = req.body;

    if (mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No Post with that id");

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
      new: true,
    });

    res.json(updatedPost);
  }
}

module.exports = PostsController;
