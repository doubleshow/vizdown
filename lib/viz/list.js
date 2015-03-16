var jade = require('jade')

module.exports = function(data) {

    var html = jade.renderFile(__dirname + '/templates/list.jade', {
        data: data
    })
    // console.log(html)

    return html
}
