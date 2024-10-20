const router = require("express").Router();
const { User } = require("../../models/index");

router.post("/login", async (req, res) => {
  try {
    // Query db for user based on passed username
    const user = await User.findOne({
      where: {
        user_name: req.body.username,
      },
    });

    // Guard clause for no username found
    if (user == false) {
      sendInvalidCredentailsResponse(res);
      return;
    }

    // Check password is valid
    const passwordValid = await user.checkPassword(req.body.password);

    // Guard clause for invalid password
    if (passwordValid == false) {
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
      });
    });
  } catch (err) {
    // Return error code and message
    res.status(400).json(err);
  }
});

router.post("/sign-up", async (req, res) => {
  try {
    // Query db for user based on passed username
    const user = await User.create({
      user_name: req.body.username,
      password: req.body.password,
    });

    if(user){
      res.status(200).json({
        signup_successful: true,
      });
    }
    else {
      res.status(400).send();
    }
  } catch (err) {
    // Return error code and message
    res.status(400).json(err);
  }
});

router.post('/logout', async (req, res) => {
    if(req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      })
    }
    else {
      res.status(400).end();
    }
});


// Helper Functions
// =====================
function sendInvalidCredentailsResponse(res) {
  res.status(400).json({
    login_successful: false,
    error: "Incorrect username or password. Please try again.",
  });
}

module.exports = router;