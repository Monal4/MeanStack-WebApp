const chai = require("chai"),
    expect = chai.expect,
    assert = require("assert")
    
var User = require("../models/user")


describe('User model', () => {
    it('it should return error if required data is missing', (done) => {
        let user = new User()
        expect(user).to.have.property('firstName').to.not.exist
        done()
    })
    
    it('should have optional firstName property', (done) => {
        let user = new User({
            firstName: 'foo',
            lastName: 'lfoo',
            username: 'foo@bar.com'
        })
        expect(user).to.have.property('firstName').to.equal('foo')
        done()
    })
    
    it('should have optional lastName property', (done) => {
        let user = new User({
            firstName: 'foo',
            lastName: 'lfoo',
            username: 'foo@bar.com'
        })
        expect(user).to.have.property('lastName').to.equal('lfoo')
        done()
    })
    
    it('should have optional username property', (done) => {
        let user = new User({
            firstName: 'foo',
            lastName: 'lfoo',
            username: 'foo@bar.com',
            isAdmin: false
        })
        expect(user).to.have.property('username').to.equal('foo@bar.com')
        expect(user).to.have.property('isAdmin').to.equal(false)
        done()
    })
    
    it('should have optional isAdmin property', (done) => {
        let user = new User({
            firstName: 'foo',
            lastName: 'lfoo',
            username: 'foo@bar.com',
            isAdmin: true
        })
        expect(user).to.have.property('isAdmin').to.equal(true)
        done()
    })
    
    it('Testing assertion', () => {
        assert.equal(1, 1)
    })
})
