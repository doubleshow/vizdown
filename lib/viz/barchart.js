var jade = require('jade')

module.exports = function(data, options) {
    if (options.normalize) {
      var min = Math.min.apply(Math, data)
      var max = Math.max.apply(Math, data)
      var range = max - min
      var step = options.normalize / range
      var normalized = []

      for (var i = 0; i < data.length; i++) {
        normalized.push((data[i] - min) * step)
      }
      data = normalized
    }

    var html = jade.renderFile(__dirname + '/templates/barchart.jade', {
        data: data,
        title: options.title,
        highlight: options.highlight,
        c: options.color,
        a: options.alter,
        w: options.barWidth,
        m: options.barMargin,
        gw: options.graphWidth,
        gh: options.graphHeight
    })

    return html
}
