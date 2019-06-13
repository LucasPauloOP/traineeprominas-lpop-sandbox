
const assert = require('assert');
const request = require('supertest');
const app = require('../app');

//route only works if the database is empty

//------------------------------TEACHER-----------------------------------
describe('Get with teachers register',function () {
    it('Get with registered teachers and return is empty',()=>{
        return request(app).get('/api/v1/JSON/teacher').then(function (res) {
            assert.equal(res.status,204);
        });
    });
});

//------------------------------COURSE------------------------------------
describe('Get with courses register',function () {
    it('Get with registered users and return is empty',()=>{
        return request(app).get('/api/v1/JSON/course').then(function (res) {
            assert.equal(res.status,204);
        });
    });
});

//-----------------------------STUDENT------------------------------------
describe('Get with students register',function () {
    it('Get with registered students and return is empty',()=>{
        return request(app).get('/api/v1/JSON/student').then(function (res) {
            assert.equal(res.status,204);
        });
    });
});

//----------------------------------------------------------------------------



//-----------------------------------COURSE-------------------------------------------

describe('register course as 2 teacher',function () {
    it('register course as 2 teacher',()=>{
        return request(app).post('/api/v1/course').send({name:'teste1',city:'teste1',period:'5',teacher:[1,2]})
            .then(function (res) {
                assert.equal(res.status, 201);
            });
    });
});


describe('register course as 1 teacher',function () {
    it('register course as 1 teacher',()=>{
        return request(app).post('/api/v1/course').send({name: 'teste2',city:'teste2',period:'2',teacher:[1]})
            .then(function (res) {
                assert.equal(res.status, 401);
            });
    });
});

describe('register course as undefined teacher',function () {
    it('register course as undefine teacher',()=>{
        return request(app).post('/api/v1/course').send({name:'teste3',city:'teste3',period:'1',teacher:[100]})
            .then(function (res) {
                assert.equal(res.status, 401);
            })
    })
});

describe('register course as 2 teacher',function () {
    it('register course as 2 teacher that do not exist',()=>{
        return request(app).post('/api/v1/course').send({name:'teste4',city:'teste4',period:'5',teacher:[100,99]})
            .then(function (res) {
                assert.equal(res.status, 401);
            });
    });
});


//-----------------------------STUDENT-----------------------------------
describe('register student as 18 years or more',function () {
    it('register student as 20 years',()=>{
        return request(app).post('/api/v1/student').send({name:'teste1',lastName:'teste1',age:'20',course:[1]})
            .then(function (res) {
                assert.equal(res.status,201);
            });
    });
});


describe('register student as 17 years or any less',function () {
    it('register student as 15 years',()=>{
        return request(app).post('/api/v1/student').send({name:'teste1',lastName:'teste1',age:'15',course:[1]})
            .then(function (res) {
                assert.equal(res.status,401);
            });
    });
});


describe('register student as 18 years and course wrong', function () {
    it('register student as 20 years and course wrong',()=>{
        return request(app).post('/api/v1/student').send({name:'teste3',lastName:'teste3',age:'20',course:[100]})
            .then(function (res) {
                assert.equal(res.status, 401);
            })
    })

});











