const router = require("express").Router();
const { Post } = require("../../models/index");

router.post("/submit", async (req, res) => {
  try {
    const newPost = Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });

    if (newPost) {
      res.status(200).json({
        submit_successful: true,
      });
    } else {
      res.status(400).json({
        submit_successful: false,
      });
    }
  } catch (err) {
    res.status(500).json({ submit_successful: false, error_data: err });
  }
});
