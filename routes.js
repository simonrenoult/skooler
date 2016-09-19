const joi = require('joi');
const handlers = require('./handlers');
const pokemons = require('./res/pokemons');

module.exports = [
  {
    method: 'GET',
    path: '/',
    config : {
      handler: handlers.sayHello,
      tags : ['api']
    }
  },
  {
    method: 'GET',
    path: '/pokemons',
    config : {
      handler: handlers.getAllPokemons,
      tags : ['api']
    }
  },
  {
    method: 'POST',
    path: '/pokemons',
    config : {
      handler: handlers.createPokemon,
      tags : ['api'],
      validate : {
        payload : {
          name : joi.string()
        }
      }
    }
  }
]
