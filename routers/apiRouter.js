const express = require('express')

const apiRouter = express.Router();


function router() {

  apiRouter.post('/shorturl/new',(req,res)=>{

    res.json('test');
  })
  return apiRouter;

}

module.exports = router();