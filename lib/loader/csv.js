var fs = require('fs'),
    csvrow = require('csvrow');

module.exports = function(input, options) {
  var string = fs.readFileSync(input, 'utf8')


  lines = string.split('\n')
  var keys = lines.shift().split(',')
  result = []
  lines.forEach(function(line){

    this_row = {}
    csvrow.parse(line).forEach(function(column, index){
      this_row[keys[index]] = column
    })
    result.push(this_row)
  })
  return result
}
