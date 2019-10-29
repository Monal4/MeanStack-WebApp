const chai = require("chai"),
    expect = chai.expect,
    assert = require("assert")
    
var Survey = require("../models/survey")

    
describe('User model', () => {
    it('it should return error if required data is missing', (done) => {
        let survey = new Survey()
        expect(survey).to.have.property('name').to.not.exist
        done()
    })
    
    it('should have optional name property', (done) => {
        let survey = new Survey({
            name: 'survey1',
            startdate: '02/23/2018',
            enddate: '03/23/2018',
            featuredSurveys: true,
            publicSurvey: false,
            hideRespondentsNav: true,
            topic: "topic name"
        })
        expect(survey).to.have.property('name').to.equal('survey1')
        done()
    })
    
    it('should have optional startdate property', (done) => {
        let survey = new Survey({
            name: 'survey1',
            startdate: '02/23/2018',
            enddate: '03/23/2018',
            featuredSurveys: true,
            publicSurvey: false,
            hideRespondentsNav: true,
            topic: "topic name"
        })
        expect(survey).to.have.property('startdate').to.equal('02/23/2018')
        done()
    })
    
    it('should have optional enddate property', (done) => {
        let survey = new Survey({
            name: 'survey1',
            startdate: '02/23/2018',
            enddate: '03/23/2018',
            featuredSurveys: true,
            publicSurvey: false,
            hideRespondentsNav: true,
            topic: "topic name"
        })
        expect(survey).to.have.property('enddate').to.equal('03/23/2018')
        done()
    })
    
    it('should have optional featuredSurveys property', (done) => {
        let survey = new Survey({
            name: 'survey1',
            startdate: '02/23/2018',
            enddate: '03/23/2018',
            featuredSurveys: true,
            publicSurvey: false,
            hideRespondentsNav: true,
            topic: "topic name"
        })
        expect(survey).to.have.property('featuredSurveys').to.equal(true)
        done()
    })
    
    it('should have optional publicSurvey property', (done) => {
        let survey = new Survey({
            name: 'survey1',
            startdate: '02/23/2018',
            enddate: '03/23/2018',
            featuredSurveys: true,
            publicSurvey: false,
            hideRespondentsNav: true,
            topic: "topic name"
        })
        expect(survey).to.have.property('publicSurvey').to.equal(false)
        done()
    })
    
    it('should have optional hideRespondentsNav property', (done) => {
        let survey = new Survey({
            name: 'survey1',
            startdate: '02/23/2018',
            enddate: '03/23/2018',
            featuredSurveys: true,
            publicSurvey: false,
            hideRespondentsNav: true,
            topic: "topic name"
        })
        expect(survey).to.have.property('hideRespondentsNav').to.equal(true)
        done()
    })
    
    it('should have optional topic property', (done) => {
        let survey = new Survey({
            name: 'survey1',
            startdate: '02/23/2018',
            enddate: '03/23/2018',
            featuredSurveys: true,
            publicSurvey: false,
            hideRespondentsNav: true,
            topic: "topic name"
        })
        expect(survey).to.have.property('topic').to.equal('topic name')
        done()
    })
    
    it('should have optional all properties', (done) => {
        let survey = new Survey({
            name: 'survey1',
            startdate: '02/23/2018',
            enddate: '03/23/2018',
            featuredSurveys: true,
            publicSurvey: false,
            hideRespondentsNav: true,
            topic: "topic name"
        })
        expect(survey).to.have.property('name').to.equal('survey1')
        expect(survey).to.have.property('startdate').to.equal('02/23/2018')
        expect(survey).to.have.property('topic').to.equal('topic name')
        expect(survey).to.have.property('hideRespondentsNav').to.equal(true)
        expect(survey).to.have.property('publicSurvey').to.equal(false)
        expect(survey).to.have.property('featuredSurveys').to.equal(true)
        expect(survey).to.have.property('enddate').to.equal('03/23/2018')
        done()
    })
    
    
    
    it('Testing assertion', () => {
        assert.equal(1, 1)
    })
})
