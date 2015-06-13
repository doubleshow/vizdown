var jade = require('jade')

module.exports = function(data) {

    var circles = []

    data.forEach(function(d, i) {
        var circle = {
            x: 50 + 50 * i,
            y: 50,
            r: d
        }
        circles.push(circle)
    })

    var html = jade.renderFile(__dirname + '/templates/circles.jade', {
        data: circles,
        h: 150,
        w: 500
    })
    // console.log(html)

    return html
}