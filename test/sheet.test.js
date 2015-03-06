var chai = require('chai'),
    inspect = require('eyes').inspector(),
    fs = require('fs')

chai.should()

var sheet = require('../lib/sheet'),
    loader = require('../lib/loader')

describe('sheet()', function() {

    it('loading tsv', function() {

        //var blocks = [text('hello world')]

        // var data = loader.tsv('examples/ebird/ebird1k.txt')

        // console.log(data)
        var s = sheet()
        s.load('examples/ebird/ebird1k.txt')
        // inspect(data[0])
        // console.log(s.total())
        console.log(s.select(['COMMON NAME']))
        console.log(s.show())
        // console.log(s.countBlank())



        // var rendered = render(blocks)
        // inspect(rendered)

        // rendered.should.contain('hello world')
    })
})