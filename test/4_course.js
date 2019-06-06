const assert = require('assert');
const request = require('supertest');
const app = require('../app');

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

