var chai = require('chai'),
    inspect = require('eyes').inspector(),
    fs = require('fs')

chai.should()

var render = require('../lib/render')

function text(content) {
    return {
        type: 'text',
        content: content
    }
}

function code(content) {
    return {
        type: 'code',
        content: content
    }
}

function jade(content) {
    return {
        type: 'jade',
        content: content
    }
}

describe('render()', function() {

    it('a single line of text', function() {

        var blocks = [text('hello world')]

        var rendered = render(blocks)
        inspect(rendered)

        rendered.should.contain('hello world')
    })

    it('some text with {{foo}}', function() {

        var blocks = [code('var foo = "world"'), text('hello {{foo}}')]

        var rendered = render(blocks)
        inspect(rendered)

        rendered.should.contain('hello world')
    })

    it('some text with {{foo}} and {{bar}}', function() {

        var blocks = [code('var foo = "hello"\n var bar="world"'), text('{{foo}} {{bar}}')]

        var rendered = render(blocks)
        inspect(rendered)

        rendered.should.contain('hello world')
    })

    it('shopping list', function() {

        var blocks = [code('var list = ["apple","orange","banana"]'),
            text('My shopping list has {{list.length}} items')
        ]

        var rendered = render(blocks)
        inspect(rendered)
    })

    it('jade', function() {

        var blocks = [code('var foo = "hello world"'),
            jade('p= foo')
        ]

        var rendered = render(blocks)
        inspect(rendered)
    })

    describe('viz', function() {
        it('barchart', function() {

            var blocks = [code('var list = [50, 20, 30]'),
                text('This is how income increases over the years'),
                code('viz.barchart(list)')
            ]

            var rendered = render(blocks)
            inspect(rendered)
        })
    })



})