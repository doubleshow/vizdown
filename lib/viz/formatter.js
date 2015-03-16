var _ = require('lodash')

module.exports = {

  scale_to_range: function(values, start, end){
    var range = end-start
    var max = Math.max.apply(null, values)

    return {scaled_data: _.map(values, function(x){
      return (parseFloat(x)/max * range+start).toFixed(2)
    }), scale_ratio: (parseFloat(range)/max)}
  },

  scale: function(x){
    console.log(x)
  }

}
