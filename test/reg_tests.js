const assert = require('assert');
const Registration = require('../Database_Reg')
const pgPromise = require("pg-promise");
const pgp = pgPromise({})

const connectionString = process.env.DATABASE_URL || 'postgresql://tester:test123@localhost:5432/test';

const db = pgp(connectionString)


describe('database', function () {

   
    it('Show reg numbers from Durban', async function () {


        let registration = Registration(db);
        let reg = await registration.filterReg('CJ');


        assert.equal('ND 154-876', 'ND 154-876', reg);

    });

    it('Show reg numbers from Pine Town', async function () {


        let registration = Registration(db);
        let reg = await registration.filterReg('NU');


        assert.equal("NU 154-876", "NU 154-876", reg);

    });

    it('Show reg numbers from Bellville', async function () {


        let registration = Registration(db);
        let reg = await registration.filterReg('CY');


        assert.equal("CY 154-876", "CY 154-876", reg);

    });


    it('must be able to insert reg numbers to database', async function () {

        let registration = Registration(db);
        let reg = await registration.addReg(
            'ND 154-876'
        );
        let reg2 = await registration.addReg(
            'NU 234-123'
        );
        let getReg = await registration.displayReg()
        assert.deepEqual([{registration_num: "ND 154-876"}, {registration_num: 'NU 234-123'}], getReg);
        

    });
    
    it('Should Delete reg numbers ', async function () {


        let registration = Registration(db);
        await registration.deleteReg();

        let getReg = await registration.deleteReg()
        assert.equal(undefined, getReg);
    });
    afterEach('Drop all tables', async function () {
        await db.query("delete from Registration;");

    });

});