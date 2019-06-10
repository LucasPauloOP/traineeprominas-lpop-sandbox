const assert = require('assert');
const request = require('supertest');
const app = require('../app');





//---------------------USER------------------------------------

describe('Get with users register',function () {
    it('Register user with users register in mongodb in user',()=>{
        return request(app).get('/api/v1/user').then(function(res){
            assert.equal(res.status,200);
        });
    })

});

describe('Get id of users register',function () {
    it('active user with active id in user',()=>{
        return request(app).get('/api/v1/user/1').then(function (res) {
            assert.equal(res.status, 200);
        });
    })
});

describe('Get id of users register',function () {
    it('active user with active id in user',()=>{
        return request(app).get('/api/v1/user/1').then(function (res) {
            assert.equal(res.status, 200);
        });
    })
});

//--------------------------TEACHER-------------------------

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

describe('Get invalid id of teachers register',function () {
    it('teacher with invalid id in teacher',()=>{
        return request(app).get('/api/v1/teacher/30').then(function (res) {
            assert.equal(res.status, 204);
        });
    })
});



//---------------------------COURSE----------------------------
describe('Get with courses register',function () {
    it('Register courses with users register in mongodb',()=>{
        return request(app).get('/api/v1/course').then(function(res){
            assert.equal(res.status,200);
        });
    })

});

describe('Get id of course register',function () {
    it('Active id in course',()=>{
        return request(app).get('/api/v1/course/1').then(function (res) {
            assert.equal(res.status, 200);
        });
    })
});

describe('Get invalid id of course register',function () {
    it('Invalid id in course',()=>{
        return request(app).get('/api/v1/course/30').then(function (res) {
            assert.equal(res.status, 204);
        });
    })
});


//-------------------------STUDENT-----------------------------------

describe('Get with students register',function () {
    it('Register students with users register in mongodb',()=>{
        return request(app).get('/api/v1/user').then(function(res){
            assert.equal(res.status,200);
        });
    })

});

describe('Get id of student register',function () {
    it('Active id in student',()=>{
        return request(app).get('/api/v1/student/1').then(function (res) {
            assert.equal(res.status, 200);
        });
    })
});

describe('Get invalid id of student register',function () {
    it('Invalid id in student',()=>{
        return request(app).get('/api/v1/student/30').then(function (res) {
            assert.equal(res.status, 204);
        });
    })
});










