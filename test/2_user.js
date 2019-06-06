
const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('Get with users register',function () {
    it('Register user with users register in mongodb',()=>{
        return request(app).get('/api/v1/user').then(function(res){
            assert.equal(res.status,200);
        });
    })

});

describe('Get with users register',function () {
   it('Get with registered users and return is empty',()=>{
       return request(app).get('/api/v1/user').then(function (res) {
            assert.equal(res.status,204);
       });
   });
});

describe('Post(admin)', function() {
    it('register user as admin', () => {
        return request(app)
            .post('/api/v1/user')
            .send({name: "Teste1", lastName: "Teste1", profile: "admin"})
            .then(function (res) {
                assert.equal(res.status, 201);
            });
    });
});

describe('Post(guess)',function () {
    it('register user as guess', () => {
        return request(app).post('/api/v1/user').send({name:'Teste2',lastName:'Teste2',profile:'guess'})
        .then(function (res) {
           assert.equal(res.status,201);
        });
    });

});

describe('Post without gues or admin',function () {
    it('register user without guess or admin',()=>{
      return request(app).post('/api/v1/user').send({name:'Teste4',lastname:'Teste4',profile:'profile'})
          .then(function (res) {
             assert.equal(res.status,401);
          });
    })

});






