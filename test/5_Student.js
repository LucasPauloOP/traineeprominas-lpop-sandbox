const assert = require('assert');
const request = require('supertest');
const app = require('../app');

//route only works if the database is empty

//-----------------------------GET------------------------------------
describe('Get with students register',function () {
    it('Get with registered students and return is empty',()=>{
        return request(app).get('/api/v1/JSON/student').then(function (res) {
            assert.equal(res.status,204);
        });
    });
});

//-----------------------------POST-----------------------------------
describe('register student as 18 years or more',function () {
    it('register student as 20 years',()=>{
        return request(app).post('/api/v1/student').send({name:'teste1',lastName:'teste1',age:'20',course:[2]})
            .then(function (res) {
                assert.equal(res.status,201);
            });
    });
});


describe('register student as 17 years or any less',function () {
    it('register student as 15 years',()=>{
        return request(app).post('/api/v1/student').send({name:'teste1',lastName:'teste1',age:'15',course:[2]})
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

//-------------------------GET-----------------------------------

describe('Get with students register',function () {
    it('Get students with in mongodb',()=>{
        return request(app).get('/api/v1/JSON/student').then(function(res){
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

//--------------------------PUT--------------------------------------------------------------
describe('Put with id valid',function () {
    it('Put with existing ID and correct data in student',()=>{
        return request(app).put('/api/v1/student/1').send({name:'testePUT1',lastName:'teste1',age:'20',course:[2]})
            .then(function (res) {
                assert.equal(res.status,200);
            })
    })

});

describe('Put with id invalid',function () {
    it('Put with non existent id and correct data in student',()=>{
        return request(app).put('/api/v1/student/30').send({name:'testePUT1',lastName:'teste1',age:'20',course:[2]})
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
