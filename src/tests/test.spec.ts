import chai from 'chai';
import { PrismaClient } from '@prisma/client';
import { agent as request } from 'supertest';
import { after, before } from 'mocha';
import jsonwebtoken from 'jsonwebtoken';
import server from '../server';

const expect = chai.expect;
const testServer = request(server);
const prisma = new PrismaClient();
const payload = {
  email: 'user@user.com',

};
const token = jsonwebtoken.sign(payload, process.env.SECRET_OR_KEY!, { expiresIn: 94608000 });

describe('INITIALIZE TEST', () => {

  it('Checks if mocha is working fine', () => {
    before((done) => {
      expect(1 + 1).to.equal(2);
      done();

    });
  });

  it('Cleans up DB', () => {
    // tslint:disable-next-line: ter-prefer-arrow-callback
    after(async function(){
      await prisma.bus.deleteMany({});
      await prisma.user.deleteMany({});
      await prisma.address.deleteMany({});
     
    });

  });

});

describe('USER API TESTS', () => {
  describe('A', () => {
    // tslint:disable-next-line: ter-prefer-arrow-callback
    it('Doesnt Register User with errors', async function () {

      const res = await testServer.post('/api/v1/register')
        .send({
          username: 'user',
          email: 'email@',
          password: '12345',
          confirmpassword:'123',
          city:'abc',
          county:'cde',
        });
      expect(res.status).to.equal(400);

    });

  });
  describe('B', () => {
    // tslint:disable-next-line: ter-prefer-arrow-callback
    it('Registers a user with correct credentials', async function () {
      const res = await testServer.post('/api/v1/register')
        .send({
          username: 'username',
          email: 'user@user.com',
          password: '123456',
          confirmpassword: '123456',
          city: 'abcdff',
          county: 'cdeff',
        });
      expect(res.status).to.equal(201);

    });
  });
  describe('C', () => {
     // tslint:disable-next-line: ter-prefer-arrow-callback
    it('Doesnt Log in with incorrect credentials', async function () {

      const res = await testServer.post('/api/v1/login')
        .send({
          email:'user@mail.com',
          password:'123456',
        });

      expect(res.status).to.be.equal(404);

    });

  });
  describe('D', () => {
     // tslint:disable-next-line: ter-prefer-arrow-callback
    it('Produce Token after correct Login', async function () {

      const res = await testServer.post('/api/v1/login')
        .send({
          email:'user@user.com',
          password:'123456',
        });

      expect(res.status).to.be.equal(200);
      expect(res.body).to.have.property('token');

    });
  });

  describe('F', () => {
    // tslint:disable-next-line: ter-prefer-arrow-callback
    it('Retrieves All user data', async function () {
      const res = await testServer.get('/api/v1/users')
        .auth(token, { type: 'bearer' });

      expect(res.status).to.be.equal(200);

    });

  });
  describe('G', () => {
     // tslint:disable-next-line: ter-prefer-arrow-callback
    it('Doesnt Retrieve userData', async function () {
      const res = await testServer.get('/api/v1/users');

      expect(res.status).to.be.equal(401);

    });
  });
  describe('H', () => {
     // tslint:disable-next-line: ter-prefer-arrow-callback
    it('Fetch user data by Id', async function () {
      // tslint:disable-next-line: await-promise
      const abc = await prisma.user.findOne({
        where: {
          email: 'user@user.com',
        },
      });
      const res = await testServer.get(`/api/v1/users/${abc?.id}`)
      .auth(token, { type: 'bearer' });

      expect(res.status).to.be.equal(200);

    });

  });
  describe('I', () => {
     // tslint:disable-next-line: ter-prefer-arrow-callback
    it('Fails to fetch user data by Id', async function () {
      // tslint:disable-next-line: await-promise
      const abc = await prisma.user.findOne({
        where: {
          email: 'user@user.com',
        },
      });
      const res = await testServer.get(`/api/v1/users/${abc?.id}`);

      expect(res.status).to.be.equal(401);

    });
  });

  describe('J', () => {
     // tslint:disable-next-line: ter-prefer-arrow-callback
    it('Updates User', async function () {
      // tslint:disable-next-line: await-promise
      const abc = await prisma.user.findOne({
        where: {
          email: 'user@user.com',
        },
      });
      const updateData = {
        county:'Kenya',
        city:'Nairobi',
      };
      const res = await testServer.put(`/api/v1/users/${abc?.id}`)
      .auth(token, { type: 'bearer' })
      .send(updateData);

      expect(res.status).to.be.equal(200);

    });

  });
  describe('K', () => {
     // tslint:disable-next-line: ter-prefer-arrow-callback
    it('Should Not update User', async function () {
      // tslint:disable-next-line: await-promise
      const abc = await prisma.user.findOne({
        where: {
          email: 'user@user.com',
        },
      });
      const res = await testServer.put(`/api/v1/users/${abc?.id}`);

      expect(res.status).to.be.equal(401);

    });

  });

});

describe('BUS AND BOOKING TEST', () => {
  describe('A', () => {
     // tslint:disable-next-line: ter-prefer-arrow-callback
    it('Registers A new Bus for transport', async function () {

      const res = await testServer.post('/api/v1/bus')
      .auth(token, { type: 'bearer' })
      .send({
        plates: 'KDA001',
        routes: 'A-B',
        price: 5,
        departureTime: '2030-10-12T14:38:08.700Z',
        arrivalTime: '2030-10-13T14:38:08.00Z',
      });

      expect(res.status).to.equal(200);

    });

  });
  describe('B', () => {
     // tslint:disable-next-line: ter-prefer-arrow-callback
    it('Doesnt Register the new Bus', async function () {
      const bDetails = {
        plates: 'KDA001',
        routes: 'A-B',
        price: '5',
        departureTime: '2022-10-1214:34:08.7',
        arrivalTime: '2022-10-1214:38:08.7',
      };
      const res = await testServer.post('/api/v1/bus')
      .send(bDetails);

      expect(res.status).to.equal(401);

    });
  });

  describe('D', () => {
     // tslint:disable-next-line: ter-prefer-arrow-callback
    it('Fetches Bus details by Id', async function () {
      // tslint:disable-next-line: await-promise
      const cde = await prisma.bus.findOne({
        where: {
          plates: 'KDA001',
        },
      });
      const res = await testServer.get(`/api/v1/bus/${cde?.id}`)
      .auth(token, { type: 'bearer' });

      expect(res.status).to.be.equal(200);

    });
  });
  describe('E', () => {
     // tslint:disable-next-line: ter-prefer-arrow-callback
    it('Fails to fetch Bus Data', async function () {
       // tslint:disable-next-line: await-promise
      const cde = await prisma.bus.findOne({
        where: {
          plates: 'KDA001',
        },
      });
      const res = await testServer.get(`/api/v1/bus/${cde?.id}`);

      expect(res.status).to.be.equal(401);

    });

  });
});

describe('TRANSACTION TEST', () => {
  describe('A', () => {
     // tslint:disable-next-line: ter-prefer-arrow-callback
    it('Creates A payment instance', async function () {
       // tslint:disable-next-line: await-promise
      const cde = await prisma.bus.findOne({
        where: {
          plates: 'KDA001',
        },
      });
       // tslint:disable-next-line: await-promise
      const abc = await prisma.user.findOne({
        where: {
          email: 'user@user.com',
        },
      });
      const res = await testServer.get(`/api/v1/pay/${abc?.id}/${cde?.id}`)
      .auth(token, { type: 'bearer' });

      expect(res);

    });

  });

});
