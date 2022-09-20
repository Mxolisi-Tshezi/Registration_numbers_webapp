const assert = require('assert');
const Registration = require('../reg-mesages');

// describe('Error messages', function () {

// it('Show errorr when incorrect Format', async function () {
        
//     let registration = Registration();
//     let reg = await registration.sendErrorMsg("ND 154-876");
    
//     let getReg = await registration.errorMsg()
//     assert.equal("Incorrect format of registration number entered", getReg);
    
// });

// it('Show error when Registration number not added', async function () {
    
    
//     let registration = Registration();
//     let reg = await registration.sendErrorMsg('');
    
//     let getReg = await registration.errorMsg()
//     assert.equal("Registration number not added", getReg);
    
//    });

// });

describe('Error messages', function () {

    it('Show errorr when incorrect Format', async function () {
            
        let registration = Registration();
        let reg = await registration.sendErrorMsg("CA 152-56");
        
        let getReg = await registration.errorMsg()
        assert.equal("Incorrect format of registration number entered", getReg);
        
    });
    
    it('Show error when Registration number not added', async function () {
        
        
        let registration = Registration();
        let reg = await registration.sendErrorMsg('');
        
        let getReg = await registration.errorMsg()
        assert.equal("Registration number not added", getReg);
        
       });
    
    });