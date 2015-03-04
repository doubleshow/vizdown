module.exports = parse

function parse(text) {

    var currentBlock = {}

    // prepend a change line to ensure the first part is always non-code
    var text = '\n' + text

    var parts = text.split('```')

    // all the odd number parts are text
    // all the even number parts are codes
    var blocks = []
    parts.forEach(function(part, i){

        var block = {}
        block.content = part

        if (i % 2) {
            if (part.match(/^jade\n/)){
                block.type = 'jade'
                block.content = block.content.replace('jade\n','')
            } else {
                block.type = 'code'
            }
        } else {
            block.type = 'text'
        }
        
        // ignore blocks consisting entirely of whitespaces
        if (block.content.trim().length === 0){
            return
        }

        blocks.push(block)
    })

    return blocks
}