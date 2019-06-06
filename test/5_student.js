const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('Get with students register',function () {
    it('Get with registered students and return is empty',()=>{
        return request(app).get('/api/v1/user').then(function (res) {
            assert.equal(res.status,204);
        });
    });
});

describe('register student as 18 years or more',function () {
    it('register student as 20 years',()=>{
        return request(app).post('/api/v1/student').send({name:'teste1',lastName:'teste1',age:'20',course:[1]})
            .then(function (res) {
                assert.equal(res.status,201);
            });
    });
});

describe('Get with students register',function () {
    it('Register students with users register in mongodb',()=>{
        return request(app).get('/api/v1/user').then(function(res){
            assert.equal(res.status,200);
        });
    })

});

describe('register student as 17 years or any less',function () {
   it('register student as 15 years',()=>{
      return request(app).post('/api/v1/student').send({name:'teste2',lastName:'teste2',age:'15',course:[2]})
          .then(function (res) {
              assert.equal(res.status,401);

          })
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
