const chai = require('chai');
const expect = chai.expect;
const server = require('../index.js');

describe('Server', () => {
  describe('/', () => {
    it('should return hello world', (done) => {
      server.inject('/', (res) => {
        expect(res.payload).to.equal('hello world');
        done();
      });
    });
  });

  describe('/pokemons', () => {
    describe('GET', () => {
      it('should return a list of pokemons', (done) => {
        server.inject('/pokemons', (res) => {
          expect(res.result).to.deep.equals([{'name':'pikachu'},{'name':'carapuce'},{'name':'bulbizarre'}]);
          done();
        });
      });
    });
    describe('POST', () => {

      describe('When the payload is not defined', () => {
        it('should send a 400 status code', (done) => {
          server.inject({url : '/pokemons', method : 'POST'}, (res) => {
            expect(res.statusCode).to.equals(400);
            done();
          });
        });
      });

      describe('When the payload is defined', () => {

        it('should send a 201 status code', (done) => {
          server.inject({url : '/pokemons', method : 'POST', payload : {name : 'salameche'}}, (res) => {
            expect(res.statusCode).to.equals(201);
            done();
          });
        });

        it('should create the pokemon given in the payload', (done) => {
          server.inject({url : '/pokemons', method : 'POST', payload : {name : 'salameche'}},
          () => {
            server.inject('/pokemons', (response) => {
              const salameche = response.result.find((pokemon) => pokemon.name === 'salameche');
              expect(salameche).to.exist;
              done();
            });
          });
        });
      });
    });
  });
});
