const router = require('express').Router();
const { Comment } = require('../../models');
const { withCatch } = require('../../utils/utils');

router.get('/:postId', async (req, res) => {

  const { data, error } = withCatch(Comment.findAll({
    where: {
      post_id: req.params.postId
    }
  }));

  if(error) res.status(500).send();

  res.status(200).json(data.map(x => x.get({plain: true})));
})

module.exports = router;