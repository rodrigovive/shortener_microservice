const plugin = function autoincrementShort(schema, options) {

  schema.pre('save', function(next) {

    const data = this;

    module.parent.exports.find().sort({_id:-1}).limit(1)
    .exec()
    .then(function(shortener) {

      data.short = shortener[0].short + 1;
      next();

    })
    .catch(function(error) {
      throw error;
    });

  })

}

module.exports = plugin;