const chai      = require('chai')
const expect    = chai.expect
const sinon     = require('sinon')
const sinonChai = require('sinon-chai')
chai.use(sinonChai)
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const rewire    = require('rewire')
const request   = require('supertest')

var index = rewire('../routes/index')
var users = require('../model/user')
var auth = require('../middleware/index')
var sandbox = sinon.sandbox.create()

describe('index', () => {
    afterEach(() => {
        index = rewire('./index')
        sandbox.restore()
    })

    describe('GET /', () => {
        it('should test / route', (done) => {
            request(index).get('/')
                .expect(200)
                .end((err, response) => {
                    expect(response.body).to.have.property('name').to.equal('fake Fooing Bar');
                    done(err);
                })
        })
    })

    describe('POST /user', () => {
        let createStub
        let errorStub

        it('should call user.create', (done) => {
            createStub = sandbox.stub(users, 'create').resolves({
                name: 'fake'
            })

            request(index).post('/user')
                .send({
                    name: 'fake'
                })
                .expect(200)
                .end((err, response) => {
                    expect(createStub).to.have.been.calledOnce
                    expect(response.body).to.have.property('name').to.equal('fake')
                    done(err)
                })
        })

        it('should call handleError on error', (done) => {
            createStub = sandbox.stub(users, 'create').rejects(new Error('fake_error'))
            errorStub = sandbox.stub().callsFake((res, error) => {
                return res.status(400).json({
                    error: 'fake'
                })
            })

            index.__set__('handleError', errorStub)

            request(index).post('/user')
                .send({
                    name: 'fake'
                })
                .expect(400)
                .end((err, response) => {
                    expect(createStub).to.have.been.calledOnce
                    expect(errorStub).to.have.been.calledOnce
                    expect(response.body).to.have.property('error').to.equal('fake')
                    done(err)
                })
        })
    })

    describe('DELETE /user/:id', () => {
        let fakeAuth
        let authStub
        let deleteStub

        beforeEach(() => {
            fakeAuth = (req, res, next) => {
                return next()
            }

            authStub = sandbox.stub(auth, 'isAuthorized').callsFake(fakeAuth)

            //Note about doing this AFTER stubbing, otherwise it doesn't overrise
            index = rewire('./index')
        });

        it('should call auth check function and users.delete on success', (done) => {
            deleteStub = sandbox.stub(users, 'delete').resolves('fake_delete')

            request(index).delete('/user/123')
                .expect(200)
                .end((err, response) => {
                    expect(authStub).to.have.been.calledOnce

                    //note about calledWith failing because 123 gets passed as text
                    expect(deleteStub).to.have.been.calledWithMatch(123)
                    expect(response.body).to.equal('fake_delete')
                    done(err)
                })
        })

        it('should call handleError on error', (done) => {
            deleteStub = sandbox.stub(users, 'delete').rejects(new Error('fake_delete_error'))
            errorStub = sandbox.stub().callsFake((res, error) => {
                return res.status(400).json({
                    error: 'fake'
                })
            })

            index.__set__('handleError', errorStub)

            request(index).delete('/user/123')
                .send({
                    name: 'fake'
                })
                .expect(400)
                .end((err, response) => {
                    expect(deleteStub).to.have.been.calledWithMatch(123)
                    expect(errorStub).to.have.been.calledOnce
                    expect(response.body).to.have.property('error').to.equal('fake')
                    done(err)
                })
        })
    })

    context('handleError', () => {
        let handleError
        let res
        let statusStub
        let jsonStub
        let instanceofSpy

        beforeEach(() => {
            jsonStub = sandbox.stub().returns('done');
            statusStub = sandbox.stub().returns({
                json: jsonStub
            })
            res = {
                status: statusStub
            }

            handleError = index.__get__('handleError')
        })

        it('should check for error instance and format message', (done) => {
            let result = handleError(res, new Error('fake'))

            expect(statusStub).to.have.been.calledWith(400)
            expect(jsonStub).to.have.been.calledWith({
                error: 'fake'
            })

            done()
        });

        it('should return object without changing it if not instance of an error', (done) => {
            let result = handleError(res, {
                id: 1,
                message: 'fake error'
            })

            expect(statusStub).to.have.been.calledWith(400);
            expect(jsonStub).to.have.been.calledWith({
                id: 1,
                message: 'fake error'
            })

            done()
        })
    })
})