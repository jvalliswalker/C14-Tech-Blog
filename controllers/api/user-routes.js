const router = require('express').Router();
const { User } = require('../../models/index');


router.post('/login', async (req, res) => {
  try{
    // Query db for user based on passed username
    const user = await User.findOne({where: {
      username: req.body.username
    }});

    // Guard clause for no username found
    if(user == false){
      sendInvalidCredentailsResponse(res);
      return;
    }

    // Check password is valid
    const passwordValid = await user.checkPassword(req.body.password);

    // Guard clause for invalid password
    if(passwordValid == false){
      sendInvalidCredentailsResponse(res);
      return;
    }

    // Store user Id and logged-in status to session
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;

      // Return success object
      res.json({
        login_successful: true,
        message: 'Login successful'
      })
    })

  }
  // Return error code and message
  catch (err) {
    res.status(400).json(err);
  }
})

// Helper Functions
// =====================
function sendInvalidCredentailsResponse(res){
  res.status(400).json({
    login_successful: false,
    message: 'Incorrect username or password. Please try again.'}
  );
}


module.exports = router;