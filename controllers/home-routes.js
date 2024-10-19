const router = require('express').Router();
const { User, Post, Comment } = require('../models/index');
const { checkLoginStatus } = require('../utils/logging-handler');
const { withCatch } = require('../utils/utils');

function isLoggedIn(req){
  return req.session ? req.session.logged_in : false;
}

router.get('/', async (req, res) => {
  
  const {data, error} = await withCatch(Post.findAll());
  
  if(error) res.status(500).send()

  res.render('homepage', {
    posts: data.map(x => x.get({plain: true}))
   } 
  );
})

router.get('/dashboard', checkLoginStatus, async (req, res) => {
  
  try {
    
    const usersPosts = await Post.findAll(
      {
        where: {
          user_id: req.session.user_id
        },
        order: [
          ['created_date', 'DESC']
        ]
      }
    );

    res.render('dashboard', {
      loggedIn: isLoggedIn(req),
      posts: usersPosts.map(x => x.get({plain: true}))
    });
  } catch (error) {
    res.status(500);
  }
  
})

router.get('/new-post', checkLoginStatus, async (req, res) => {
  
  const fields = [
    {
      id: 'new-post-title',
      label: 'Title',
      formId: 'form-new-post',
      type: 'text'
    },
    {
      id: 'new-post-content',
      label: 'Content',
      formId: 'form-new-post',
      type: 'textarea',
      isTextArea: true,
      rows: 5
    },
  ]

  res.render('new-post', {
    title: 'New Blog Post',
    formId: 'form-new-post',
    fields: fields
  });
})

router.get('/login',(req, res) => {
  res.render('login');
})

router.get('/sign-up', async (req, res) => {
  res.render('sign-up')
})

router.get('/post/edit/:postId', checkLoginStatus, async (req, res) => {

  const { data, error } = await withCatch(Post.findOne({
    where: {
      id: req.params.postId
    }
  }))

  if (error) {
    res.status(500).send();
  }

  if(!data){
    res.status(400).send();
  }

  const fields = [
    {
      id: 'existing-post-title',
      label: 'Title',
      formId: 'form-edit-post',
      type: 'text',
      value: data.title
    },
    {
      id: 'existing-post-content',
      label: 'Content',
      formId: 'form-edit-post',
      type: 'textarea',
      value: data.content,
      isTextArea: true,
      rows: 5
    },
  ]

  res.render('edit-post', { fields: fields, title: 'Update Post', formId: 'form-edit-post', postId: req.params.postId });
})


module.exports = router;