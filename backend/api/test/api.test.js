import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server.js';
import { Journey } from '../models/journeyModel.js';
import { Station } from '../models/stationModel.js';

let should = chai.should();
let assert = chai.assert;
let expect = chai.expect;

import testData from './testData.js';

const stations = testData.stations;
const journeys = testData.journeys;

chai.use(chaiHttp);

const server = chai.request(app).keepOpen();

describe('api-test suite', function () {
  before(async function () {
    this.timeout(10000);

    await Station.bulkCreate(stations);
    await Journey.bulkCreate(journeys);
  });

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
        server
          .get('/api/journeys?orderby=duration&desc=true')
          .end((err, res) => {
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
            assert.isAtLeast(
              res.body[i].travelDist,
              res.body[i + 1].travelDist
            );
          }
          done();
        });
      });
    });

    describe('POST /api/journeys', () => {
      it('creates a new journey with correct request body', (done) => {
        server
          .post('/api/journeys')
          .type('application/json')
          .send({
            departure: '2023-05-12T20:44:58',
            arrival: '2023-05-12T20:54:58',
            departureStationId: 13,
            arrivalStationId: 11,
            travelDist: 1000,
          })
          .end((err, res) => {
            res.should.have.status(201);
            expect(Number(res.body.journeyId)).to.be.a('number');
            expect(res.body.travelDist).to.equal(1000);
            expect(Number(res.body.duration)).to.be.a('number');

            done();
          });
      });
    });

    describe('POST /api/journeys', () => {
      it('returns 400 when required fields are missing from the request body', (done) => {
        server
          .post('/api/journeys')
          .type('application/json')
          .send({
            arrival: '2023-05-12T20:54:58',
            departureStationId: 13,
            arrivalStationId: 11,
            travelDist: 1000,
          })
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
    });

    describe('POST /api/journeys', () => {
      it('returns 400 when departure is before arrival', (done) => {
        server
          .post('/api/journeys')
          .type('application/json')
          .send({
            departure: '2023-05-12T20:59:58',
            arrival: '2023-05-12T20:54:58',
            departureStationId: 13,
            arrivalStationId: 11,
            travelDist: 1000,
          })
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
    });
  });

  describe('Stations', () => {
    describe('GET /api/stations', () => {
      it('should return all stations', (done) => {
        server.get('/api/stations').end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(50);
          done();
        });
      });
    });

    describe('GET /api/stations/1111111', () => {
      it('should return status 404', (done) => {
        server.get('/api/stations/1111111').end((err, res) => {
          res.should.have.status(404);
          done();
        });
      });
    });

    describe('GET /api/stations/1111asdf', () => {
      it('should return status 404', (done) => {
        server.get('/api/stations/1111asdf').end((err, res) => {
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
          expect(res.body.nameFi).to.equal('Samara');
          expect(res.body.addressFi).to.equal('7 Little Fleur Hill');

          done();
        });
      });
    });

    describe('POST /api/stations', () => {
      it('creates a new station with correct request body', (done) => {
        server
          .post('/api/stations')
          .type('application/json')
          .send({
            stationId: 1111,
            nameFi: 'Muumilaakson asema',
            addressFi: 'Muumilaakso',
            cityFi: 'Helsinki',
          })
          .end((err, res) => {
            res.should.have.status(201);
            expect(res.body.stationId).to.equal(1111);
            expect(res.body.nameFi).to.equal('Muumilaakson asema');
            expect(res.body.addressFi).to.equal('Muumilaakso');

            done();
          });
      });
    });

    describe('POST /api/stations', () => {
      it('returns 400 when required fields are missing from the request body', (done) => {
        server
          .post('/api/stations')
          .type('application/json')
          .send({
            nameFi: 'Muumilaakson asema',
            addressFi: 'Muumilaakso',
            cityFi: 'Helsinki',
          })
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
    });
  });

  after(async function () {
    await Journey.destroy({ where: {} });
    await Station.destroy({ where: {} });
  });
});
