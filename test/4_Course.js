
const assert = require('assert');
const request = require('supertest');
const app = require('../app');

//route only works if the database is empty

//------------------------------GET------------------------------------
describe('Get with courses register',function () {
    it('Get with registered users and return is empty',()=>{
        return request(app).get('/api/v1/JSON/course').then(function (res) {
            assert.equal(res.status,204);
        });
    });
});

//-----------------------------------POST-------------------------------------------

describe('register course as 2 teacher',function () {
    it('register course as 2 teacher',()=>{
        return request(app).post('/api/v1/course').send({name:'teste1',city:'teste1',period:'5',teacher:[2,3]})
            .then(function (res) {
                assert.equal(res.status, 201);
            });
    });
});

describe('register course as 2 teacher',function () {
    it('register course as 2 teacher',()=>{
        return request(app).post('/api/v1/course').send({name:'teste1',city:'teste1',period:'5',teacher:[2,3]})
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

//---------------------------GET----------------------------
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


//---------------------------------PUT---------------------------------------

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

//-----------------------------------DELETE-----------------------------------------------------------------------

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
        return request(app).get('/api/v1/JSON/course/1').then(function (res) {
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