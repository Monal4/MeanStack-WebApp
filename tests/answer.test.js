const chai = require("chai"),
    expect = chai.expect,
    assert = require("assert")
    
var Answer = require("../models/answer")



describe('Answer model', () => {
    it('it should return error if required data is missing', (done) => {
        let answer = new Answer()
        expect(answer).to.have.property('exceptTime').to.not.exist
        done()
    })
    
    it('should have optional exceptTime property', (done) => {
        let answer = new Answer({
            exceptTime: '23.000000087',
        })
        expect(answer).to.have.property('exceptTime').to.equal('23.000000087')
        done()
    })
    
    it('should have optional totalAnswerTime property', (done) => {
        let answer = new Answer({
            totalAnswerTime: '83.000000087',
        })
        expect(answer).to.have.property('totalAnswerTime').to.equal('83.000000087')
        done()
    })
    
    it('should have optional totalAnswerTime property', (done) => {
        let answer = new Answer({
            exceptTime: '23.000000087',
            totalAnswerTime: '83.000000087',
        })
        expect(answer).to.have.property('exceptTime').to.equal('23.000000087')
        expect(answer).to.have.property('totalAnswerTime').to.equal('83.000000087')
        done()
    })
    
    
    it('Testing assertion', () => {
        assert.equal(1, 1)
    })
})
