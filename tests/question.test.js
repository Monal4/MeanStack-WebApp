const chai = require("chai"),
    expect = chai.expect,
    assert = require("assert")
    
var Question = require("../models/question")


describe('Question model', () => {
    it('it should return error if required data is missing', (done) => {
        let question = new Question()
        expect(question).to.have.property('instruction').to.not.exist
        done()
    })
    
    it('should have optional text property', (done) => {
        let question = new Question({
            text: 'text data',
            instruction: 'foo',
            image: 'www.cloudinary.com/images/22673636d2.jpg',
            groupQuestion: 'G7'
        })
        expect(question).to.have.property('text').to.equal('text data')
        done()
    })
    
    it('should have optional instruction property', (done) => {
        let question = new Question({
            text: 'text data',
            instruction: 'foo',
            image: 'www.cloudinary.com/images/22673636d2.jpg',
            groupQuestion: 'G7'
        })
        expect(question).to.have.property('instruction').to.equal('foo')
        done()
    })
    
    it('should have optional image property', (done) => {
        let question = new Question({
            text: 'text data',
            instruction: 'foo',
            image: 'www.cloudinary.com/images/22673636d2.jpg',
            groupQuestion: 'G7'
        })
        expect(question).to.have.property('image').to.equal('www.cloudinary.com/images/22673636d2.jpg')
        expect(question).to.have.property('text').to.equal('text data')
        done()
    })
    
    it('should have optional groupQuestion property', (done) => {
        let question = new Question({
            text: 'text data',
            instruction: 'foo',
            image: 'www.cloudinary.com/images/22673636d2.jpg',
            groupQuestion: 'G7'
        })
        expect(question).to.have.property('groupQuestion').to.equal('G7')
        done()
    })
    
    it('Testing assertion', () => {
        assert.equal(1, 1)
    })
})
