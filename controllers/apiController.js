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

  const shortLinks = [''];

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

        if(shortLinks.includes(urlBody)){

          shortIndex = shortLinks.indexOf(urlBody);

        }else{

          shortIndex = shortLinks.push(urlBody) - 1;

        }

        res.json({

          "original_url": urlBody,
          "short_url": shortIndex
          // "array": shortLinks

        })

      }).catch(err => {

        if(err) res.json(errJSON)

      })

    }

  }

  const getShortener = (req,res) => {

    const { id } = req.params;

    res.json({
      'url': shortLinks[id]
    })

  }

  return {

    shortener,
    getShortener

  }

}

module.exports = apiController();