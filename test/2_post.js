
const assert = require('assert');
const request = require('supertest');
const app = require('../app');

//route only works if the database is empty
//-------------------------USER------------------------------------------
describe('Get with users register',function () {
   it('Get with registered users and return is empty in user',()=>{
       return request(app).get('/api/v1/user').then(function (res) {
            assert.equal(res.status,204);
       });
   });
});

//------------------------------TEACHER-----------------------------------
describe('Get with teachers register',function () {
    it('Get with registered teachers and return is empty',()=>{
        return request(app).get('/api/v1/teacher').then(function (res) {
            assert.equal(res.status,204);
        });
    });
});

//------------------------------COURSE------------------------------------
describe('Get with courses register',function () {
    it('Get with registered users and return is empty',()=>{
        return request(app).get('/api/v1/course').then(function (res) {
            assert.equal(res.status,204);
        });
    });
});

//-----------------------------STUDENT------------------------------------
describe('Get with students register',function () {
    it('Get with registered students and return is empty',()=>{
        return request(app).get('/api/v1/student').then(function (res) {
            assert.equal(res.status,204);
        });
    });
});

//----------------------------------------------------------------------------

//------------------------------------USER-------------------------------------

describe('Post(admin)', function() {
    it('register user as admin in user', () => {
        return request(app)
            .post('/api/v1/user')
            .send({name: "Teste1", lastName: "Teste1", profile: "admin"})
            .then(function (res) {
                assert.equal(res.status, 201);
            });
    });
});

describe('Post(guess)',function () {
    it('register user as guess in user', () => {
        return request(app).post('/api/v1/user').send({name:'Teste2',lastName:'Teste2',profile:'guess'})
            .then(function (res) {
                assert.equal(res.status,201);
            });
    });

});

describe('Post without gues or admin',function () {
    it('register user without guess or admin in user',()=>{
        return request(app).post('/api/v1/user').send({name:'Teste4',lastname:'Teste4',profile:'profile'})
            .then(function (res) {
                assert.equal(res.status,401);
            });
    });

});

//--------------------------------TEACHER------------------------------------------

describe('Register teacher ,phd as true',function () {
    it('Register teacher phd as true',()=>{
        return request(app).post('/api/v1/teacher')
            .send({name:'teste1',lastName:'teste1',phd:true}).then(function (res) {
                assert.equal(res.status, 201);
            });
    });
});

describe('Register teacher ,phd as true',function () {
    it('Register teacher phd as true',()=>{
        return request(app).post('/api/v1/teacher')
            .send({name:'teste2',lastName:'teste2',phd:true}).then(function (res) {
                assert.equal(res.status, 201);
            });
    });
});

describe('Register teacher ,phd as false',function () {
    it('Register teacher phd as false',()=>{
        return request(app).post('/api/v1/teacher')
            .send({name:'teste2',lastName:'teste2',phd:false}).then(function (res) {
                assert.equal(res.status, 401);
            });
    });
});

describe('Register teacher ,phd as null',function () {
    it('Register teacher phd as null',()=>{
        return request(app).post('/api/v1/teacher')
            .send({name:'teste3',lastName:'teste3'}).then(function (res) {
                assert.equal(res.status, 401);
            });
    });
});


//-----------------------------------COURSE-------------------------------------------

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


//-----------------------------STUDENT-----------------------------------
describe('register student as 18 years or more',function () {
    it('register student as 20 years',()=>{
        return request(app).post('/api/v1/student').send({name:'teste1',lastName:'teste1',age:'20',course:[1]})
            .then(function (res) {
                assert.equal(res.status,201);
            });
    });
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











