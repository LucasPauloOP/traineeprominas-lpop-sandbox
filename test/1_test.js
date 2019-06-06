const chai = require('chai');
const assert = chai.assert;
const request = require('supertest');

const app = require('../app');


describe('Array', function() {
    this.timeout(12000);
    before(done => {
        setTimeout(() => {
            done();
        }, 10000);
    });

    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});