var jade = require('jade')

module.exports = function(data, options) {

  var points = []
  data.forEach(function(d){
    points.push({x:d[0], y:d[1], r:3})
  })

  var html = jade.renderFile(__dirname + '/templates/scatterplot.jade', {
    title: options.title,
    data: points,
    width: 500,
  })

  return html
}
