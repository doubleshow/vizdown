var jade = require('jade')

module.exports = function(data, options) {
    options = typeof options !== 'undefined'
      ? options : {color:'rgb(255, 0, 0)'};
    var items = []
    var radius = []

    if (Array.isArray(data[0])) {
      for(var i = 0; i < data.length; i++) {
        items.push(data[i][0])
        radius.push(data[i][1])
      }
    } else {
      items = data
      for(var i = 0; i <= data.length; i++) {
        radius.push(2)
      }
    }

    var html = jade.renderFile(__dirname + '/templates/linegraph.jade', {
        data: items,
        radius: radius,
        color: options.color
    })
    // console.log(html)

    return html
}
