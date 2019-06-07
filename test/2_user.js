
const assert = require('assert');
const request = require('supertest');
const app = require('../app');

//route only works if the database is empty
describe('Get with users register',function () {
   it('Get with registered users and return is empty',()=>{
       return request(app).get('/api/v1/user').then(function (res) {
            assert.equal(res.status,204);
       });
   });
});

//successful routes
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

describe('Get with users register',function () {
    it('Register user with users register in mongodb',()=>{
        return request(app).get('/api/v1/user').then(function(res){
            assert.equal(res.status,200);
        });
    })

});

describe('Get id of users register',function () {
   it('active user with active id',()=>{
       return request(app).get('/api/v1/user/1').then(function (res) {
           assert.equal(res.status, 200);
       });
   })
});

describe('Put with id valid',function () {
    it('put with existing ID and correct data',()=>{
        return request(app).put('/api/v1/user/1').send({name:'testeput1',lastName:'testeput1',profile:'guess'})
            .then(function (res) {
                assert.equal(res.status,200);
            })
    })

});

describe('Delete with id valid',function () {
    it('Delete with existing ID',()=>{
        return request(app).delete('/api/v1/user/10')
            .then(function (res) {
                assert.equal(res.status,200);
            })
    })

});

//routes that test errors
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
    });

});

describe('Get with id invalid',function () {
   it('Get with id invalid',()=>{
       return request(app).get('/api/v1/user/100').then(function (res) {
          assert.equal(res.status,204);
       });
   });

});

describe('Put with id invalid',function () {
    it('put with non existent id and correct data',()=>{
        return request(app).put('/api/v1/user/20').send({name:'testeput2',lastName:'testeput2',profile:'guess'})
            .then(function (res) {
                assert.equal(res.status,401);
            })
    })

});

describe('Put with id valid',function () {
    it('put with existing ID and incorrect data',()=>{
        return request(app).put('/api/v1/user/1').send({name:'testeput8000',profile:'nao entra'})
            .then(function (res) {
                assert.equal(res.status,401);
            })
    })

});

describe('Delete with id invalid',function () {
    it('Delete with non existing ID',()=>{
        return request(app).delete('/api/v1/user/50')
            .then(function (res) {
                assert.equal(res.status,204);
            })
    })

});










