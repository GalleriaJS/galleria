var server = require('webserver').create()
var fs = require('fs')
var address = '127.0.0.1:8000'

var p = function(name) {
  return 'http://'+address+'/'+name
}

var service = server.listen(address, function(request, response) {
  response.writeHead(200, { 'Content-Type': 'text/html' })
  response.statusCode = 200;
  response.write(fs.read('./tests/cases'+request.url+'.html'))
  response.close();
})

// HELLO
casper.test.begin('Check the title', 1, function suite(test) {
  casper.start( p('hello'), function() {
    test.assertTitle("YO", "Title is the one expected")
  })
  casper.run(function() {
    test.done()
  })
})

// H1
casper.test.begin('Check the h1', 1, function suite(test) {
  casper.start( p('hello'), function() {
    casper.waitForSelector('h1', function() {
      test.assertEqual(this.fetchText('h1'), 'Hello')
    })
  })
  casper.run(function() {
    test.done()
  })
})