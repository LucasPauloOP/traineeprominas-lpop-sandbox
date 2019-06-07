const assert = require('assert');
const request = require('supertest');
const app = require('../app');


//route only works if the database is empty
describe('Get with teachers register',function () {
    it('Get with registered teachers and return is empty',()=>{
        return request(app).get('/api/v1/teacher').then(function (res) {
            assert.equal(res.status,204);
        });
    });
});



//successful routes
describe('Register teacher ,phd as true',function () {
    it('Register teacher phd as true',()=>{
        return request(app).post('/api/v1/teacher')
            .send({name:'teste1',lastName:'teste1',phd:true}).then(function (res) {
               assert.equal(res.status, 201);
            });
        });
});

describe('Get with teachers register',function () {
    it('Register teachers with users register in mongodb',()=>{
        return request(app).get('/api/v1/teacher').then(function(res){
            assert.equal(res.status,200);
        });
    })

});


describe('Get id of teacher register',function () {
    it('Active teacher with active id in teacher',()=>{
        return request(app).get('/api/v1/teacher/1').then(function (res) {
            assert.equal(res.status, 200);
        });
    })
});

describe('Put with id valid',function () {
    it('put with existing ID and correct data in teacher',()=>{
        return request(app).put('/api/v1/teacher/1').send({name:'testeput1',lastName:'testeput1',phd:true})
            .then(function (res) {
                assert.equal(res.status,200);
            })
    })

});


//--------------------------------------------------------------------------------------------------------------

//routes that test errors
describe('Register teacher ,phd as false',function () {
    it('Register teacher phd as false',()=>{
        return request(app).post('/api/v1/teacher')
            .send({name:'teste2',lastName:'teste2',phd:false}).then(function (res) {
                assert.equal(res.status, 401);
            });
    });
});

describe('Register teacher ,phd as null',function () {
    it('Register teacher phd as null',()=>{
        return request(app).post('/api/v1/teacher')
            .send({name:'teste3',lastName:'teste3'}).then(function (res) {
                assert.equal(res.status, 401);
            });
    });
});

describe('Get invalid id of teachers register',function () {
    it('teacher with invalid id in teacher',()=>{
        return request(app).get('/api/v1/teacher/30').then(function (res) {
            assert.equal(res.status, 204);
        });
    })
});

/*describe('Get with id invalid',function () {
    it('Get on an inactive user (status: 0)',()=>{
        return request(app).get('/api/v1/user/2').then(function (res) {
            assert.equal(res.status,204);
        });
    });

});*/




