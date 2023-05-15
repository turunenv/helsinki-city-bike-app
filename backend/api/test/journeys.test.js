import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server.js';
import { stationRouter } from '../routes/stations.js';
let should = chai.should();
let assert = chai.assert;

chai.use(chaiHttp);

const server = chai.request(app).keepOpen();

describe('Journeys', () => {
  describe('GET /api/journeys', () => {
    it('should return 1000 journeys', (done) => {
      server.get('/api/journeys').end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(1000);
        done();
      });
    });
  });

  
  describe('GET /api/journeys/nonexistent', () => {
    it('should return status 404', (done) => {
      server.get('/api/journeys/nonexistent').end((err, res) => {
        res.should.have.status(404);
        done();
      });
    });
  });

  describe('GET /api/journeys?orderby=duration', () => {
    it('should return 1000 journeys, ordered by ascending duration', (done) => {
      server.get('/api/journeys?orderby=duration').end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(1000);
        for (let i = 0; i < res.body.length - 1; i++) {
          assert.isAtMost(res.body[i].duration, res.body[i + 1].duration);
        }
        done();
      });
    });
  });

  describe('GET /api/journeys?orderby=duration&desc=true', () => {
    it('should return 1000 journeys, ordered by descending duration', (done) => {
      server.get('/api/journeys?orderby=duration&desc=true').end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(1000);
        for (let i = 0; i < res.body.length - 1; i++) {
          assert.isAtLeast(res.body[i].duration, res.body[i + 1].duration);
        }
        done();
      });
    });
  });

  describe('GET /api/journeys?orderby=dist', () => {
    it('should return 1000 journeys, ordered by ascending distance', (done) => {
      server.get('/api/journeys?orderby=dist').end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(1000);
        for (let i = 0; i < res.body.length - 1; i++) {
          assert.isAtMost(res.body[i].travelDist, res.body[i + 1].travelDist);
        }
        done();
      });
    });
  });

  describe('GET /api/journeys?orderby=dist&desc=true', () => {
    it('should return 1000 journeys, ordered by descending distance', (done) => {
      server.get('/api/journeys?orderby=dist&desc=true').end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(1000);
        for (let i = 0; i < res.body.length - 1; i++) {
          assert.isAtLeast(res.body[i].travelDist, res.body[i + 1].travelDist);
        }
        done();
      });
    });
  });
});
