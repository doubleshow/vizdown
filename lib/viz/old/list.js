var jade = require('jade')

module.exports = function(data){
    return jade.renderFile(__dirname + '/templates/list.jade', {data: data})
}