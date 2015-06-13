var marked = require('marked'),
    parseContext = require('code-context'),
    addWith = require('with'),
    jade = require('jade')

// These are meant to be available in a template
var _ = require('lodash')
require('lodash-math')(_)

var _viz = require('./viz')
var loader = require('./loader')
var corr = require('./corr')

// load sheet plugin
var sheet = require('./sheet')
var s = sheet()
var load = s.load
var select = s.select
var top = s.top
var reset = s.reset
var sortBy = s.sort
var groupBy = s.groupBy
var filterBy = s.filterBy
var sum = s.sum

module.exports = render

function _generate_script(blocks) {
    var script = ''

    blocks.forEach(function(block) {

        if (block.type === 'text') {

            script = script + '\n' + '__render__(' + JSON.stringify(block.content) + ', __scope__())'

        } else if (block.type === 'code') {

            script = script + '\n' + '__code__(' + JSON.stringify(block.content) + ')'
            script = script + '\n' + block.content
        } else if (block.type === 'jade') {

            script = script + '\n' + '__jade__(' + JSON.stringify(block.content) + ', __scope__())'
        } else if (block.type === 'c3') {
            script = script + '\n' + '__c3__(' + JSON.stringify(block.content) + ')'
        } else if (block.type === 'style') {
            script = script + '\n' + '__style__(' + JSON.stringify(block.content) + ')'
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

    var html = ''

    function __render__(text, scope) {
        _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
        var compiled = _.template(text)
        html = html + '\n' + marked(compiled(scope))
    }

    function __code__(code) {
        html = html + '\n' + '<pre>' + code + '</pre>'
        html = html + '\n' + '<script>' + code + '</script>'
    }

    function __jade__(text, scope) {
        html = html + '\n' + jade.render(text, scope)
    }

    var chartNumber = 0
    function __c3__(code) {
        html = html + '\n' + '<pre>' + code + '</pre>'
        html = html + '<div id="chart' + chartNumber + '"></div>\n'
        if(code.indexOf('getJSON') >= 0){
          url = code.match(/\((.*?)\)/)[1]
          getJSONLine = "getJSON(" + url + ")."
          code = code.replace(getJSONLine,
                   '$.' + getJSONLine + 'done(function(response) {\n')
          code = '(function() {\n' + code
          code = code + '})\n})()\n'
        }
        html = html + '<script>\n'
        code = code.replace("c3.generate({",
                            "c3.generate({bindto: '#chart"
                            + chartNumber + "',")
        html = html + '\n' + code
        html = html + '</script>\n'
        chartNumber += 1
    }

    function __style__(code) {
        html = html + '\n' + '<pre>' + code + '</pre>'
        html = html + '\n' + '<style>\n.markdown-body{\n'
             + code + '\n}\n</style>'
    }

    function __scope__() {
        var o = {
            '_': _,
            'viz': _viz
        }
            // for each declaration, extract the var to the scope        
        declarations.forEach(function(d) {
            o[d.name] = eval(d.name)
        })
        return o
    }

    var show = function(){
        html = html + s.show()
    }

    // import viz methods to scope
    var viz = {}
    for (var p in _viz) {
        eval('viz.' + p + ' = function(data, options){ html = html + \'\\n\' + _viz.' + p + '(data,options)}')
    }
    eval(script)
    return html
}
