var jade = require('jade')

module.exports = function(data, options) {
  var header
  var rows = []
  var grid

  if (typeof options === 'undefined') {
    grid = true
  } else if (typeof options.grid === 'undefined') {
    grid = true
  } else {
    grid = options.grid
  }

  if (Array.isArray(data[0])) {
    header = options.header
    rows = data
  } else {
    header = Object.keys(data[0])
    for (var i = 0; i < data.length; i++) {
      rows.push(Object.keys(data[i]).map(function(key){return data[i][key]}))
    }
  }

  var html = jade.renderFile(__dirname + '/templates/table.jade', {
      header: header,
      data: rows,
      grid: grid
  })
  // console.log(html)

  return html
}
