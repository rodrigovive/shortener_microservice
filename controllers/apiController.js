const dns = require('dns')
const url = require('url')

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

    const { body : { url: urlBody } } = req;

    const link = url.parse(urlBody)

    readDnsLink(link.host).then(address => {

      res.json(address)

    }).catch(err => {

      if(err) res.json({

        "error": "invalid URL"

      })

    })

  }

  return {
    shortener
  }

}

module.exports = apiController();