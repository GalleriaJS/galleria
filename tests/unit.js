var assert = chai.assert
var expect = chai.expect
var should = chai.should()

describe('Testing tests', function() {

  it('Should append an empty div', function() {
    Galleria(document.body, { data: [1] }) 
    assert.equal(document.body.lastChild.className, 'image')
  })

})