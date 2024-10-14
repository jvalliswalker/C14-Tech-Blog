const router = require('express').Router();
const { User, Post, Comment } = require('../models/index');
const { checkLoginStatus } = require('../utils/logging-handler');

function isLoggedIn(req){
  return req.session ? req.session.logged_in : false;
}

router.get('/', async (req, res) => {
  res.render('homepage', {
    loggedIn: isLoggedIn(req)
   } 
  );
})

router.get('/dashboard', checkLoginStatus, async (req, res) => {
  res.render('dashboard', {
    loggedIn: isLoggedIn(req)
  });
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
    fields: fields
  });
})

router.get('/login',(req, res) => {
  res.render('login');
})

router.get('/sign-up', async (req, res) => {
  res.render('sign-up')
})

module.exports = router;