const mongoose = require('mongoose')
const Shortener = require('../shortener.model')

const shortenerSaveHelper = (data,res) => {

  const shortener = new Shortener(data);

  shortener.save((err,short) => {

    console.log(short)

    if(err){

      throw err;

    }

    res.json({

      "original_url": short.url,
      "short_url": short.short
      // "array": shortLinks

    })

  })

}

module.exports = shortenerSaveHelper;
