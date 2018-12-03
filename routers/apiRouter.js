const express = require('express')

const apiController = require('../controllers/apiController')

const apiRouter = express.Router();

function router() {

  apiRouter.post('/shorturl/new',apiController.shortener)
  return apiRouter;

}

module.exports = router();