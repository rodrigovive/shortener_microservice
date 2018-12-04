const express = require('express')

const apiController = require('../controllers/apiController')

const apiRouter = express.Router();

function router() {

  apiRouter.post('/shorturl/new',apiController.shortener)

  apiRouter.get('/shorturl/:id',apiController.getShortener)

  return apiRouter;

}

module.exports = router();