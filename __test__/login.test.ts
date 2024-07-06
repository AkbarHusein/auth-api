import { config } from 'dotenv'
config()
import app from '../server'
import req from 'supertest'
import { OK, UNAUTHORIZED } from 'http-status'

describe('POST /api/auth/login', () => { 
    it('Response with 200 and got token', (done) => { 
        req(app)
            .post('/api/auth/login')
            .send({
                email: 'admin@gmail.com',
                password:'password'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(OK)
            .end((err, res) => {
                if (err) return done(err)
                return done()
            })
    })
})


describe('POST /api/auth/login', () => { 
    it('Response with status 401 and message Invalid Clredentials', (done) => { 
        req(app)
            .post('/api/auth/login')
            .send({
                email: 'fail@gmail.com',
                password:'failpassword'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(UNAUTHORIZED)
            .end((err, res) => {
                if (err) return done(err)
                return done()
            })
    })
})