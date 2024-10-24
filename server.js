const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers/index');
// const helpers = require('./utils');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Create express app
const app = express();

// Dynamically set port
const PORT = process.env.PORT || 3001;

// Create session object and pass to express app
const sessionObject = {
  secret: "Tech Blog Secret",
  cookie: {
    expires: 120000 // Set cookie to expire after 2 minutes
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sessionObject));

// Create handlebars object and set as app engine
const hbs = exphbs.create()

hbs.handlebars.registerHelper("formatDate", function(date) {
  return date.toLocaleDateString('en-US', {hour: 'numeric', minute: 'numeric'});
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Use express native json middleware
app.use(express.json());
// Use express native url encoding
app.use(express.urlencoded({ extended: true}));

// Set folder for public resources
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use(routes);

// Start server
sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))
})