const assert = require('assert');
const request = require('supertest');
const app = require('../app');






//---------------------------COURSE----------------------------
describe('Get with courses register',function () {
    it('Register courses with users register in mongodb',()=>{
        return request(app).get('/api/v1/JSON/course').then(function(res){
            assert.equal(res.status,200);
        });
    })

});

describe('Get id of course register',function () {
    it('Active id in course',()=>{
        return request(app).get('/api/v1/JSON/course/1').then(function (res) {
            assert.equal(res.status, 200);
        });
    })
});

describe('Get invalid id of course register',function () {
    it('Invalid id in course',()=>{
        return request(app).get('/api/v1/JSON/course/30').then(function (res) {
            assert.equal(res.status, 204);
        });
    })
});


//-------------------------STUDENT-----------------------------------

describe('Get with students register',function () {
    it('Register students with users register in mongodb',()=>{
        return request(app).get('/api/v1/JSON/user').then(function(res){
            assert.equal(res.status,200);
        });
    })

});

describe('Get id of student register',function () {
    it('Active id in student',()=>{
        return request(app).get('/api/v1/JSON/student/1').then(function (res) {
            assert.equal(res.status, 200);
        });
    })
});

describe('Get invalid id of student register',function () {
    it('Invalid id in student',()=>{
        return request(app).get('/api/v1/JSON/student/30').then(function (res) {
            assert.equal(res.status, 204);
        });
    })
});










