var render = require('./render'),
    parse = require('./parse'),
    jade = require('jade')

module.exports =  function(text){
    var parsed = parse(text)
    var rendered = render(parsed)
    return jade.renderFile(__dirname + '/layout.jade', {content: rendered})    
}