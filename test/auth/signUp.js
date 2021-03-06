const chai = require('chai');
const supertest = require('supertest');
let constants = require('../utils/constants');

const expect = chai.expect;
const app =
  process.env.NODE_ENV == 'production'
    ? require('../../tools/serverProduction')
    : require('../../tools/serverDevelopment');
const api = supertest(app);

module.exports = describe('Sign up use cases', () => {
  it('Sign up invalid name', done => {
    api
      .post(constants.urls.signUp())
      .set(constants.users.validUser.header)
      .send(constants.posts.newUser.invalidName)
      .end((err, res) => {
        if (err)
          done(err);
        else {
          expect(res.status, 'Status').to.equal(400);
          done();
        }
      });
  });

  it('Sign up invalid email', done => {
    api
      .post(constants.urls.signUp())
      .set(constants.users.validUser.header)
      .send(constants.posts.newUser.invalidEmail)
      .end((err, res) => {
        if (err)
          done(err);
        else {
          expect(res.status, 'Status').to.equal(400);
          done();
        }
      });
  });

  it('Sign up invalid password', done => {
    api
      .post(constants.urls.signUp())
      .set(constants.users.validUser.header)
      .send(constants.posts.newUser.invalidPassword)
      .end((err, res) => {
        if (err)
          done(err);
        else {
          expect(res.status, 'Status').to.equal(400);
          done();
        }
      });
  });

  it('New valid user', done => {
    api
      .post(constants.urls.signUp())
      .set(constants.users.validUser.header)
      .send(constants.posts.newUser.valid)
      .end((err, res) => {
        if (err)
          done(err);
        else {
          expect(res.status, 'Status').to.equal(201);
          expect(res.body.msg).to.have.property('id');
          expect(res.header).to.have.property('set-cookie');
          constants.posts.newUser.valid.id = res.body.msg.id;
          constants.users.validUser.header['cookie'] = res.header['set-cookie'];
          done();
        }
      });
  });
});
