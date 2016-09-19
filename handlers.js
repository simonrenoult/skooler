const pokemons = require('./res/pokemons');

exports.sayHello = (request, reply) => {
  reply('hello world');
};

exports.getAllPokemons = (request, reply) => {
  reply(pokemons);
};

exports.createPokemon = (request, reply) => {
  if (!request.payload) {
    return reply().code(400);
  }
  pokemons.push(request.payload);
  reply().code(201);
}
