const assert = require('assert');
const request = require('supertest');
const app = require('../app');

//route only works if the database is empty



//---------------------------------COURSE---------------------------------------

describe('Put with id valid',function () {
    it('put with existing ID and correct data in course',()=>{
        return request(app).put('/api/v1/course/1').send({name:'testeput1',city:'testeput1',period:'5',teacher:[1,2]})
            .then(function (res) {
                assert.equal(res.status,200);
            })
    })

});

describe('Put with id invalid',function () {
    it('put with non existent id and correct data in course',()=>{
        return request(app).put('/api/v1/course/30').send({name:'testeput2',city:'teste1',period:'5',teacher:[1,2]})
            .then(function (res) {
                assert.equal(res.status,401);
            })
    })

});

describe('Put with teacher invalid',function () {

    it('it should NOT PUT a course without more than 2 teachers', () => {
        return request(app).put('/api/v1/course/1')
            .send({name:'testeput3',city:'teste1',period:'5',teacher:[1]})
            .then(function (res) {
                assert.equal(res.status, 401);
            });
    });

});


//--------------------------STUDENT--------------------------------------------------------------
describe('Put with id valid',function () {
    it('Put with existing ID and correct data in student',()=>{
        return request(app).put('/api/v1/student/1').send({name:'teste1',lastName:'teste1',age:'20',course:[1]})
            .then(function (res) {
                assert.equal(res.status,200);
            })
    })

});

describe('Put with id invalid',function () {
    it('Put with non existent id and correct data in student',()=>{
        return request(app).put('/api/v1/student/30').send({name:'teste1',lastName:'teste1',age:'20',course:[1]})
            .then(function (res) {
                assert.equal(res.status,401);
            })
    })

});

describe('Put with id valid',function () {
    it('Put with id valid and incorrect data in student',()=>{
        return request(app).put('/api/v1/student/1').send({name:'puttest2',lastName:'puttest2',age:'15',course:[1]})
    })
});


