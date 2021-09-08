let pokemonRepository = (function () {
  let pokemonList = [{
      name: "Raticate",
      height: 0.7,
      types: ["normal"],
    },

    {
      name: "Charmander",
      height: 0.6,
      types: ["fire"],
    },

    {
      name: "Wigglytuff",
      height: 1,
      types: ["fairy", "normal"],
    },
    {
      name: "Nidoking",
      height: 1.4,
      types: ["ground", "poison"],
    },
    {
      name: "Victreebel",
      height: 1.7,
      types: ["grass", "poison"],
    },
    {
      name: "Squirtle",
      height: 0.5,
      types: ["water"],
    },
  ];

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  return {
    getAll: getAll,
    add: add,
  };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
  document.write(
    `This is ${pokemon.name}. <br> Height: ${pokemon.height} <br> Type: ${pokemon.types}<br>`
  );

  if (pokemon.height > 1) {
    document.write(`This is a big Pokemon<br><br>`);
  } else if (pokemon.height > 0.5 && pokemon.height < 1) {
    document.write(`This is an average Pokemon<br><br>`);
  } else {
    document.write(`This is a small Pokemon<br><br>`);
  }
});