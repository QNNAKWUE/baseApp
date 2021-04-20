import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);

describe('Auth', () => {
  it('should allow a user to signup', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Kim Kardashian',
        email: 'kimK@gmail.com',
        password: '12345678',
        confirmPassword: '12345678',
      })
      .end((err, res) => {
        expect(res.body).to.be.a('object');
        expect(res.status).to.equal(201);
        expect(res.body.data).to.have.all.keys(['id', 'email', 'fullname']);
        done();
      });
  });

  it('should not allow an existing user to signup', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Nonso Amadi',
        email: 'nonsoamadi@aol.com',
        password: 'password',
        confirmPassword: 'password'
      })
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.message).to.equal('User exists, please login!');
        done();
      });
  });
});
