const router = require('express').Router();
const { Comment } = require('../../models');
const { checkLoginStatus } = require('../../utils/logging-handler');
const { withCatch } = require('../../utils/utils');

router.get('/:postId', async (req, res) => {

  console.log('postId', req.params.postId);

  const { data, error } = await withCatch(Comment.findAll({
    where: {
      post_id: req.params.postId
    }
  }));

  if(error) {
    res.status(500).send();
  }
  
  if(data) {
    res.status(200).json(data.map(x => x.get({plain: true})));
  }
  else {
    res.status(200).send([]);
  }
})

router.post('/:postId', checkLoginStatus, async (req, res) => {
  
  const { data, error } = await withCatch(Comment.create(
    {
      content: req.body.content,
      post_id: req.params.postId,
      user_id: req.session.user_id,
      created_date: new Date()
    }
  ));

  if(error) {
    res.status(500).send();
  }

  if(data) {
    res.status(201).send();
  }
  else {
    res.status(400).send();
  }
})

module.exports = router;