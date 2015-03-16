var _ = require('lodash')

module.exports = function(data, options) {
  var x_label = options.x_label || options.x
  var y_label = options.y_label || options.y

  to_return = []
  _.forEach(_.groupBy(data, options.x), function(data, label){
    if (label != ''){
      this_collection = _.map(_.compact(_.pluck(data, options.y)), parseFloat)
      this_entry = {}
      this_entry[x_label] = label

      if (options.op == 'average'){
        this_entry[y_label] = (_.sum(this_collection)/this_collection.length).toFixed(2)
      }
      else if (options.op == 'sum'){
        this_entry[y_label] = _.sum(this_collection).toFixed(2)
      }
      else if (options.op == 'count'){
        this_entry[y_label] = this_collection.length
      }
      to_return.push(this_entry)
    }
  })

  //If there is desire to sort the results by any field, then do that:
  if (options.sort){
    to_return = _.sortBy(to_return,function(n){
      if (!isNaN(n[options.sort]) || options.sortType=='num'){
        return parseFloat(n[options.sort])
      }else{
        return n[options.sort]
      }
    })
  }

  if (options.reverse){
    return _(to_return).reverse().value()
  }
  return to_return
}
