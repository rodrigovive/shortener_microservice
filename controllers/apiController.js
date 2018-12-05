const dns = require('dns')
const url = require('url')
const shortenerSaveHelper = require('../models/helper/shortener.save');
const { shortenerFindByShort } = require('../models/helper/shortener.find')

const readDnsLink = (link,cb = () => {}) => {

  return new Promise((resolve,reject) => {

    dns.lookup(link,(err, address) => {

      if (err) {

        reject(err)

        return cb(err);
      }

      resolve(address);

      cb(null, address);

    })

  })

}

const apiController = () => {

  const shortener = (req,res) => {

    const protocol = ['http:','https:']

    const { body : { url: urlBody } } = req;

    const link = url.parse(urlBody)

    const errJSON = {

      "error": "invalid URL"

    }

    if( ! (protocol.includes(link.protocol) && link.host && link.hostname )){

      res.json(errJSON);

    }else{

      readDnsLink(link.host).then(address => {

        let shortIndex;

        shortenerSaveHelper({

          "url": urlBody,

        },res);

      }).catch(err => {

        if(err) res.json(errJSON)

      })

    }

  }

  const getShortener = (req,res) => {

    const { id } = req.params;

    if(Number.isInteger(id)){

      shortenerFindByShort({

        short: id

      },res)

    }else{

     res.json({
       'error': 'It should be number'
     })

    }

  }

  return {

    shortener,
    getShortener

  }

}

module.exports = apiController();