const router = require('express').Router();
const userRouter = require('./user-routes');
const postRouter = require('./post-routes');
const commentRouter = require('./comment-routes');

router.use('/user', userRouter);
router.use('/post', postRouter)
router.use('/comment', commentRouter);

module.exports = router;