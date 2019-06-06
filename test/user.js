//example

const assert = require('assert');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');


describe('Post(admin)', function() {
    it('register user as admin', () => {
        return request(app)
            .post('/api/v1/user')
            .send({name: "Name1", lastName: "LastName1", profile: "admin"})
            .then(function (res) {
                assert.equal(res.status, 201);
            });
    });
});

describe('Post(gues)',function () {
    it('register user as guess', () => {
        return request(app).post('/api/v1/user').send({name:'Teste2',lastName:'Teste2',profile:'guess'})
        .then(function (res) {
           assert.equal(res.status,201);
        });
    });

});

