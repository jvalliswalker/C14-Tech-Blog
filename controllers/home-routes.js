const router = require('express').Router();
const { User, Post, Comment } = require('../models/index');
const { checkLoginStatus } = require('../utils/logging-handler');

router.get('/', (req, res) => {
  res.render('homepage');
})

router.get('/dashboard', checkLoginStatus, async (req, res) => {
  res.render('dashboard');
})

router.get('/login',(req, res) => {
  res.render('login');
})

router.get('/sign-up', async (req, res) => {
  res.render('sign-up')
})

module.exports = router;