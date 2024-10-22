const router = require("express").Router();
const { Post } = require("../../models/index");
const { checkLoginStatus } = require('../../utils/logging-handler');
const { withCatch } = require("../../utils/utils");

router.post("/submit", async (req, res) => {
  try {
    const newPost = Post.create(
      {
        title: req.body["new-post-title"],
        content: req.body["new-post-content"],
        user_id: req.session.user_id,
      },
      { individualHooks: true }
    );

    if (newPost) {
      res.status(200).send();
    } else {
      res.status(400).send();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/edit", checkLoginStatus, async (req, res) => {

  console.log(req.body);

  const { data, error } = await withCatch(
    Post.update(
      {
        title: req.body["existing-post-title"],
        content: req.body["existing-post-content"],
      },
      {
        where: {
          id: req.body.postId,
        },
      },
      { individualHooks: true }
    )
  );

  if (error) {
    console.log(error.message);
    res.status(500).json(error);
  }

  if (data) res.status(200).send();

  else res.status(400).send();
});

router.delete("/delete/:postId", checkLoginStatus, async (req, res) => {

  const { data, error } = await withCatch(
    Post.destroy(
      {
        where: {
          id: req.params.postId,
        },
      }
    )
  );

  if (error) {
    console.log(error.message);
    res.status(500).json(error);
  }

  if (data) res.status(200).send();

  else res.status(400).send();
});

module.exports = router;
