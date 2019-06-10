const assert = require('assert');
const request = require('supertest');
const app = require('../app');

//route only works if the database is empty


//----------------------------------------USER------------------------------------------------------------------------

describe('Delete with id valid',function () {
    it('Delete with existing ID in user',()=>{
        return request(app).delete('/api/v1/user/1')
            .then(function (res) {
                assert.equal(res.status,200);
            })
    })

});

describe('Delete with id invalid',function () {
    it('Delete with non existing ID in user',()=>{
        return request(app).delete('/api/v1/user/50')
            .then(function (res) {
                assert.equal(res.status,204);
            })
    })

});

describe('Delete with id deleted',function () {


    it('Delete with id deleted in user',()=>{
        return request(app).delete('/api/v1/user/2')
            .then(function (res) {
                assert.equal(res.status,200);
            })
    })

});

//----------------------------------------TEACHER------------------------------------------------------------------------

describe('Delete with id invalid',function () {
    it('Delete with non existing ID in teacher',()=>{
        return request(app).delete('/api/v1/teacher/50')
            .then(function (res) {
                assert.equal(res.status,204);
            })
    })

});

describe('Delete with id deleted',function () {
    it('Delete with id deleted in teacher',()=>{
        return request(app).delete('/api/v1/teacher/1')
            .then(function (res) {
                assert.equal(res.status,200);
            })
    })

});

//----------------------------------------STUDENT------------------------------------------------------------------------
describe('DELETE /api/v1/student', function() {
    it('it should DELETE student 1', () => {
        return request(app).delete('/api/v1/student/1')
            .then(function(res) {
                assert.equal(res.status, 200);
            });
    });

    it('it should NOT DELETE student 2 (not exists)', () => {
        return request(app)
            .delete('/api/v1/student/30')
            .then(function(res) {
                assert.equal(res.status, 204);
            });
    });

    it('Delete with id deleted in student',()=>{
        return request(app).delete('/api/v1/student/1')
            .then(function (res) {
                assert.equal(res.status,204);
            })
    })
});


//-----------------------------------COURSE-----------------------------------------------------------------------

describe('Delete with id valid',function () {
    it('Delete with existing ID in course',()=>{
        return request(app).delete('/api/v1/course/1')
            .then(function (res) {
                assert.equal(res.status,200);
            })
    })

});

describe('Get with id invalid',function () {
    it('Get on an inactive course (status: 0)',()=>{
        return request(app).get('/api/v1/course/1').then(function (res) {
            assert.equal(res.status,204);
        });
    });

});

describe('Delete with id invalid',function () {
    it('Delete with non existing ID in course',()=>{
        return request(app).delete('/api/v1/course/30')
            .then(function (res) {
                assert.equal(res.status,204);
            })
    })

});

describe('Delete with id deleted',function () {
    it('Delete with id deleted in teacher',()=>{
        return request(app).delete('/api/v1/course/1')
            .then(function (res) {
                assert.equal(res.status,204);
            })
    })

});

