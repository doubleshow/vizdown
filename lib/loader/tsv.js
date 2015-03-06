var fs = require('fs'),
    _ = require('lodash'),
    tsv = require('tsv')

module.exports = function(input, options) {
    var tsv_string = fs.readFileSync(input, 'utf8')
    return tsv.parse(tsv_string)
}