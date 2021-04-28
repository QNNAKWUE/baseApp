import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../server';

chai.use(chaiHttp);

describe('Auth', () =>{
    it('should allow a user to login', (done) => {
        chai.request(app)
        .post('/api/v1/auth/login')
        .send({
            email: 'kimK@gmail.com',
            password: '12345678'
        })
        .end((err, res) =>{
            expect(res.body).to.be.a('object');
            expect(res.body.data).to.have.all.key(['email','password', 'token']);
            done();
        })
    })
})