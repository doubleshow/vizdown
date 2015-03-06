var chai = require('chai'),
    inspect = require('eyes').inspector(),
    fs = require('fs')

chai.should()

var parse = require('../lib/parse')

describe('parse()', function() {

    it('single line of text', function() {

        var text = 'hello world'
        var parsed = parse(text)
        inspect(parsed)

        parsed.should.have.length(1)

    })

    it('two lines of text', function() {

        var text = 'line 1\n line 2\n'
        var parsed = parse(text)
        inspect(parsed)

        parsed.should.have.length(1)

    })

    it('white spaces blocks are ignored', function(){
        var text = '\n\n\n'
        var parsed = parse(text)
        inspect(parsed)

        parsed.should.have.length(0)
    })

    it('some text, some code', function() {

        var text = 'line 1\n line 2\n line 3\n ```\n some code \n ```'
        var parsed = parse(text)
        inspect(parsed)

        parsed.should.have.length(2)

    })

    it('some code, some text, some code', function() {

        var text = '```\n some code \n```\ntext\n```\n more code\n```'
        var parsed = parse(text)
        inspect(parsed)

        parsed.should.have.length(3)
    })

    it('some code, some text, a jade template', function() {

        var text = '```\n some code \n```\ntext\n```jade\n doctype \n```'
        var parsed = parse(text)
        inspect(parsed)

        parsed.should.have.length(3)
    })


})