var assert = chai.assert
var expect = chai.expect
var should = chai.should()

describe('Smart constructor', function() {

  it('Should return a new instance when calling Galleria(node)', function() {
    var inst = Galleria(document.body)
    assert(inst instanceof Galleria)
  })

})