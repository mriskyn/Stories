const express = require("express");
const router = express.Router();
const postRouter = require("./posts.router");

router.get("/", (req, res) => res.send("STORIES API IS ON"));
router.use("/posts", postRouter);

module.exports = router;
