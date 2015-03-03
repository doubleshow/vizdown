var marked = require('marked'),
    parseContext = require('code-context'),
    _ = require('lodash'),
    addWith = require('with')

module.exports = render

function _generate_script(blocks) {
    var script = ''

    blocks.forEach(function(block) {

        if (block.type === 'text') {

            script = script + '\n' + '__render__("' + block.content + '", __scope__())' //, __scope__)'

        } else if (block.type === 'code') {

            script = script + '\n' + block.content

        }
    })

    return script
}

function render(blocks) {

    var script = _generate_script(blocks)
    // console.log(script)

    var context = parseContext(script)
    var declarations = _.filter(context, {
        type: 'declaration'
    })

    function __render__(text, scope) {
        _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
        var compiled = _.template(text)        
        return compiled(scope)
    }

    function __scope__() {
        var o = {}
        // for each declaration, extract the var to the scope        
        declarations.forEach(function(d) {
            o[d.name] = eval(d.name)
        })
        return o
    }

    return eval(script)
}