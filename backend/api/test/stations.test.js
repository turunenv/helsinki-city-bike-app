import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server.js';
import { stationRouter } from '../routes/stations.js';
let should = chai.should();
let assert = chai.assert;

chai.use(chaiHttp);

const server = chai.request(app).keepOpen();

describe('Stations', () => {
  describe('GET /api/stations', () => {
    it('should return all stations', (done) => {
      server.get('/api/stations').end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(457);
        done();
      });
    });
  });

  describe('GET /api/stations/1111111', () => {
    it('should return status 400', (done) => {
      server.get('/api/stations/1111111').end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });
  });

  describe('GET /api/stations/1', () => {
    it('should return the correct station', (done) => {
      server.get('/api/stations/1').end((err, res) => {
        res.should.have.status(200);
        expect(res.body.stationId).to.equal(1);
        expect(res.body.nameFi).to.equal('Kaivopuisto');
        expect(res.body.addressFi).to.equal('Meritori 1');

        done();
      });
    });
  });
});
