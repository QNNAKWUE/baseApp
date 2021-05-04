import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);
// before('Populating the DB', (done)=>{
//   chai.request(app)
//   .post('/api/v1/auth/signup')
//   .send({
//     fullname: 'whitey',
//     email: 'jwhitey@gmail.com',
//     password: 'jwhite',
//     confirmPassword: 'jwhite'
//   })
//   done();
// })

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
        confirmPassword: 'password',
      })
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.message).to.equal('User exists, please login!');
        done();
      });
  });
});

describe('User should be able to login', () => {
  it('should login a registered user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'nonsoamadi@aol.com',
        password: 'password',
        TOKEN_SECRET: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJraW1rQGdtYWlsLmNvbSIsImlhdCI6MTYyMDExODI1Mn0.Nym87Jw9mNMgOJ28_8a76NHVRIGWQ_iavtyOZRK5Ryg'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.data).to.have.all.keys(['id', 'token']);
        done();
      });
  });
});


