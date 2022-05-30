var chai = require('chai');
var expect = chai.expect;
// var assert = chai.assert;
// var should = chai.should();

var server = require('../src/index');
let chaiHttp = require('chai-http')
chai.use(chaiHttp);

//check status of each request in each test case to be equal to 200 i.e. success code - if matched - then test case is passed else failed

//GET APIs
describe('book return api', function () {
    it('get returned books', function (done) {
        chai.request(server)
            .get('/getreturnbooks')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjY2MzI3NGU1ZDQ2MWI2ZTY5N2FkMzIiLCJpYXQiOjE2NTI0MTg1NjZ9.aiknrrnKDrL-_tPUNoPfFPZ2z7mS2I3LgenFWh_wpAw')
            .end((err, response) => {
                expect(response.status).to.be.equal(200)
                done();
            })
    })
})
describe('book issue api', function () {
    it('get issued books', function (done) {
        chai.request(server)
            .get('/getissuebooks')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjY2MzI3NGU1ZDQ2MWI2ZTY5N2FkMzIiLCJpYXQiOjE2NTI0MTg1NjZ9.aiknrrnKDrL-_tPUNoPfFPZ2z7mS2I3LgenFWh_wpAw')
            .end((err, response) => {
                expect(response.status).to.be.equal(200)
                done();
            })
    })
})
describe('search api', function () {
    it('get search results', function (done) {
        chai.request(server)
            .get('/searchs/name/summer')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjY2MzI3NGU1ZDQ2MWI2ZTY5N2FkMzIiLCJpYXQiOjE2NTI0MTg1NjZ9.aiknrrnKDrL-_tPUNoPfFPZ2z7mS2I3LgenFWh_wpAw')
            .end((err, response) => {
                expect(response.status).to.be.equal(200)
                done();
            })
    })
})

//POST APIs
describe('login api', function () {
    it('get user', function (done) {
        chai.request(server)
            .post('/login')
            .send({ 'email': 'vd@gmail.com', 'password': 'vdara' })
            .end((err, response) => {
                expect(response.status).to.be.equal(200)
                done();
            })
    })
})

describe('book request api', function () {
    it('request book', function (done) {
        chai.request(server)
            .post('/request')
            .send({ 'bookName': 'Maybe Someday', 'author': 'Colleen Hoover' })
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjY2MzI3NGU1ZDQ2MWI2ZTY5N2FkMzIiLCJpYXQiOjE2NTI0MTg1NjZ9.aiknrrnKDrL-_tPUNoPfFPZ2z7mS2I3LgenFWh_wpAw')
            .end((err, response) => {
                expect(response.status).to.be.equal(200)
                done();
            })
    })
})