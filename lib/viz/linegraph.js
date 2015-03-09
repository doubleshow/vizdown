var jade = require('jade')

module.exports = function(data, options) {

  var points = []
  data.forEach(function(d, i) {
    var pt = {
        x: i*5,
        y: d,
        r: 3,
        color: 'blue'
    }
    points.push(pt)
  })

  console.log(points)

  var html = jade.renderFile(__dirname + '/templates/linegraph.jade', {
      data: points,
      title: options.title,
      line_color: 'red',
      line_width: 1,
      width: 200
  })
  //console.log(html)

  return html
}
