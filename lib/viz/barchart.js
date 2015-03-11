var jade = require('jade')
var formatter = require('./formatter')

module.exports = function(data, options) {

  var chart_width  = options.width || 800
  var chart_height = options.height || 200

  //Set some default functions and define a scale.
  var colors = options.colors || []
  var widths = options.widths || []
  var labels = options.labels || []
  var bars = []
  var scale_ratio = 1

  //Scale the data to fit the range
  if (!options.no_scale){
    s = formatter.scale_to_range(data, 0, chart_height)
    data = s.scaled_data
    scale_ratio = s.scale_ratio
  }

  data.forEach(function(d, i) {
      var bar = {}
      bar.y = d
      bar.x = labels[i] || i
      bar.w = widths[i] || 60
      if (colors[i]){
        bar.color = colors[i]
      }
      bars.push(bar)
  })

  var html = jade.renderFile(__dirname + '/templates/barchart.jade', {
      data: bars,
      chart_width:  chart_width,
      chart_height: chart_height,

      min_tick: options.min_tick || 1,
      maj_tick: options.maj_tick || 10,

      padding: options.padding     || 80,
      padding_b: options.padding_b || 50,
      padding_t: options.padding_t || 25,
      padding_r: options.padding_r || 25,

      text_rotation: options.text_rotation || 0,
      width_padding: options.width_padding || 0,
      y_label_text : options.y_label || '',
      y_scale      : scale_ratio
  })
  // console.log(html)

  return html
}
