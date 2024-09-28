
function checkLoginStatus(req, res, next) {

  if(req.session.logged_in == true) {
    next();
  }
  else {
    res.redirect('/login');
    res.end();
  }
}

module.exports = { checkLoginStatus }