var jade = require('jade')

module.exports = function(data, options) {
    options.xScale = (options.graphWidth-options.cr)
                     / Math.abs(options.xRange[0] - options.xRange[1]);
    options.yScale = (options.graphHeight-options.cr)
                     / Math.abs(options.yRange[0] - options.yRange[1]);

    var html = jade.renderFile(__dirname + '/templates/scatterplot.jade', {
        data: data
      , gw: options.graphWidth
      , gh: options.graphHeight
      , xs: options.xScale
      , ys: options.yScale
      , xlow: options.xRange[0]
      , ylow: options.yRange[0]
      , cr: options.cr
      , cc: options.cc
    })
    return html
}
