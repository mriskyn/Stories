const { PostMessage } = require("../models");
const mongoose = require("mongoose");

class PostsController {
  static async getPosts(req, res) {
    console.log("Get Data");
    try {
      const postMessages = await PostMessage.find();
      res.status(200).json(postMessages);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async createPost(req, res) {
    console.log("Create Data");
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
    console.log("Update Data");
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = {
      creator,
      title,
      message,
      tags,
      selectedFile,
      _id: id,
    };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
  }
}

module.exports = PostsController;
