const Shortener = require('../shortener.model');

const plugin = function autoincrementShort(schema, options) {

  schema.pre('save', function(next) {

    Shortener.find({_id: 'entityId'}, {$inc: { short: 1} }, {new: true, upsert: true})
    .exec()
    .then(function(shortener) {
      console.log("...count: "+JSON.stringify(shortener));
      this.short = shortener.short;
      next();
    })
    .catch(function(error) {
      console.error("counter error-> : "+error);
      throw error;
    });

  })

}

module.exports = plugin;