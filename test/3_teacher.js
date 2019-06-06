//example

const assert = require('assert');
//const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');

describe('register teacher ,phd as true',function () {
    it('register teacher phd as true',()=>{
        return request(app).post('/api/v1/teacher')
            .send({name:'teste1',lastName:'teste1',phd:true}).then(function (res) {
               assert.equal(res.status, 201);
            });
        });
});

describe('register teacher ,phd as false',function () {
    it('register teacher phd as false',()=>{
        return request(app).post('/api/v1/teacher')
            .send({name:'teste2',lastName:'teste2',phd:false}).then(function (res) {
                assert.equal(res.status, 401);
            });
    });
});

escribe('register teacher ,phd as null',function () {
    it('register teacher phd as null',()=>{
        return request(app).post('/api/v1/teacher')
            .send({name:'teste3',lastName:'teste3'}).then(function (res) {
                assert.equal(res.status, 401);
            });
    });
});


