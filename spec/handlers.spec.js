const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const expect = chai.expect;
const handlers = require('../handlers');
const pokemons = require('../res/pokemons');

describe('handlers', () => {
  describe('.sayHello()', () => {
    it('should call reply with hello world', () => {
      const replySpy = sinon.spy();
      handlers.sayHello(null, replySpy);
      expect(replySpy).to.have.been.calledWith('hello world');
    });
  });
  describe('.getAllPokemons()', () => {
    it('should call reply with pokemons', () => {
      const replySpy = sinon.spy();
      handlers.getAllPokemons(null, replySpy);
      expect(replySpy).to.have.been.calledWith(pokemons);
    });
  });
  describe('.createPokemon()', () => {
    describe('when payload is missing', () => {
      it('should invoke reply without argument and code with 400', () => {
        const codeSpy = sinon.spy();
        const obj = {
          reply: () => {
            return { code: codeSpy };
          }
        };
        const replySpy = sinon.spy(obj, 'reply');
        const request = { payload: null };
        handlers.createPokemon(request, obj.reply);
        expect(replySpy).to.have.been.calledWith();
        expect(codeSpy).to.have.been.calledWith(400);
      });
    });
    describe('when payload is provided', () => {
      it('should invoke reply without argument and code with 201', () => {
        const codeSpy = sinon.spy();
        const obj = {
          reply: () => {
            return { code: codeSpy };
          }
        };
        const replySpy = sinon.spy(obj, 'reply');
        const request = { payload: { name: 'unit' } };
        handlers.createPokemon(request, obj.reply);
        expect(replySpy).to.have.been.calledWith();
        expect(codeSpy).to.have.been.calledWith(201);
      });
    });
  });
});
