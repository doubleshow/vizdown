var jade = require('jade')

module.exports = function(data, options) {


  var max = Math.max.apply(null, data)
  var colors = options.colors || []
  var widths = options.widths || []
  var bars = []
  data.forEach(function(d, i) {
      var bar = {}
      bar.y = d/max*100
      bar.w = widths[i] || 60
      if (colors[i]){
        bar.color = colors[i]
      }
      bars.push(bar)
  })

  var html = jade.renderFile(__dirname + '/templates/barchart.jade', {
      data: bars,
      title: options.title,
      padding: options.padding || 80,
      width: 800
  })
  // console.log(html)

  return html
}
