
const plugin = function autoincrementShort(schema, options) {

  schema.pre('save', function(next) {

    module.parent.exports.find({_id: 'entityId'}, {$inc: { short: 1} }, {new: true, upsert: true})
    .exec()
    .then(function(shortener) {
      console.log("...count: "+JSON.stringify(shortener));
      process.exit(1);
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