var viz = {}

// svg
viz.circles = require('./circles')
viz.barchart = require('./barchart')
viz.linegraph = require('./linegraph')
viz.scatterplot = require('./scatterplot')

// html
viz.table = require('./table')
viz.list = require('./list')
viz.json = require('./json')

module.exports = viz