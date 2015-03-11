var jade = require('jade')
var formatter = require('./formatter')

module.exports = function(data, options) {

  var chart_width  = options.width || 800
  var chart_height = options.height || 200

  //Set some default functions and define a scale.
  var scale_ratio = 1

  var x = data[0]
  var y = data[1]

  console.log(x)

  //Scale the data to fit the range
  if (!options.no_scale){
    ys = formatter.scale_to_range(y, 0, chart_height)
    y_data = ys.scaled_data
    y_scale_ratio = ys.scale_ratio

    xs = formatter.scale_to_range(x, 0, chart_width)
    x_data = xs.scaled_data
    x_scale_ratio = xs.scale_ratio
  }

  var points = []
  y_data.forEach(function(d,i){
    points.push({y:d, x:parseFloat(x_data[i]), r:3, color: 'blue'})
  })

  console.log(points)

  var html = jade.renderFile(__dirname + '/templates/linegraph.jade', {
      data: points,
      line_color: 'red',
      line_width: 1,
      chart_width:  chart_width,
      chart_height: chart_height,

      min_tick: options.min_tick || 1,
      maj_tick: options.maj_tick || 10,
      x_min:    options.x_min_tick || 1,
      x_maj:    options.x_maj_tick || 10,

      custom_x : options.custom_x  || false,

      padding: options.padding     || 80,
      padding_b: options.padding_b || 50,
      padding_t: options.padding_t || 25,
      padding_r: options.padding_r || 25,

      rotation: options.text_rotation || 0,
      width_padding: options.width_padding || 0,
      y_label_text : options.y_label || '',
      x_label_text : options.x_label || '',
      y_scale      : y_scale_ratio,
      x_scale      : x_scale_ratio
  })
  //console.log(html)

  return html
}
