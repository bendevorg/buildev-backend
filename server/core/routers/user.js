const express = require('express');
const router = express.Router();
const middleware = require('../../controllers/userMiddleware');
const retrieveControllers = require('../../utils/retrieveControllers');
const path = require('path');

const controllers = retrieveControllers(
  path.basename(__filename).split('.')[0]
);

//  Auth API
router.get('/', middleware, controllers.userInfo);
router.patch('/', middleware, controllers.updateUser);

module.exports = router;
