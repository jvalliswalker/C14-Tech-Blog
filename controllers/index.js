const homeRoutes = require('./home-routes');
const apiRoutes = require('./api/index');
const router = require('express').Router();

router.use('/api', apiRoutes)
router.use('/', homeRoutes);

module.exports = router;