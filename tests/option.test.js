const chai = require("chai"),
    expect = chai.expect,
    assert = require("assert")
    
var Option = require("../models/option")


describe('Option model', () => {
    it('it should return error if required data is missing', (done) => {
        let option = new Option()
        expect(option).to.have.property('content').to.not.exist
        done()
    })
    
    it('should have optional content property', (done) => {
        let option = new Option({
            question: 'foo',
            content: 'this is content',
        })
        expect(option).to.have.property('content').to.equal('this is content')
        done()
    })
    
    it('Testing assertion', () => {
        assert.equal(1, 1)
    })
})
