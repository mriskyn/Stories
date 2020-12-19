const { PostMessage } = require("../models");

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
    console.log(req.body);

    const newPost = new PostMessage(post);
    try {
      await newPost.save();
      res.status(201).json(newPost);
    } catch (err) {
      res.status(409).json({ message: err.message });
    }
  }
}

module.exports = PostsController;
