const assert = require("assert")

describe('filename', ()=>{
    context('function to be tested', ()=> {
        
        before(()=> {
            console.log("======Before")
        })
        
        after(()=> {
            console.log("======After")
        })
        beforeEach(()=> {
            console.log("==Before")
        })
        
        afterEach(()=> {
            console.log("==After")
        })
        it('Should do something', ()=> {
            assert.equal(1,1)
        })
    })
})