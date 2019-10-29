const chai      = require("chai"),
    expect      = chai.expect,
    assert      = require("assert"),
    request     = require('supertest'),
    app         = require("express"),
    router      = app.Router({mergeParams: true}) 
    
var User = require("../models/user")
var Survey  = require("../models/survey")
var mongoose = require('mongoose')


it('should take less than 500ms', function(done){
    this.timeout(500)
    setTimeout(done, 300)
});

describe('login router test', () => {
     it('404 not found', (done) => {
        request(app)
            .get('/api/books')
            .expect(404, "ok")
            done()
    })

    it('GET /login', (done) => {
        request(app)
            .get('/login')
            .expect('GET', done)
            done()
    })

})

describe('GET /survey', function(){
  it('respond with json', function(done){
    request(app)
      .get('/survey/:id')
      .set('Accept', 'application/json')
      .expect(200)
      done()
  })
})