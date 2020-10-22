import chai from 'chai';
import { PrismaClient } from '@prisma/client';
import { agent as request } from 'supertest';
import { after, before } from 'mocha';
import server from '../server';
import dotenv from 'dotenv';
dotenv.config();

const expect = chai.expect;
const testServer = request(server);
const prisma = new PrismaClient();

describe('INITIALIZING TESTS', () => {
  it('Check if testing is okay', () => {
    before((done) => {
      expect(1 + 1).to.equal(5);
      done();

    });

  });
  it('Indicates Test has ended', () => {
    after((done) => {
      console.log('Done testing ,enjoy your day..');
      done();
    });
  });

});
describe.skip('DB TEST', () => {
  describe('A', () => {
    it('Cleans Up Db', async(done) => {
      await prisma.$executeRaw`DROP DATABASE bus-test;`
        .then(done)
        .catch((err) => {
          throw err;
        })

    });
  });

});

describe('BUS BOOKING API TESTS', () => {
  describe('A', () => {
    it('Retrieves All user data', async (done) => {
      await testServer.get('/api/v1/users')
        .set({ Authorization: '' })
        .expect(200)
        .then((rs) => {
          expect(rs.status).to.equal(200);
          expect(rs.body).to.be.an.instanceOf(Array);

        });
      done();
    });

  });

});
 