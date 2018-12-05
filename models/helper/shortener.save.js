const mongoose = require('mongoose')
const Shortener = require('../shortener.model')

const shortenerSaveHelper = (data,res) => {

  Shortener.findOne({
    $or: [
      {
        url: data.url
      }
    ]
  })
  .exec()
  .then(function(shortenerFind) {

    if(shortenerFind){

      res.json({

        "original_url": shortenerFind.url,
        "short_url": shortenerFind.short

      })

    }else{

      const shortener = new Shortener(data);

      shortener.save((err,short) => {

        if(err){
          throw err;
        }

        res.json({

          "original_url": short.url,
          "short_url": short.short

        })

      })

    }



  }).catch(function(error) {

    throw error;

  })

}

module.exports = shortenerSaveHelper;
