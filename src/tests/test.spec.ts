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
let token: string;
let userId: number;
let busId: number;

describe('INITIALIZE TEST', () => {

  it('Checks if mocha is working fine', () => {
    before((done) => {
      expect(1 + 1).to.equal(2);
      done();

    });
  });

  it('Confirms end of Tests', () => {
    after((done) => {
        // tslint:disable-next-line:no-console
      console.log('Done with Test...');
      done();
    });

  });

});

describe('USER API TESTS', () => {
  describe('A', () => {
    it('Doesnt Register User with errors', () => {

       return testServer.post('/api/v1/register')
        .send({
          username: 'user',
          email: 'email@',
          password: '12345',
          confirmpassword:'123',
          city:'abc',
          county:'cde',
        })
        
        .then((res) => {
          expect(res.status).to.equal(400);

        });
    });

  });
  describe.only('B', () => {
    it('Registers a user with correct credentials',  (done) => {
    return testServer.post('/api/v1/register')
        .send({
          username: 'username',
          email: 'user@user.com',
          password: '123456',
          confirmpassword: '123456',
          city: 'abcdff',
          county: 'cdeff',
        })
        .expect(201)
        .then((response) => {
          // tslint:disable-next-line: no-unused-expression
          expect(response.body).not.to.be.empty;
          
        });
         

    });
  });
  describe('C', () => {
    it('Doesnt Log in with incorrect credentials', async(done) => {
     
      return testServer.post('/api/v1/login')
        .send({
          email:'user@mail.com',
          password:'123456',
        })
        .then((res) => {
          expect(res.status).to.be.equal(400);

        });

    });

  });
  describe('D', () => {
    it('Produce Token after correct Login', async(done) => {
      
      return testServer.post('/api/v1/login')
        .send({
          email:'user@user.com',
          password:'123456',
        })
        .then((res) => {
          token = res.body.token;
          expect(res.status).to.be.equal(200);
          expect(res.body).to.have.property('token');

        });

    });
  });
  describe('E', () => {
    it('Fetches UserId', async(done) => {
      return prisma.user.findOne({
        where: {
          email:'user@user.com',
        },
      })
        .then((res) => {
          userId = res!.id;

        })
        .catch((err) => {
          throw err;
        });

    });
  });
  describe('F', () => {
    it('Retrieves All user data', async (done) => {
      return testServer.get('/api/v1/users')
        .set({ Authorization:token })
        .then((res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.be.an.instanceof(Array);

        });
    });

  });
  describe('G', () => {
    it('Doesnt Retrieve userData', async () => {
      return testServer.get('/api/v1/users')
      .then((res) => {
        expect(res.status).to.be.equal(401);

      });

    });
  });
  describe('H', () => {
    it('Fetch user data by Id', async(done) => {
      return testServer.get(`/api/v1/users/${userId}`)
      .set({ Authorization:token })
      .then((res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an.instanceof(Array);

      });
    });

  });
  describe('I', () => {
    it('Fails to fetch user data by Id', async(done) => {
      return testServer.get(`/api/v1/users/${userId}`)
      .then((res) => {
        expect(res.status).to.be.equal(401);

      });
    });
  });

  describe('J', () => {
    it('Updates User', async(done) => {
      const updateData = {
        city:'Nairobi',
      };
      return testServer.put(`/api/v1/users/${userId}`)
      .set({ Authorization:token })
      .send(updateData)
      .then((res) => {
        expect(res.status).to.be.equal(201);

      });

    });

  });
  describe('K', () => {
    it('Should Not update User', async (done) => {
      return testServer.put(`/api/v1/users/${userId}`)
      .then((res) => {
        expect(res.status).to.be.equal(401);

      });
    });

  });

});

describe('BUS AND BOOKING TEST', () => {
  describe('A', () => {
    it('Registers A new Bus for transport', async(done) => {
      const bDetails = {
        plates: 'KDA001',
        route: 'A-B',
        price: 5,
        departureTime: '2050-10-12 14:34:08.7',
        arrivalTime: '2050-10-12 14:38:08.7',
      };
      return testServer.post('/api/v1/bus')
      .set({ Authorization:token })
      .send(bDetails)
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('plates');
        expect(res.body).to.have.property('routes');
        expect(res.body).to.have.property('price');

      });

    });

  });
  describe('B', () => {
    it('Doesnt Register the new Bus', async(done) => {
      const bDetails = {
        plates: 'KDA001',
        route: 'A-B',
        price: 5,
        departureTime: '2050-10-12 14:34:08.7',
        arrivalTime: '2050-10-12 14:38:08.7',
      };
      return testServer.post('/api/v1/bus')
      .send(bDetails)
      .then((res) => {
        expect(res.status).to.equal(401);

      });

    });
  });
  describe('C', () => {
    it('Fetches BusId', async(done) => {
      return prisma.bus.findOne({
        where: {
          plates: 'KDA001',
        },
      })
        .then((res) => {
          busId = res!.id;

        });
    });
  });
  describe('D', () => {
    it('Fetches Bus details by Id', async(done) => {
      return testServer.get(`/api/v1/bus/${busId}`)
      .set({ Authorization:token })
      .then((res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an.instanceof(Array);

      });
    });
  });
  describe('E', () => {
    it('Fails to fetch Bus Data', async(done) => {
      return testServer.get(`/api/v1/bus/${busId}`)
      .then((res) => {
        expect(res.status).to.be.equal(401);
        done();
      });
    });

  });
});

describe('TRANSACTION TEST', () => {
  describe('A', () => {
    it('Creates A payment instance', async(done) => {
      return testServer.get(`/api/v1/pay/${userId}/${busId}`)
      .set({ Authorization:token })
      .then((res) => {
        expect(res.redirect);

      });

    });

  });

});
describe('CLEAN UP DB', () => {
  describe('A', () => {
    it('Deletes Current User', async(done) => {
      return testServer.get(`/api/v1/users/${userId}`)
      .set({ Authorization:token })
      .then((res) => {
        expect(res.status).to.be.equal(200);

      });

    });

  });
  describe('B', () => {
    it('Deletes Current User', async(done) => {
      return prisma.bus.delete({
        where: {
          plates: 'KDA001',
        },
      })
        .then(done);

    });
  });

});
