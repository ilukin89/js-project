  //  pokemon list details

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

      if (typeof pokemon === 'object' && pokemon !== null) {
        return pokemonList.push(pokemon);
      } else {
        return 'Variable is not an object';
      }
    }

    //  include html/css elements

    function addListItem(pokemon) {

      let pokemonUl = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('ul__button');
      listItem.appendChild(button);
      pokemonUl.appendChild(listItem);
      button.addEventListener('click', function () {
        showDetails(pokemon);
      })
    };

    // show pokemon details in console

    function showDetails(pokemon) {
      console.log(pokemon);
    };

    return {
      getAll: getAll,
      add: add,
      addListItem: addListItem
    };
  })();

  // return pokemon list from repository

  pokemonRepository.getAll().forEach(function (pokemon) {

    pokemonRepository.addListItem(pokemon);

  });