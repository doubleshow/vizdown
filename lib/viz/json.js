module.exports = function(data) {

    var html = '<pre>'
    html = html + JSON.stringify(data, null, ' ')
    html = html + "</pre>"    
    // console.log(html)    
    return html
}