var fs = require('fs'),
    _ = require('lodash')

module.exports = function(input, options) {

    if (options && options.multiLines) {
        var text = fs.readFileSync(input, 'utf8')
        return _.compact(text
            .split('\n')
            .map(function(line) {
                if (line) {
                    return JSON.parse(line)
                }
            }))
    }

}