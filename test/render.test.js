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

describe('render()', function() {

    it('a single line of text', function() {

        var blocks = [text('hello world')]

        var rendered = render(blocks)
        inspect(rendered)

        rendered.should.be.equal('hello world')
    })

    it('some text with {{foo}}', function() {

        var blocks = [code('var foo = "world"'), text('hello {{foo}}')]

        var rendered = render(blocks)
        inspect(rendered)

        rendered.should.be.equal('hello world')
    })

    it('some text with {{foo}} and {{bar}}', function() {

        var blocks = [code('var foo = "hello"\n var bar="world"'), text('{{foo}} {{bar}}')]

        var rendered = render(blocks)
        inspect(rendered)

        rendered.should.be.equal('hello world')
    })

})