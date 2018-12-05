const mongoose = require('mongoose');
const Shortener = require('../shortener.model');

const shortenerFindByShort = (data, res) => {

  Shortener.findOne({
    $or:
        [
          {
            short: data.short,
          },
        ],
  }).exec().then(function(link) {

    if (link) {

      res.redirect(link.url)

    } else {

      res.json({

        'error': 'Not found',

      });

    }

  }).catch(function(err) {

    console.log(err);

    res.json({

      'error': 'Error found',

    });

  });

};

module.exports = {

  shortenerFindByShort,

};